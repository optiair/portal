from flask import Blueprint, jsonify, request
from dotenv import load_dotenv
import requests
import os

from backend.app.util import validate_search

# Load environment variables from .env file
load_dotenv()

main = Blueprint('main', __name__)

@main.route('/api/hello', methods=['GET'])
def hello():
    return jsonify(message="Hello from Flask!")

@main.route('/api/search', methods=['GET'])
def search():
    api_key = os.getenv('SERPAPI_KEY')
    search_url = f'https://serpapi.com/search'

    departure_id = request.args.get('departure_id')
    arrival_id = request.args.get('arrival_id')
    outbound_date = request.args.get('outbound_date')
    return_date = request.args.get('return_date')

    validation_error = validate_search(departure_id, arrival_id, outbound_date, return_date)
    if validation_error:
        return jsonify({'error': validation_error['error']}), validation_error['status_code']

    params = {
        'api_key': api_key,
        "engine": "google_flights",
        "hl": "en",
        "gl": "us",
        "departure_id": departure_id,
        "arrival_id": arrival_id,
        "outbound_date": outbound_date,
        "return_date": return_date,
        "currency": "CAD"
    }
    
    response = requests.get(search_url, params=params)
    
    if response.status_code == 200:
        flight_data = response.json()
        return jsonify(response.json())
    else:
        return jsonify({'error': 'Failed to retrieve data from SerpAPI', 'status_code': response.status_code})
    

