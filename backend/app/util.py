import json
from datetime import datetime, timedelta

#Function Purpose: processes the data from the SerpAPI
#Ensures that the duration time can be calculated with, and determine if a flight is classified as a "Red-Eye"
def process_flight_data(flight_data):
    processed_data = []
    
    if 'best_flights' in flight_data:
        for best_flight in flight_data['best_flights']:
            for flight in best_flight['flights']:
                #Adjust the time, because it is coming from a string!!
                departure_time = datetime.strptime(flight['departure_airport']['time'], '%Y-%m-%d %H:%M')
                arrival_time = datetime.strptime(flight['arrival_airport']['time'], '%Y-%m-%d %H:%M')
                
                #Fix for overnight flights
                if arrival_time < departure_time:
                    arrival_time += timedelta(days=1)
                
                duration = (arrival_time - departure_time).total_seconds() / 60
                
                is_redeye = departure_time.hour >= 0 and departure_time.hour < 6
                
                processed_data.append({
                    'departure_airport': flight['departure_airport']['name'],
                    'arrival_airport': flight['arrival_airport']['name'],
                    'departure_time': departure_time,
                    'arrival_time': arrival_time,
                    'duration': duration,
                    'airline': flight['airline'],
                    'flight_number': flight['flight_number'],
                    'price': best_flight['price'],
                    'currency': flight_data['search_parameters']['currency'],
                    'is_redeye': is_redeye
                })
    return processed_data

#Placeholder, getting the user's preferences for cost, duration and red-eye
def get_user_preferences():
    no_redeye_importance = int(input("How important is avoiding red-eye flights (1-5)? "))
    price_importance = int(input("How important is the price (1-5)? "))
    duration_importance = int(input("How important is the duration of the flight (1-5)? "))
    return no_redeye_importance, price_importance, duration_importance

#Calculate the scores using the user's inputted preferences and the flights' comparsion with the average calculated price and duration
def calculate_scores(flights, preferences):
    no_redeye_importance, price_importance, duration_importance = preferences
    avg_price = sum(flight['price'] for flight in flights) / len(flights)
    avg_duration = sum(flight['duration'] for flight in flights) / len(flights)
    
    scores = []
    for flight in flights:
        score = 0
        #Determine no_redeye_importance
        if flight['is_redeye']:
            score += -1 * no_redeye_importance
        else:
            score += 1 * no_redeye_importance
        
        #Determine price preference score
        if flight['price'] > avg_price:
            score += -1 * price_importance
        else:
            score += 1 * price_importance
        
        #Determine duration preference score
        if flight['duration'] > avg_duration:
            score += -1 * duration_importance
        else:
            score += 1 * duration_importance
        
        flight['score'] = score
    
    return flights, avg_price, avg_duration

#Call the functions and display the best flight
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
        print(f"  Departure Time: {flight['departure_time'].strftime('%Y-%m-%d %H:%M')}")
        print(f"  Arrival Time: {flight['arrival_time'].strftime('%Y-%m-%d %H:%M')}")
        print(f"  Duration: {flight['duration']:.0f} minutes")
        print(f"  Price: ${flight['price']} {flight['currency']}")
        print(f"  Airline: {flight['airline']}")
        print(f"  Red-eye: {'Yes' if flight['is_redeye'] else 'No'}")
        print(f"  Score: {flight['score']}")
        print()
    
    for flight in flights:  
        print(f"Score for {flight['flight_number']}: {flight['score']}")
    
    best_flight = max(flights, key=lambda x: x['score'])
    print(f"\nBest flight based on your preferences: {best_flight['flight_number']}")

if __name__ == "__main__":
    main()
