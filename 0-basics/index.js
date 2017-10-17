const w = 200;
const h = 100;
const padding = 2;
const data = [5,10,15,20,25];

var svg = d3.select('body')
            .append('svg')
            .attr('width', w)
            .attr('height', h);

svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', (d, i) => i * (w / data.length))
    .attr('y', (d) => h - d )
    .attr('width', w / data.length - padding)
    .attr('height', (d) => d );
