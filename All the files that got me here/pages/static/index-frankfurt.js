const width = 1200;
const height = 900;

const svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height);

const projection = d3.geoMercator()
    .center([8.6, 50.11])
    .scale(120000)
    .translate([width / 2.5,  height /1.75 ]);

const path = d3.geoPath().projection(projection);

const tooltip = d3.select('body').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

const legendContainer = d3.select('body').append('div')
    .attr('class', 'legend');

const legendData = [0, 10, 20, 40, 60, 80];
const legendLabels = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor', 'Extremely'];

// Declare colorScale outside of the renderMap function
const colorScale = d3.scaleLinear()
    .domain([0, 10, 30, 50, 70, 90, 100])
    .range(['#00FFF0', '#3AFF42', '#DBFF00', '#FF8A1F', '#FB504E', '#800000', '#1D0000']);

// Load GeoJSON data
d3.json('static/GEOJSON/modified-frankfurt-data.json').then(geojson => {
    const apiUrl = 'https://air-quality-api.open-meteo.com/v1/air-quality?latitude=50.1109,50.1075,50.069,50.1457,50.1322,50.1063,50.1109,50.1168,50.1188,50.1318,50.1384,50.1166,50.1153,50.0997,50.1078,50.1214,50.1285,50.071,50.1,50.0846,50.1033,50.0671,50.1443,50.1431,50.1504,50.1751,50.1535,50.1674,50.1827,50.1414,50.1503,50.1625,50.1531,50.1363,50.1488,50.1616,50.1167,50.1206,50.1523,50.1361,50.1694,50.2033,50.2177,50.2291,50.1779,50.1852&longitude=8.6821,8.6706,8.6379,8.6215,8.7574,8.6372,8.6795,8.6641,8.6707,8.6843,8.7086,8.7313,8.7214,8.6417,8.6368,8.6449,8.6892,8.6455,8.6868,8.5748,8.6224,8.604,8.5802,8.5784,8.6128,8.6598,8.6821,8.6482,8.6438,8.6671,8.6843,8.6553,8.7101,8.6913,8.7174,8.6817,8.7422,8.7007,8.6358,8.6506,8.6374,8.569,8.5965,8.6628,8.6614,8.7535&current=european_aqi';

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
                        tooltip.html(`<strong>${completeData.properties.name}</strong><br>Air Quality: ${completeData.airQualityValue || 'Not Available'}`)
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
        .style('background-color', (d, i) => colorScale(d))
        .text((d, i) => {
            const nextValue = legendData[i + 1];
            return `${legendLabels[i]} (${d}-${nextValue !== undefined ? nextValue : 'Max'})`;
        });

    legendContainer.style('position', 'absolute')
        .style('bottom', '20px')
        .style('left', '20px')
        .style('padding', '10px')
        .style('border', '1px solid #ddd')
        .style('background-color', '#fff');
});
