import requests

url = "https://api.ambeedata.com/latest/by-lat-lng?lat={lat}&lng={lng}"
api_key = "8493379349b84805fdb89ca94c234b1e2245a40db2d80eac801992e4e881a77f"

headers = {
    "Content-Type": "application/json",
    "x-api-key": api_key,
}

response = requests.get(url, headers=headers)

# Check if the request was successful (status code 200)
if response.status_code == 200:
    data = response.json()
    print("Data received:")
    print(data)
else:
    print(f"Error: {response.status_code}, {response.text}")