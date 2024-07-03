from flask import Blueprint, jsonify

main = Blueprint('main', __name__)

@main.route('/api/hello', methods=['GET'])
def hello():
    return jsonify(message="Hello from Flask!")

@main.route('/api/search', methods=['GET'])
def search():
    
    api_key = '94def37c570df053630ad99518df19b761fbf611a3157874339cc8230a787d05'  # Replace with your SerpAPI key
    search_url = f'https://serpapi.com/search'
    
    params = {
        'api_key': api_key,
        "engine": "google_flights",
        "hl": "en",
        "gl": "us",
        "departure_id": "YYZ", #User Inputs
        "arrival_id": "LAS", #User Inputs 
        "outbound_date": "2024-08-12", #This data will be user inputted. 
        "return_date": "2024-08-20",
        "currency": "CAD"
    }
    
    response = requests.get(search_url, params=params)
    
    if response.status_code == 200:
        flight_data = response.json()
        return jsonify(response.json())
    else:
        return jsonify({'error': 'Failed to retrieve data from SerpAPI', 'status_code': response.status_code})
    

