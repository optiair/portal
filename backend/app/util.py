import json
from datetime import datetime, timedelta

def validate_search(departure_id, arrival_id, outbound_date, return_date):
    missing_params = []
    if not departure_id:
        missing_params.append('departure_id')
    if not arrival_id:
        missing_params.append('arrival_id')
    if not outbound_date:
        missing_params.append('outbound_date')

    if missing_params:
        return {'error': f'Missing required parameters: {", ".join(missing_params)}', 'status_code': 400}

    if departure_id == arrival_id:
        return {'error': 'departure_id and arrival_id must be different', 'status_code': 400}

    if return_date:
        try:
            outbound_date_obj = datetime.strptime(outbound_date, '%Y-%m-%d')
            return_date_obj = datetime.strptime(return_date, '%Y-%m-%d')
            if outbound_date_obj >= return_date_obj:
                return {'error': 'outbound_date must be before return_date', 'status_code': 400}
        except ValueError:
            return {'error': 'Invalid date format. Use YYYY-MM-DD.', 'status_code': 400}

    # no errors
    return None

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
    
    return {flights, avg_price, avg_duration}