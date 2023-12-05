import http.client

conn = http.client.HTTPSConnection("air-quality.p.rapidapi.com")

headers = {
    'X-RapidAPI-Key': "3425d39d3bmshe80957c784ebb11p1552a4jsnaecd6c95eff4",
    'X-RapidAPI-Host': "air-quality.p.rapidapi.com"
}

conn.request("GET", "/history/airquality?lon=48.1351&lat=11.582", headers=headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))