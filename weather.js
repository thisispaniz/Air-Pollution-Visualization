// Array of locations (latitude and longitude pairs)
const locations = [
    { latitude: 52.52, longitude: 13.41 },
    // Add other locations here
  ];
  
  // Function to fetch data for a location
  function fetchDataForLocation(location) {
    const apiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${location.latitude}&longitude=${location.longitude}&current=european_aqi&forecast_days=1`;
  
    return fetch(apiUrl)
      .then(response => response.json())
      .catch(error => {
        console.error(`Error fetching data for location (${location.latitude}, ${location.longitude}):`, error);
        return null;
      });
  }
  
  // Function to create choropleth map for a location
  function createChoroplethMapForLocation(data, location) {
    // Process the data and create the choropleth map here
    console.log(`Creating choropleth map for location (${location.latitude}, ${location.longitude}):`, data);
    // Implement your choropleth map creation logic here
  }
  
  // Iterate through each location and fetch data
  Promise.all(locations.map(location => fetchDataForLocation(location)))
    .then(dataArray => {
      // dataArray contains the data for each location
      dataArray.forEach((data, index) => {
        if (data) {
          createChoroplethMapForLocation(data, locations[index]);
        }
      });
    });
  