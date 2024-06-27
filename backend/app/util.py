import json
def process_flight_data(flight_data):
    processed_data = []
    
    if 'best_flights' in flight_data:
        for best_flight in flight_data['best_flights']:
            for flight in best_flight['flights']:
                duration_minutes = flight['duration']
                hours = duration_minutes // 60
                minutes = duration_minutes % 60
                
                processed_data.append({
                    'departure_airport': flight['departure_airport']['name'],
                    'arrival_airport': flight['arrival_airport']['name'],
                    'departure_time': flight['departure_airport']['time'],
                    'arrival_time': flight['arrival_airport']['time'],
                    'duration': f"{hours} hours and {minutes} minutes",
                    'airline': flight['airline'],
                    'flight_number': flight['flight_number'],
                    'price': best_flight['price'],
                    'currency': flight_data['search_parameters']['currency']
                })
    return processed_data

f = open('data.json')
data = json.load(f)
print(process_flight_data(data))
