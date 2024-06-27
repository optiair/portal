import random
from datetime import datetime, timedelta

def generate_random_flights():
    flights = []
    for i in range(3):
        departure_time = datetime.strptime('2024-08-12', '%Y-%m-%d') + timedelta(hours=random.randint(0, 23), minutes=random.randint(0, 59))
        duration = random.randint(240, 360)  # Duration between 4 to 6 hours
        price = random.randint(200, 600)  # Price between $200 to $600
        flights.append({
            'flight_number': f'FL{i+1}',
            'departure_time': departure_time,
            'duration': duration,
            'price': price,
            'is_redeye': departure_time.hour >= 0 and departure_time.hour < 6
        })
    return flights

def get_user_preferences():
    no_redeye_importance = int(input("How important is avoiding red-eye flights (1-5)? "))
    price_importance = int(input("How important is the price (1-5)? "))
    duration_importance = int(input("How important is the duration of the flight (1-5)? "))
    return no_redeye_importance, price_importance, duration_importance

def calculate_scores(flights, preferences):
    no_redeye_importance, price_importance, duration_importance = preferences
    avg_price = sum(flight['price'] for flight in flights) / len(flights)
    avg_duration = sum(flight['duration'] for flight in flights) / len(flights)
    
    scores = []
    for flight in flights:
        score = 0
        # Red-eye preference
        if flight['is_redeye']:
            score -= no_redeye_importance
        else:
            score += no_redeye_importance
        
        # Price preference
        if flight['price'] > avg_price:
            score -= price_importance
        else:
            score += price_importance
        
        # Duration preference
        if flight['duration'] > avg_duration:
            score -= duration_importance
        else:
            score += duration_importance
        
        scores.append((flight['flight_number'], score))
    
    return scores, avg_price, avg_duration

def main():
    flights = generate_random_flights()
    preferences = get_user_preferences()
    scores, avg_price, avg_duration = calculate_scores(flights, preferences)
    
    print(f"Average Flight Time: {avg_duration:.2f} minutes")
    print(f"Average Price: ${avg_price:.2f}\n")
    
    for flight in flights:
        print(f"Flight {flight['flight_number']}:")
        print(f"  Departure Time: {flight['departure_time'].strftime('%Y-%m-%d %H:%M')}")
        print(f"  Duration: {flight['duration']} minutes")
        print(f"  Price: ${flight['price']}")
        print(f"  Red-eye: {'Yes' if flight['is_redeye'] else 'No'}")
        print()
    
    for flight_number, score in scores:
        print(f"Score for {flight_number}: {score}")
    
    best_flight = max(scores, key=lambda x: x[1])
    print(f"\nBest flight based on your preferences: {best_flight[0]}")

if __name__ == "__main__":
    main()
