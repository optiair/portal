import json
from dotenv import load_dotenv
from flask import Blueprint, jsonify, request
import requests
import os
import logging

from app.util import normalize_flight_data, calculate_scores

# Load environment variables from .env file
load_dotenv()

main = Blueprint("main", __name__)

# Configure logging
logging.basicConfig(level=logging.DEBUG)


@main.route("/api/hello", methods=["GET"])
def hello():
    return jsonify(message="Hello from Flask!")


@main.route("/api/search", methods=["GET"])
def search():
    api_key = os.getenv("SERPAPI_KEY")
    if not api_key:
        logging.error("SERPAPI_KEY not found in environment variables")
        return jsonify({"error": "Internal Server Error"}), 500

    search_url = f"https://serpapi.com/search"

    try:
        departure_id = request.args["departure_id"]
        arrival_id = request.args["arrival_id"]
        outbound_date = request.args["outbound_date"]
        return_date = request.args.get("return_date")
    except KeyError as e:
        logging.error(f"Missing required query parameter: {e}")
        return jsonify({"error": f"Missing required query parameter: {e}"}), 400

    params = {
        "api_key": api_key,
        "engine": "google_flights",
        "hl": "en",
        "gl": "us",
        "departure_id": departure_id,
        "arrival_id": arrival_id,
        "type": 1 if return_date else 2,
        "outbound_date": outbound_date,
        "return_date": return_date,
        "currency": "CAD",
    }

    try:
        response = requests.get(search_url, params=params)
        response.raise_for_status()  # Raise an error for bad status codes
    except requests.exceptions.RequestException as e:
        logging.error(f"Failed to retrieve data from SerpAPI: {e}")
        return jsonify({"error": "Failed to retrieve data from SerpAPI"}), 500

    flight_data = normalize_flight_data(response.json(), departure_id, arrival_id)

    if not flight_data:
        logging.info("No flight data available")
        return jsonify({"message": "No flight data available"}), 404

    google_flights_url = response.json()["search_metadata"]["google_flights_url"]

    return jsonify(
        {"flight_data": flight_data, "google_flights_url": google_flights_url}
    )


@main.route("/api/score", methods=["GET"])
def score():
    try:
        flight_data = request.args["flight_data"]
        cost_preference = int(request.args.get("cost_preference"))
        duration_preference = int(request.args.get("duration_preference"))
        redeye_preference = int(request.args.get("redeye_preference"))
    except KeyError as e:
        logging.error(f"Missing required query parameter: {e}")
        return jsonify({"error": f"Missing required query parameter: {e}"}), 400

    preferences = {
        "cost_preference": cost_preference,
        "duration_preference": duration_preference,
        "redeye_preference": redeye_preference,
    }

    # Parse flight_data from JSON string to list of dictionaries
    flights = json.loads(flight_data)

    scored_flight_data = calculate_scores(flights, preferences)
    return jsonify(scored_flight_data)
