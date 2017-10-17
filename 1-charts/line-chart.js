const wi = 300, hi = 100;     // width & height
const monthlySales = [
    {'month': 10, 'sales': 20},
    {'month': 20, 'sales': 14},
    {'month': 30, 'sales': 20},
    {'month': 40, 'sales': 21},
    {'month': 50, 'sales': 15},
    {'month': 60, 'sales': 22},
    {'month': 70, 'sales': 9},
    {'month': 80, 'sales': 6},
    {'month': 90, 'sales': 23},
    {'month': 100, 'sales': 7}
];

let svgLine = d3.select('body')
            .append('svg')
            .attr('width', wi)
            .attr('height', hi);

let line = d3.line()
    .x( (d) => d.month * 2 )
    .y( (d) => hi - d.sales )
    .curve(d3.curveLinear);

let viz = svgLine.append('path')
    .attrs({
        d: line(monthlySales),
        "stroke": "purple",
        "stroke-width": 2,
        "fill": "none"
    });

// add labels
let lables = svgLine.selectAll('text')
    .data(monthlySales)
    .enter()
    .append('text')
    .text( (d) => d.sales )
    .attrs({
        x: (d) => d.month * 2 - 5,
        y: (d) => hi - d.sales,
        'font-family': 'sans-serif',
        'fill': '#666666',
        'text-anchor': 'start',
        'dy': '-.35em',
        'font-weight': (d,i) => {
            if(i == 0 || i == monthlySales.length - 1 ) {
                return 'bold';
            } else {
                return 'normal';
            }
        }
    })