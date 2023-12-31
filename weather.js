import axios from "axios"

//https://air-quality-api.open-meteo.com/v1/air-quality?&current=european_aqi,pm10,pm2_5,uv_index&hourly=pm10,pm2_5,uv_index&forecast_days=3&domains=cams_europe

export function getWeather (lat, lon) {
    return axios.get("https://air-quality-api.open-meteo.com/v1/air-quality?&current=european_aqi,pm10,pm2_5,uv_index&hourly=pm10,pm2_5,uv_index&forecast_days=3&domains=cams_europe", 
        {
            params: {
            latitude: lat, 
            longitude: lon,
            },
        }
    )
}

getWeather(10,10).then(
    res => {
        console.log(res.data)
    }
)