const width = 1200;
const height = 900;

const svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height);

const projection = d3.geoMercator()
    .center([6.99, 50.55])
    .scale(100000)
    .translate([width / 2,  1.75 * height ]);

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
d3.json('static/GEOJSON/modified-cologne-data.json').then(geojson => {
    const apiUrl = 'https://air-quality-api.open-meteo.com/v1/air-quality?latitude=50.9724,51.0164,50.9715,50.9477,50.9585,50.9743,50.9372,50.9451,51.0006,50.9297,50.9459,50.9772,50.9417,50.9875,50.9503,50.9867,50.9701,50.9561,50.9512,50.9637,50.9252,50.9376,50.9388,50.9944,50.9477,50.9751,50.9367,50.9881,50.9499,50.9464,50.9407,50.9434,50.9604,50.9436,50.9571,50.9258,50.9207,50.9167,50.9635,50.9282,50.9313,50.9185,50.9016,50.9513,50.9044,50.9732,50.9298,50.9728,50.9255,50.9403,50.9509,50.9844,50.9451,50.9272,50.9353,50.9485,50.9071,50.9059,50.9726,50.9643,50.9197,50.9332,50.9432,50.9625,50.9753,50.9949,50.9627,50.9314,50.9503,50.9918,50.9505,50.9268,50.9234,50.9821,50.9163,50.9363,50.9098,50.8983,50.9257,50.9779,50.9609,50.9176,50.9196,50.9164,50.9545,50.9344&longitude=6.9988,6.8486,7.1048,7.0561,7.0831,6.9424,6.9578,6.9192,7.0236,7.0116,6.6748,7.0082,6.8905,6.9656,7.0378,6.9367,6.9319,6.9622,6.9562,6.9897,7.0172,7.0482,6.8915,6.9285,6.9513,7.0567,7.0261,6.9872,6.9881,6.937,6.9703,6.9286,6.9167,6.9416,7.0141,7.0395,7.0144,7.0573,6.9208,6.9602,6.9219,7.0225,6.9891,6.9735,7.0312,6.8587,6.9824,7.0488,7.0722,7.0753,7.0112,6.8758,6.9654,7.0429,7.0142,7.0456,7.0658,7.0849,6.9069,6.9616,7.0134,7.0028,6.9289,6.9917,7.0265,7.0496,6.9224,7.0464,7.0704,6.9979,6.9127,6.9769,7.0525,7.0378,7.0391,7.0875,7.0862,7.0547,7.0811,6.9908,6.9645,6.9748,7.0515,7.0658,6.9491,7.0118&current=european_aqi';

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
