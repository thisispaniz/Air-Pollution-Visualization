const width = 800;
const height = 600;

const svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height);

// Load GeoJSON data
d3.json('2_hoch.geo.json').then(function (data) {
    // Create a Mercator projection
    const projection = d3.geoMercator()
        .center([10, 51.5])  // Centered on Germany
        .scale(1000)
        .translate([width / 2, height / 2]);

    // Create a path generator
    const path = d3.geoPath().projection(projection);

    // Draw the map
    svg.selectAll('path')
        .data(data.features)
        .enter().append('path')
        .attr('d', path)
        .attr('fill', 'lightgray')
        .attr('stroke', 'white')
        .on('mouseover', function (event, d) {
            // Handle mouseover event (e.g., show tooltip)
        })
        .on('mouseout', function (event, d) {
            // Handle mouseout event (e.g., hide tooltip)
        });
});
