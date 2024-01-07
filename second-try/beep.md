import requests

url = "https://air-quality.p.rapidapi.com/forecast/airquality"
querystring = {"lat":"48.1351","lon":"11.582","hours":"72"}

headers = {
	"X-RapidAPI-Key": "3425d39d3bmshe80957c784ebb11p1552a4jsnaecd6c95eff4",
	"X-RapidAPI-Host": "air-quality.p.rapidapi.com"
}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())