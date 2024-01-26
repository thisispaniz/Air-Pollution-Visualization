
// script.js

// Define a variable to store the selected value
var selectedValue = null;

// Function to handle link clicks
function handleLinkClick(event) {
    // Prevent the default behavior of the link (preventing navigation)
    event.preventDefault();

    cityLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Get the id attribute of the clicked link
    var clickedId = event.target.id;

    // Update the selectedValue variable
    selectedValue = parseInt(clickedId);

    event.target.classList.add('active');
    // Log the selected value (you can replace this with your logic)
    console.log("Selected value: " + selectedValue);

    if (selectedValue === 9) {
        testing456();
    } else {
        testing123();
    }

}

// Attach click event listeners to the links with the "city-link" class
var cityLinks = document.querySelectorAll('.city-link');
cityLinks.forEach(function(link) {
    link.addEventListener('click', handleLinkClick);
});





const width = 1200;
const height = 900;

const svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height);

const tooltip = d3.select('body').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

const legendContainer = d3.select('body').append('div')
    .attr('class', 'legend');

const legendData = [ 0, 10, 20, 40, 60, 80];
const legendLabels = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor', 'Extremely '];

const colorScale = d3.scaleLinear()
    .domain([0, 10, 30, 50, 70, 90, 100])
    .range(['#00FFF0', '#3AFF42', '#DBFF00', '#FF8A1F', '#FB504E', '#800000', '#1D0000']);



const projection =[];

projection[0] = d3.geoMercator()
    .center([13.18, 52.77])
    .scale(50000)
    .translate([width / 3, height / 9]);

projection[1] = d3.geoMercator()
    .center([9.99, 53.55])
    .scale(75000)
    .translate([(width / 3) + 80, height/1.75 ]);

projection[2] = d3.geoMercator()
    .center([11.18, 48.77])
    .scale(11000)
    .translate([width / 2.5 - 30, height / 2]);

projection[3] = d3.geoMercator()
    .center([6.99, 50.55])
    .scale(100000)
    .translate([width / 2,  1.75 * height ]);

projection[4] = d3.geoMercator()
    .center([8.6, 50.11])
    .scale(120000)
    .translate([width / 2.5,  height /1.75 ]);

projection[5] = d3.geoMercator()
    .center([9.18, 48.77])
    .scale(12000)
    .translate([width / 2, height / 2]);
    
projection[6] = d3.geoMercator()
    .center([6.77, 51.22])
    .scale(100000)
    .translate([width / 2.5,  height /1.75 ]);

projection[7] = d3.geoMercator()
    .center([10.21, 51.45])
    .scale(90000)
    .translate([width / 75,  2.85* height  ]);

projection[8] = d3.geoMercator()
    .center([12.37, 51.33])
    .scale(90000)
    .translate([width /2,  height/2]);

projection[9] = d3.geoMercator()
    .center([10, 51.5])
    .scale(3000)
    .translate([width/2, height/2])

const apis =[];

