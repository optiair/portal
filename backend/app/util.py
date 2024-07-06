from datetime import datetime, timedelta


# Function Purpose: processes the data from the SerpAPI
# Ensures that the duration time can be calculated with, and determine if a flight is classified as a "Red-Eye"
def process_flight_data(flight_data):
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

                processed_data.append(
                    {
                        "departure_airport": flight["departure_airport"]["name"],
                        "arrival_airport": flight["arrival_airport"]["name"],
                        "departure_time": departure_time,
                        "arrival_time": arrival_time,
                        "duration": duration,
                        "airline": flight["airline"],
                        "flight_number": flight["flight_number"],
                        "price": best_flight["price"],
                        "currency": flight_data["search_parameters"]["currency"],
                        "is_redeye": is_redeye,
                    }
                )
    return processed_data


# Calculate the scores using the user's inputted preferences and the flights' comparsion with the average calculated price and duration
def calculate_scores(flights, preferences):
    redeye_preference, cost_preference, duration_preference = (
        preferences["cost_preference"],
        preferences["duration_preference"],
        preferences["redeye_preference"],
    )
    avg_price = sum(flight["price"] for flight in flights) / len(flights)
    avg_duration = sum(flight["duration"] for flight in flights) / len(flights)

    scores = []
    for flight in flights:
        bin_scores = []
        score = 0
        # Determine price preference score
        if flight["price"] > avg_price:
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

        flight["bin_score"] = bin_scores
        flight["score"] = score

        # Determine redeye_preference
        if flight["is_redeye"]:
            bin_scores.append(-1)
            score += -1 * redeye_preference
        else:
            bin_scores.append(1)
            score += 1 * redeye_preference

    return {"flights": flights, "avg_price": avg_price, "avg_duration": avg_duration}
