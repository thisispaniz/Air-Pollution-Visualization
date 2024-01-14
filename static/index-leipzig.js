const width = 1200;
const height = 1000;

const svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height);

const projection = d3.geoMercator()
    .center([12.37, 51.34])
    .scale(100000)
    .translate([width /2,  height/2 ]);

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
d3.json('static/GEOJSON/modified-leipzig-data.json').then(geojson => {
    const apiUrl = 'https://air-quality-api.open-meteo.com/v1/air-quality?latitude=51.3404,51.3418,51.3252,51.3283,51.3398,51.3546,51.3618,51.3658,51.3745,51.4027,51.4067,51.4151,51.3823,51.3985,51.3265,51.3385,51.3391,51.3583,51.3821,51.3701,51.3504,51.3553,51.3255,51.3213,51.3409,51.3543,51.3689,51.3802,51.3552,51.3332,51.3095,51.3375,51.3268,51.3297,51.3121,51.3378,51.3423,51.3088,51.3079,51.3228,51.3033,51.2791,51.2993,51.3057,51.2834,51.2673,51.3066,51.3198,51.3287,51.3267,51.3187,51.3133,51.2945,51.2773,51.2882,51.3437,51.3397,51.3678,51.3838,51.3519,51.3465,51.3473,51.4086&longitude=12.377,12.4064,12.4134,12.3918,12.3654,12.3456,12.3813,12.4329,12.4606,12.4362,12.4538,12.4553,12.5505,12.4872,12.4007,12.4134,12.4264,12.4523,12.5105,12.4974,12.5047,12.5507,12.5286,12.5326,12.5559,12.4927,12.4922,12.4991,12.4265,12.3722,12.3762,12.3281,12.3373,12.3113,12.3096,12.2681,12.2484,12.2689,12.3023,12.3695,12.3939,12.4013,12.4218,12.4585,12.4718,12.4672,12.5304,12.5313,12.5428,12.5568,12.5705,12.5914,12.5857,12.5767,12.5531,12.3221,12.3432,12.3318,12.3146,12.3336,12.3553,12.3762,12.4668&current=european_aqi';

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
