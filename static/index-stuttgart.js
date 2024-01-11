const width = 800;
const height = 900;

const svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height);

const projection = d3.geoMercator()
    .center([9.18, 48.77])
    .scale(12000)
    .translate([width / 2, height / 2]);

const path = d3.geoPath().projection(projection);

const tooltip = d3.select('body').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

const legendContainer = d3.select('body').append('div')
    .attr('class', 'legend');

const legendData = [ 0, 10, 20, 40, 60, 80];
const legendLabels = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor', 'Extremely '];

// Declare colorScale outside of the renderMap function
const colorScale = d3.scaleLinear()
    .domain([0, 10, 30, 50, 70, 90, 100])
    .range(['#00FFF0', '#3AFF42', '#DBFF00', '#FF8A1F', '#FB504E', '#800000', '#1D0000']);

// Load GeoJSON data
d3.json('static/fake-stuttgart-data.json').then(geojson => {
    const apiUrl = 'https://air-quality-api.open-meteo.com/v1/air-quality?latitude=48.8474,48.8316,48.8391,48.8237,48.7609,48.7782,48.7671,48.7088,48.7304,48.2012,48.7414,48.7857,48.7268,48.7236,48.7746,48.7588,48.7442,48.7653,48.782,48.7791,48.7927,48.8142,48.8116&longitude=9.1509,9.1746,9.2222,9.2091,9.1549,9.1284,9.1088,9.2052,9.1079,11.6146,9.1774,9.2562,9.2015,9.146,9.2364,9.2441,9.214,9.2682,9.2087,9.1801,9.1685,9.1121,9.1589&current=european_aqi';

    fetch(apiUrl)
        .then(response => response.json())
        .then(airQualityData => {
            renderMap(geojson, airQualityData);
            console.log("data: ", airQualityData)
        })
        .catch(error => console.error('Error fetching air quality data:', error));

    function renderMap(geoJson, airQualityData) {
        try {
            const getColor = d => {
                if (d.airQualityValue !== undefined && d.airQualityValue !== null) {
                    return colorScale(d.airQualityValue);
                } else {
                    console.log('Invalid data for feature:', d);
                    return '#282929';
                }
            };

            const joinedData = geoJson.features.map(feature => {
                const locationId = feature.properties.location_id;
                const airQualityDatum = airQualityData.find(d => d.location_id === locationId);
                return { ...feature, airQualityValue: airQualityDatum ? airQualityDatum.current.european_aqi : null };
            });

            console.log('Joined Data:', joinedData);

            svg.selectAll('path')
                .data(joinedData)
                .enter()
                .append('path')
                .attr('d', path)
                .attr('fill', d => getColor(d))
                .attr('stroke', 'white')
                .on('mouseover', function (event, d) {
                    const completeData = d3.select(this).datum();
                    console.log('Complete Data:', completeData);

                    d3.select(this)
                        .style("opacity", 0.6);

                    tooltip.transition()
                        .duration(200)
                        .style('opacity', 0.9);

                    if (completeData.properties && completeData.properties.name) {
                        tooltip.html(`<strong>${completeData.properties.name}</strong><br>Air Quality: ${completeData.airQualityValue}`)
                            .style('left', (event.pageX + 10) + 'px')
                            .style('top', (event.pageY - 18) + 'px');
                    } else {
                        console.error('Invalid data for tooltip:', completeData);
                    }
                })
                .on('mouseout', function () {
                    d3.select(this)
                        .attr('fill', d => getColor(d))
                        .style('opacity', 1);

                    tooltip.transition()
                        .duration(500)
                        .style('opacity', 0);
                });
        } catch (error) {
            console.error('Error rendering map:', error);
        }
    }

    const legendBlocks = legendContainer.selectAll('.legend-block')
        .data(legendData)
        .enter()
        .append('div')
        .attr('class', 'legend-block');

    legendBlocks
        .style('background-color', d => colorScale(d))
        .text((d, i) => `${legendLabels[i]} (${d}-${legendData[i + 1] || 'Max'})`);

    legendContainer.style('position', 'absolute')
        .style('bottom', '20px')
        .style('left', '20px')
        .style('padding', '10px')
        .style('border', '1px solid #ddd')
        .style('background-color', '#fff');
});
