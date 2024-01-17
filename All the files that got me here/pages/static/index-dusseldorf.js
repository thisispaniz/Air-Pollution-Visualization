const width = 1200;
const height = 900;

const svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height);

const projection = d3.geoMercator()
    .center([6.77, 51.22])
    .scale(5000)
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
d3.json('static/GEOJSON/dusselford-data.json').then(geojson => {
    const apiUrl = 'https://air-quality-api.open-meteo.com/v1/air-quality?latitude=51.1172,51.3156,51.2582,51.2255,51.2382,51.2404,51.2244,51.2695,51.3238,51.1984,51.2307,51.2093,51.1616,51.2202,51.2303,51.1945,51.2853,51.1892,51.2315,51.2587,51.2847,51.2772,51.2617,51.2643,51.2553,51.3004,51.2942,51.2806,51.2802,51.2399,51.2472,51.3022,51.2762,51.2121,51.2767,51.2453,51.2094,51.2135,51.1572,51.2808,51.2229,51.2657,51.2837,51.2247,51.1747,51.2211,51.2343,51.2359,51.2146,51.2448&longitude=6.8958,6.9303,6.8923,6.7727,6.7247,6.7326,6.7763,6.7178,6.7894,6.7155,6.7927,6.7775,6.8744,6.7912,6.8107,6.8782,6.8053,6.9127,6.8551,6.7815,6.7555,6.7099,6.6937,6.6343,6.7291,6.7458,6.7676,6.8069,6.7852,6.8969,6.7671,6.7614,6.7566,6.7743,6.7798,6.8063,6.7528,6.8592,6.8211,6.7174,6.9355,6.7328,6.7632,6.8112,6.7934,6.8222,6.9003,6.7992,6.8305,6.8021&current=european_aqi';

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
