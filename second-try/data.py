import openmeteo_requests

import requests_cache
import pandas as pd
from retry_requests import retry

# Setup the Open-Meteo API client with cache and retry on error
cache_session = requests_cache.CachedSession('.cache', expire_after = 3600)
retry_session = retry(cache_session, retries = 5, backoff_factor = 0.2)
openmeteo = openmeteo_requests.Client(session = retry_session)

# Make sure all required weather variables are listed here
# The order of variables in hourly or daily is important to assign them correctly below
url = "https://air-quality-api.open-meteo.com/v1/air-quality"
params = {
	"latitude": 52.52,
	"longitude": 13.41,
	"current": ["european_aqi", "pm10", "pm2_5", "uv_index"],
	"hourly": ["pm10", "pm2_5", "uv_index"],
	"forecast_days": 3,
	"domains": "cams_europe"
}
responses = openmeteo.weather_api(url, params=params)

# Process first location. Add a for-loop for multiple locations or weather models
response = responses[0]
print(f"Coordinates {response.Latitude()}°E {response.Longitude()}°N")
print(f"Elevation {response.Elevation()} m asl")
print(f"Timezone {response.Timezone()} {response.TimezoneAbbreviation()}")
print(f"Timezone difference to GMT+0 {response.UtcOffsetSeconds()} s")

# Current values. The order of variables needs to be the same as requested.
current = response.Current()
current_european_aqi = current.Variables(0).Value()
current_pm10 = current.Variables(1).Value()
current_pm2_5 = current.Variables(2).Value()
current_uv_index = current.Variables(3).Value()

print(f"Current time {current.Time()}")
print(f"Current european_aqi {current_european_aqi}")
print(f"Current pm10 {current_pm10}")
print(f"Current pm2_5 {current_pm2_5}")
print(f"Current uv_index {current_uv_index}")

# Process hourly data. The order of variables needs to be the same as requested.
hourly = response.Hourly()
hourly_pm10 = hourly.Variables(0).ValuesAsNumpy()
hourly_pm2_5 = hourly.Variables(1).ValuesAsNumpy()
hourly_uv_index = hourly.Variables(2).ValuesAsNumpy()

hourly_data = {"date": pd.date_range(
	start = pd.to_datetime(hourly.Time(), unit = "s"),
	end = pd.to_datetime(hourly.TimeEnd(), unit = "s"),
	freq = pd.Timedelta(seconds = hourly.Interval()),
	inclusive = "left"
)}
hourly_data["pm10"] = hourly_pm10
hourly_data["pm2_5"] = hourly_pm2_5
hourly_data["uv_index"] = hourly_uv_index

hourly_dataframe = pd.DataFrame(data = hourly_data)
print(hourly_dataframe)


