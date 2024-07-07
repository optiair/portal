# Placeholder, getting the user's preferences for cost, duration and red-eye
def get_user_preferences():
    no_redeye_importance = int(
        input("How important is avoiding red-eye flights (1-5)? ")
    )
    price_importance = int(input("How important is the price (1-5)? "))
    duration_importance = int(
        input("How important is the duration of the flight (1-5)? ")
    )
    return no_redeye_importance, price_importance, duration_importance


# Call the functions and display the best flight
def main():
    with open("./backend/app/data.json") as f:
        data = json.load(f)

    flights = process_flight_data(data)
    preferences = get_user_preferences()
    scores, avg_price, avg_duration = calculate_scores(flights, preferences)

    print(f"Average Flight Time: {avg_duration:.2f} minutes")
    print(f"Average Price: ${avg_price:.2f}\n")

    for flight in flights:
        print(f"Flight {flight['flight_number']}:")
        print(f"  Departure Airport: {flight['departure_airport']}")
        print(f"  Arrival Airport: {flight['arrival_airport']}")
        print(
            f"  Departure Time: {flight['departure_time'].strftime('%Y-%m-%d %H:%M')}"
        )
        print(f"  Arrival Time: {flight['arrival_time'].strftime('%Y-%m-%d %H:%M')}")
        print(f"  Duration: {flight['duration']:.0f} minutes")
        print(f"  Price: ${flight['price']} {flight['currency']}")
        print(f"  Airline: {flight['airline']}")
        print(f"  Red-eye: {'Yes' if flight['is_redeye'] else 'No'}")
        print(f"  Score: {flight['score']}")
        print()

    for flight in flights:
        print(f"Score for {flight['flight_number']}: {flight['score']}")

    best_flight = max(flights, key=lambda x: x["score"])
    print(f"\nBest flight based on your preferences: {best_flight['flight_number']}")


if __name__ == "__main__":
    main()
