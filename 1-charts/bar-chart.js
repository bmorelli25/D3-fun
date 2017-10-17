const w = 300, h = 120;     // width & height
const padding = 2;          // space between our bars
const data = [5,10,15,20,25,13,21,3,17];

function colorPicker(v) {
    if(v <= 20) return '#666666';
    return '#FF0033';
}

let svg = d3.select('body')
            .append('svg')
            .attr('width', w)
            .attr('height', h);

svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attrs({
        x: (d, i) => i * (w / data.length),
        y: (d) => h - (d * 4),
        width: w / data.length - padding,
        height: (d) => d * 4,
        fill: (d) => colorPicker(d)
    });

svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text((d) => d)
    .attrs({
        "text-anchor": "middle",
        x: (d,i) => i * (w / data.length) + (w / data.length - padding) / 2,
        y: (d) => h - (d * 4) + 14,
        "font-family": "sans-serif",
        "fill": "#ffffff"
    });