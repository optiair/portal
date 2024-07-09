from datetime import datetime, timedelta


# Function Purpose: processes the data from the SerpAPI
# Ensures that the duration time can be calculated with, and determine if a flight is classified as a "Red-Eye"
def process_flight_data(flight_data, departure_id, arrival_id):
    processed_data = []

    if "best_flights" in flight_data:
        for best_flight in flight_data["best_flights"]:
            for flight in best_flight["flights"]:
                # Adjust the time, because it is coming from a string!!
                departure_time = datetime.strptime(
                    flight["departure_airport"]["time"], "%Y-%m-%d %H:%M"
                )
                arrival_time = datetime.strptime(
                    flight["arrival_airport"]["time"], "%Y-%m-%d %H:%M"
                )

                # Fix for overnight flights
                if arrival_time < departure_time:
                    arrival_time += timedelta(days=1)

                duration = (arrival_time - departure_time).total_seconds() / 60

                is_redeye = departure_time.hour >= 0 and departure_time.hour < 6

                departure_airport_id = flight["departure_airport"]["id"]
                arrival_airport_id = flight["arrival_airport"]["id"]

                # check if departure and arrival match input, if not skip
                if (
                    departure_airport_id != departure_id
                    or arrival_airport_id != arrival_id
                ):
                    continue

                processed_data.append(
                    {
                        "departure_airport": flight["departure_airport"]["name"],
                        "arrival_airport": flight["arrival_airport"]["name"],
                        "departure_time": departure_time,
                        "arrival_time": arrival_time,
                        "duration": duration,
                        "airline": flight["airline"],
                        "airline_logo": flight["airline_logo"],
                        "flight_number": flight["flight_number"],
                        "cost": best_flight["price"],
                        "currency": flight_data["search_parameters"]["currency"],
                        "is_redeye": is_redeye,
                    }
                )

    return processed_data


# Calculate the scores using the user's inputted preferences and the flights' comparsion with the average calculated cost and duration
def calculate_scores(flights, preferences):
    cost_preference, duration_preference, redeye_preference = (
        preferences["cost_preference"],
        preferences["duration_preference"],
        preferences["redeye_preference"],
    )
    avg_cost = sum(flight["cost"] for flight in flights) / len(flights)
    avg_duration = sum(flight["duration"] for flight in flights) / len(flights)

    for flight in flights:
        bin_scores = []
        score = 0
        # Determine cost preference score
        if flight["cost"] > avg_cost:
            bin_scores.append(-1)
            score += -1 * cost_preference
        else:
            bin_scores.append(1)
            score += 1 * cost_preference

        # Determine duration preference score
        if flight["duration"] > avg_duration:
            bin_scores.append(-1)
            score += -1 * duration_preference
        else:
            bin_scores.append(1)
            score += 1 * duration_preference

        # Determine redeye_preference
        if flight["is_redeye"]:
            bin_scores.append(-1)
            score += -1 * redeye_preference
        else:
            bin_scores.append(1)
            score += 1 * redeye_preference

        flight["bin_score"] = bin_scores
        flight["score"] = score

    return {"flights": flights, "avg_cost": avg_cost, "avg_duration": avg_duration}
