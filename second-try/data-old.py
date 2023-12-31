import requests
import json
from datetime import datetime, timedelta

rapidapi_key = "3425d39d3bmshe80957c784ebb11p1552a4jsnaecd6c95eff4"

city_coordinates_list = [
    {"lat": "52.520008", "lon": "13.404954"}, #Berlin
    {"lat": "53.5488", "lon": "9.9872"}, #Hamburg
    {"lat": "48.1351", "lon": "11.582"}, #Munich
    {"lat": "50.9375", "lon": "6.9603"}, #Cologne
    {"lat": "50.1109", "lon": "8.6821"}, #Frankfurt
    {"lat": "48.7758", "lon": "9.1829"}, #Stuttgart
    {"lat": "53.0793", "lon": "8.8017"}, #Bremen
    {"lat": "51.0504", "lon": "13.7373"}, #Dresden
    {"lat": "52.3759", "lon": "9.7320"}, #Hannover
    {"lat": "50.9848", "lon": "11.0299"}, #Erfurt
    {"lat": "54.3233", "lon": "10.1228"}, #Kiel
    {"lat": "52.1205", "lon": "11.6276"}, #Magdeburg
    {"lat": "49.9929", "lon": "8.2473"}, #Mainz
    {"lat": "52.3906", "lon": "13.0645"}, #Potsdam
    {"lat": "49.2382", "lon": "6.9975"}, #Saarbrucken
    {"lat": "53.6355", "lon": "11.4012"} #Schwerin
]


headers = {
    "X-RapidAPI-Key": rapidapi_key,
    "X-RapidAPI-Host": "air-quality.p.rapidapi.com",
}

current_time = datetime.utcnow()

all_city_data = {}

for city_coordinates in city_coordinates_list:
    url = "https://air-quality.p.rapidapi.com/forecast/airquality"
    response = requests.get(url, headers=headers, params=city_coordinates)

    if response.status_code == 200:
        data = response.json()
        print("Data for city:", city_coordinates)
        print(json.dumps(data, indent=2))

        # Store the entire response in the dictionary
        city_name = f"{city_coordinates['lat']}_{city_coordinates['lon']}"
        all_city_data[city_name] = data

    else:
        print(f"Error for city {city_coordinates}: {response.status_code}")

time_12_hours_from_now = current_time + timedelta(hours=12)

output_data = {"timestamp": time_12_hours_from_now.isoformat(), "cities": all_city_data}

with open("air_quality_data.json", "w") as json_file:
    json.dump(output_data, json_file, indent=2)

print("Data saved successfully to air_quality_data.json")
