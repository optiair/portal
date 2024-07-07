from dotenv import load_dotenv
from flask import Blueprint, jsonify, request
from datetime import datetime
from werkzeug.exceptions import BadRequest
import requests
import os

from app.util import process_flight_data, calculate_scores

# Load environment variables from .env file
load_dotenv()

main = Blueprint("main", __name__)


@main.route("/api/hello", methods=["GET"])
def hello():
    return jsonify(message="Hello from Flask!")


@main.route("/api/search", methods=["GET"])
def search():
    api_key = os.getenv("SERPAPI_KEY")
    search_url = f"https://serpapi.com/search"

    departure_id = request.args["departure_id"]
    arrival_id = request.args["arrival_id"]
    outbound_date = request.args["outbound_date"]
    return_date = request.args.get("return_date")
    cost_preference = int(request.args.get("cost_preference"))
    duration_preference = int(request.args.get("duration_preference"))
    redeye_preference = int(request.args.get("redeye_preference"))

    preferences = {
        "cost_preference": cost_preference,
        "duration_preference": duration_preference,
        "redeye_preference": redeye_preference,
    }

    params = {
        "api_key": api_key,
        "engine": "google_flights",
        "hl": "en",
        "gl": "us",
        "departure_id": departure_id,
        "arrival_id": arrival_id,
        "type": 1 if return_date is not None else 2,
        "outbound_date": outbound_date,
        "return_date": return_date,
        "currency": "CAD",
    }

    print(params)

    try:
        response = requests.get(search_url, params=params)
    except Exception as e:
        return jsonify(
            {
                "error": "Failed to retrieve data from SerpAPI",
                "status_code": response.status_code,
            }
        )

    flight_data = process_flight_data(response.json())
    scored_flight_data = calculate_scores(flight_data, preferences)
    return jsonify(scored_flight_data)