apis[0]='https://air-quality-api.open-meteo.com/v1/air-quality?latitude=52.52,52.5159,52.5697,52.5075,52.5351,52.4299,52.4408,52.4812,52.4177,52.5225,52.51,52.6043&longitude=13.405,13.4544,13.4032,13.2921,13.1975,13.2294,13.3737,13.4358,13.6015,13.5865,13.4999,13.295&current=european_aqi';
apis[1]='https://air-quality-api.open-meteo.com/v1/air-quality?latitude=53.4508,53.5291,53.4726,53.5038,53.5386,53.5305,53.5614,53.4941,53.5495,53.4688,53.4586,53.5128,53.4874,53.563,53.5527,53.5405,53.5557,53.5612,53.5511,53.5249,53.5384,53.5166,53.4983,53.5314,53.6514,53.6607,53.5929,53.5464,53.4985,53.5673,53.5511,53.5711,53.5936,53.5769,53.5951,53.5771,53.5398,53.5669,53.5752,53.5914,53.5658,53.5627,53.5785,53.5844,53.5943,53.5957,53.5925,53.5873,53.5662,53.5742,53.5561,53.552,53.5474,53.5089,53.4949,53.4965,53.4992,53.5325,53.5963,53.565,53.5724,53.5755,53.5658,53.5903,53.6252,53.659,53.5952,53.6035,53.6085,53.5745,53.5928,53.5894,53.609,53.5753,53.5733,53.5738,53.6007,53.6001,53.5613,53.5675,53.5675,53.5452,53.5452,53.5744,53.5609,53.5628,53.581,53.5663,53.5471,53.5621,53.5816,53.5612,53.5633,53.577,53.5919,53.5782,53.5731,53.5674,53.5948,53.5484,53.5633,53.5515,53.5695,53.5479,53.5585,53.5889,53.5643,53.5823&longitude=10.0954,10.0457,9.7541,9.8479,9.8631,9.9731,9.9081,9.9533,9.9397,9.9369,9.9408,9.9241,9.8756,9.9611,9.9496,10.0008,9.9689,10.0093,10.063,10.0839,10.0953,10.0706,10.2072,10.0321,10.093,10.0461,9.8775,9.982,9.9747,9.9369,10.0102,9.9772,10.0289,10.0238,10.0661,9.9352,10.0354,10.0165,10.0063,10.0641,10.0732,10.0345,10.0374,10.0157,10.0003,10.0027,10.0245,10.0542,9.9973,9.9875,10.0159,10.0367,10.0836,10.0562,10.0307,10.0811,10.0462,10.0695,10.0551,9.9747,9.9645,9.9559,9.9312,9.9442,10.0756,10.0682,9.995,10.0088,10.0377,10.0329,10.0188,9.9482,10.0495,10.0657,9.9992,10.0654,10.0202,10.0458,9.9984,9.9515,9.9515,10.0018,10.0018,10.0648,10.0007,10.0357,10.0711,10.0631,9.982,10.0128,10.0384,9.9515,9.9634,10.0526,9.9687,10.0135,10.0663,10.0619,9.9768,9.9992,10.0422,10.0117,10.0447,10.0419,10.0389,10.0468,10.0633,9.9677&current=european_aqi';
apis[2]='https://air-quality-api.open-meteo.com/v1/air-quality?latitude=48.1431,48.1262,48.15,48.1679,48.1286,48.1126,48.1152,48.136,48.1551,48.1811,48.2106,48.2012,48.1574,48.1273,48.1287,48.1036,48.1054,48.1004,48.0768,48.1154,48.1405,48.1611,48.1902,48.2115,48.1371&longitude=11.5886,11.5583,11.5736,11.5711,11.5939,11.5451,11.5198,11.5382,11.523,11.5115,11.5722,11.6146,11.6492,11.6347,11.6835,11.6336,11.5915,11.5664,11.512,11.4791,11.4616,11.4136,11.4676,11.5132,11.5025&current=european_aqi';
apis[3]='https://air-quality-api.open-meteo.com/v1/air-quality?latitude=50.9724,51.0164,50.9715,50.9477,50.9585,50.9743,50.9372,50.9451,51.0006,50.9297,50.9459,50.9772,50.9417,50.9875,50.9503,50.9867,50.9701,50.9561,50.9512,50.9637,50.9252,50.9376,50.9388,50.9944,50.9477,50.9751,50.9367,50.9881,50.9499,50.9464,50.9407,50.9434,50.9604,50.9436,50.9571,50.9258,50.9207,50.9167,50.9635,50.9282,50.9313,50.9185,50.9016,50.9513,50.9044,50.9732,50.9298,50.9728,50.9255,50.9403,50.9509,50.9844,50.9451,50.9272,50.9353,50.9485,50.9071,50.9059,50.9726,50.9643,50.9197,50.9332,50.9432,50.9625,50.9753,50.9949,50.9627,50.9314,50.9503,50.9918,50.9505,50.9268,50.9234,50.9821,50.9163,50.9363,50.9098,50.8983,50.9257,50.9779,50.9609,50.9176,50.9196,50.9164,50.9545,50.9344&longitude=6.9988,6.8486,7.1048,7.0561,7.0831,6.9424,6.9578,6.9192,7.0236,7.0116,6.6748,7.0082,6.8905,6.9656,7.0378,6.9367,6.9319,6.9622,6.9562,6.9897,7.0172,7.0482,6.8915,6.9285,6.9513,7.0567,7.0261,6.9872,6.9881,6.937,6.9703,6.9286,6.9167,6.9416,7.0141,7.0395,7.0144,7.0573,6.9208,6.9602,6.9219,7.0225,6.9891,6.9735,7.0312,6.8587,6.9824,7.0488,7.0722,7.0753,7.0112,6.8758,6.9654,7.0429,7.0142,7.0456,7.0658,7.0849,6.9069,6.9616,7.0134,7.0028,6.9289,6.9917,7.0265,7.0496,6.9224,7.0464,7.0704,6.9979,6.9127,6.9769,7.0525,7.0378,7.0391,7.0875,7.0862,7.0547,7.0811,6.9908,6.9645,6.9748,7.0515,7.0658,6.9491,7.0118&current=european_aqi';
apis[4]='https://air-quality-api.open-meteo.com/v1/air-quality?latitude=50.1109,50.1075,50.069,50.1457,50.1322,50.1063,50.1109,50.1168,50.1188,50.1318,50.1384,50.1166,50.1153,50.0997,50.1078,50.1214,50.1285,50.071,50.1,50.0846,50.1033,50.0671,50.1443,50.1431,50.1504,50.1751,50.1535,50.1674,50.1827,50.1414,50.1503,50.1625,50.1531,50.1363,50.1488,50.1616,50.1167,50.1206,50.1523,50.1361,50.1694,50.2033,50.2177,50.2291,50.1779,50.1852&longitude=8.6821,8.6706,8.6379,8.6215,8.7574,8.6372,8.6795,8.6641,8.6707,8.6843,8.7086,8.7313,8.7214,8.6417,8.6368,8.6449,8.6892,8.6455,8.6868,8.5748,8.6224,8.604,8.5802,8.5784,8.6128,8.6598,8.6821,8.6482,8.6438,8.6671,8.6843,8.6553,8.7101,8.6913,8.7174,8.6817,8.7422,8.7007,8.6358,8.6506,8.6374,8.569,8.5965,8.6628,8.6614,8.7535&current=european_aqi';
apis[5]='https://air-quality-api.open-meteo.com/v1/air-quality?latitude=48.8474,48.8316,48.8391,48.8237,48.7609,48.7782,48.7671,48.7088,48.7304,48.2012,48.7414,48.7857,48.7268,48.7236,48.7746,48.7588,48.7442,48.7653,48.782,48.7791,48.7927,48.8142,48.8116&longitude=9.1509,9.1746,9.2222,9.2091,9.1549,9.1284,9.1088,9.2052,9.1079,11.6146,9.1774,9.2562,9.2015,9.146,9.2364,9.2441,9.214,9.2682,9.2087,9.1801,9.1685,9.1121,9.1589&current=european_aqi';
apis[6]='https://air-quality-api.open-meteo.com/v1/air-quality?latitude=51.1172,51.3156,51.2582,51.2255,51.2382,51.2404,51.2244,51.2695,51.3238,51.1984,51.2307,51.2093,51.1616,51.2202,51.2303,51.1945,51.2853,51.1892,51.2315,51.2587,51.2847,51.2772,51.2617,51.2643,51.2553,51.3004,51.2942,51.2806,51.2802,51.2399,51.2472,51.3022,51.2762,51.2121,51.2767,51.2453,51.2094,51.2135,51.1572,51.2808,51.2229,51.2657,51.2837,51.2247,51.1747,51.2211,51.2343,51.2359,51.2146,51.2448&longitude=6.8958,6.9303,6.8923,6.7727,6.7247,6.7326,6.7763,6.7178,6.7894,6.7155,6.7927,6.7775,6.8744,6.7912,6.8107,6.8782,6.8053,6.9127,6.8551,6.7815,6.7555,6.7099,6.6937,6.6343,6.7291,6.7458,6.7676,6.8069,6.7852,6.8969,6.7671,6.7614,6.7566,6.7743,6.7798,6.8063,6.7528,6.8592,6.8211,6.7174,6.9355,6.7328,6.7632,6.8112,6.7934,6.8222,6.9003,6.7992,6.8305,6.8021&current=european_aqi';
apis[7]='https://air-quality-api.open-meteo.com/v1/air-quality?latitude=51.4131,51.4621,51.4566,51.3874,51.3774,51.4941,51.4467,51.3672,51.4345,51.3351,51.4057,51.3786,51.4529,51.4571,51.4449,51.3922,51.3937,51.4253,51.4276,51.4621&longitude=7.0461,7.0674,7.0185,7.0924,6.9947,7.0344,7.0105,7.0114,7.0497,7.0863,7.0501,7.0401,7.0081,7.0073,7.0254,7.0103,7.0133,7.0259,7.0285,7.0123&current=european_aqi'
apis[8]='https://air-quality-api.open-meteo.com/v1/air-quality?latitude=51.3404,51.3418,51.3252,51.3283,51.3398,51.3546,51.3618,51.3658,51.3745,51.4027,51.4067,51.4151,51.3823,51.3985,51.3265,51.3385,51.3391,51.3583,51.3821,51.3701,51.3504,51.3553,51.3255,51.3213,51.3409,51.3543,51.3689,51.3802,51.3552,51.3332,51.3095,51.3375,51.3268,51.3297,51.3121,51.3378,51.3423,51.3088,51.3079,51.3228,51.3033,51.2791,51.2993,51.3057,51.2834,51.2673,51.3066,51.3198,51.3287,51.3267,51.3187,51.3133,51.2945,51.2773,51.2882,51.3437,51.3397,51.3678,51.3838,51.3519,51.3465,51.3473,51.4086&longitude=12.377,12.4064,12.4134,12.3918,12.3654,12.3456,12.3813,12.4329,12.4606,12.4362,12.4538,12.4553,12.5505,12.4872,12.4007,12.4134,12.4264,12.4523,12.5105,12.4974,12.5047,12.5507,12.5286,12.5326,12.5559,12.4927,12.4922,12.4991,12.4265,12.3722,12.3762,12.3281,12.3373,12.3113,12.3096,12.2681,12.2484,12.2689,12.3023,12.3695,12.3939,12.4013,12.4218,12.4585,12.4718,12.4672,12.5304,12.5313,12.5428,12.5568,12.5705,12.5914,12.5857,12.5767,12.5531,12.3221,12.3432,12.3318,12.3146,12.3336,12.3553,12.3762,12.4668&current=european_aqi';
apis[9]='https://air-quality-api.open-meteo.com/v1/air-quality?latitude=48.6616,48.7771,52.52,51.5607,53.0793,53.5511,50.6521,52.6367,53.6127,51.4332,49.3964,49.3964,51.1045,51.9503,54.3165,51.0109&longitude=9.3501,11.4312,13.405,12.663,8.8017,9.9937,9.1624,9.8451,12.4295,7.6616,7.715,6.845,13.2017,11.6922,10.1355,10.8453&current=european_aqi'



function testing123(){
    const path = d3.geoPath().projection(projection[selectedValue]);
    svg.selectAll('path').remove();
    
    // Load GeoJSON data
    d3.json('../GEO/combined-cities.json').then(combinedGeojson => {
        const geojson = combinedGeojson[selectedValue];
        const apiUrl = apis[selectedValue];
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
            .style('right', '20px')
            .style('width', '200px')
            .style('padding', '10px')
            .style('border', '1px solid #ddd')
            .style('background-color', '#fff');
            
    });}

    function testing456(){
        const path = d3.geoPath().projection(projection[selectedValue]);
        svg.selectAll('path').remove();
        
        // Load GeoJSON data
        d3.json('../static/citydata.json').then(combinedGeojson => {
            const geojson = combinedGeojson;
            const apiUrl = apis[selectedValue];
            fetch(apiUrl)
                .then(response => response.json())
                .then(airQualityData => {
                    renderMap(combinedGeojson, airQualityData);
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
                .style('right', '20px')
                .style('width', '200px')
                .style('padding', '10px')
                .style('border', '1px solid #ddd')
                .style('background-color', '#fff');
                
        });
}
