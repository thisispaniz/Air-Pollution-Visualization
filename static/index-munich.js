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
d3.json('static/fake-munich-data.json').then(geojson => {
    const apiUrl = 'https://air-quality-api.open-meteo.com/v1/air-quality?latitude=48.1431,48.1262,48.15,48.1679,48.1286,48.1126,48.1152,48.136,48.1551,48.1811,48.2106,48.2012,48.1574,48.1273,48.1287,48.1036,48.1054,48.1004,48.0768,48.1154,48.1405,48.1611,48.1902,48.2115,48.1371&longitude=11.5886,11.5583,11.5736,11.5711,11.5939,11.5451,11.5198,11.5382,11.523,11.5115,11.5722,11.6146,11.6492,11.6347,11.6835,11.6336,11.5915,11.5664,11.512,11.4791,11.4616,11.4136,11.4676,11.5132,11.5025&current=european_aqi';

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
