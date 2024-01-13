const width = 1200;
const height = 900;

const svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height);

const projection = d3.geoMercator()
    .center([9.99, 53.55])
    .scale(50000)
    .translate([width / 3, height / 9]);

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
d3.json('static/modified-hamburg-data.json').then(geojson => {
    const apiUrl = 'https://air-quality-api.open-meteo.com/v1/air-quality?latitude=53.4508,53.5291,53.4726,53.5038,53.5386,53.5305,53.5614,53.4941,53.5495,53.4688,53.4586,53.5128,53.4874,53.563,53.5527,53.5405,53.5557,53.5612,53.5511,53.5249,53.5384,53.5166,53.4983,53.5314,53.6514,53.6607,53.5929,53.5464,53.4985,53.5673,53.5511,53.5711,53.5936,53.5769,53.5951,53.5771,53.5398,53.5669,53.5752,53.5914,53.5658,53.5627,53.5785,53.5844,53.5943,53.5957,53.5925,53.5873,53.5662,53.5742,53.5561,53.552,53.5474,53.5089,53.4949,53.4965,53.4992,53.5325,53.5963,53.565,53.5724,53.5755,53.5658,53.5903,53.6252,53.659,53.5952,53.6035,53.6085,53.5745,53.5928,53.5894,53.609,53.5753,53.5733,53.5738,53.6007,53.6001,53.5613,53.5675,53.5675,53.5452,53.5452,53.5744,53.5609,53.5628,53.581,53.5663,53.5471,53.5621,53.5816,53.5612,53.5633,53.577,53.5919,53.5782,53.5731,53.5674,53.5948,53.5484,53.5633,53.5515,53.5695,53.5479,53.5585,53.5889,53.5643,53.5823&longitude=10.0954,10.0457,9.7541,9.8479,9.8631,9.9731,9.9081,9.9533,9.9397,9.9369,9.9408,9.9241,9.8756,9.9611,9.9496,10.0008,9.9689,10.0093,10.063,10.0839,10.0953,10.0706,10.2072,10.0321,10.093,10.0461,9.8775,9.982,9.9747,9.9369,10.0102,9.9772,10.0289,10.0238,10.0661,9.9352,10.0354,10.0165,10.0063,10.0641,10.0732,10.0345,10.0374,10.0157,10.0003,10.0027,10.0245,10.0542,9.9973,9.9875,10.0159,10.0367,10.0836,10.0562,10.0307,10.0811,10.0462,10.0695,10.0551,9.9747,9.9645,9.9559,9.9312,9.9442,10.0756,10.0682,9.995,10.0088,10.0377,10.0329,10.0188,9.9482,10.0495,10.0657,9.9992,10.0654,10.0202,10.0458,9.9984,9.9515,9.9515,10.0018,10.0018,10.0648,10.0007,10.0357,10.0711,10.0631,9.982,10.0128,10.0384,9.9515,9.9634,10.0526,9.9687,10.0135,10.0663,10.0619,9.9768,9.9992,10.0422,10.0117,10.0447,10.0419,10.0389,10.0468,10.0633,9.9677&current=european_aqi';

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
