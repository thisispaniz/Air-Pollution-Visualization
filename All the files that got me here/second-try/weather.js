
const locations = [
    { latitude: 52.52, longitude: 13.41 },
    { latitude: 52.52, longitude: 13.40}, //Berlin
    { latitude: 53.55, longitude: 9.99}, //Hamburg
    { latitude: 48.14, longitude: 11.58}, //Munich
    { latitude: 51.23, longitude: 6.78}, //Düsseldorf
    { latitude: 50.07, longitude: 8.23}, //Wiesbaden
    { latitude: 48.77, longitude: 9.18}, //Stuttgart
    { latitude: 53.08, longitude: 8.80}, //Bremen
    { latitude: 51.05, longitude: 13.74}, //Dresden
    { latitude: 52.37, longitude: 9.73}, //Hannover
    { latitude: 50.98, longitude: 11.03}, //Erfurt
    { latitude: 54.32, longitude: 10.12}, //Kiel
    { latitude: 52.12, longitude: 11.63}, //Magdeburg
    { latitude: 49.99, longitude: 8.25}, //Mainz
    { latitude: 52.39, longitude: 13.06}, //Potsdam
    { latitude: 49.24, longitude: 6.99}, //Saarbrucken
    { latitude: 53.64, longitude: 11.40} //Schwerin
  ];
  

  function fetchDataForLocation(location) {
    const apiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${location.latitude}&longitude=${location.longitude}&current=european_aqi&forecast_days=1`;
  
    return fetch(apiUrl)
      .then(response => response.json())
      .catch(error => {
        console.error(`Error fetching data for location (${location.latitude}, ${location.longitude}):`, error);
        return null;
      });
  }
  

  function createChoroplethMapForLocation(data, location) {

    console.log(`Creating choropleth map for location (${location.latitude}, ${location.longitude}):`, data);

  }

  Promise.all(locations.map(location => fetchDataForLocation(location)))
    .then(dataArray => {

      dataArray.forEach((data, index) => {
        if (data) {
          createChoroplethMapForLocation(data, locations[index]);
        }
      });
    });
  

    console.log('Fetching data for location:', location);