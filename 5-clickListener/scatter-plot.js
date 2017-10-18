const wid = 300, hei = 100;     // width & height
const dataSet = [
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

// KPI
function salesKPI(d) {
    if( d >= 20) return '#33CC66';
    return '#666666';
}

function showMinMax(ds,col,val,type){
    let max = d3.max(ds, (d) => d[col] );
    let min = d3.min(ds, (d) => d[col] );

    if(type == 'minmax' && (val == max || val == min)) {
        return val;
    } else {
        if (type == 'all') {
            return val;
        }
    }
}

let svgPlot = d3.select('body')
            .append('svg')
            .attr('width', wid)
            .attr('height', hei);

// add dots
let dots = svgPlot.selectAll('circle')
    .data(dataSet)
    .enter()
    .append('circle')
    .attrs({
        cx: (d) => d.month * 2,
        cy: (d) => hei - d.sales,
        r: 5,
        fill: (d) => salesKPI(d.sales)
    });

let labels = svgPlot.selectAll('text')
.data(dataSet)
.enter()
.append('text')
.text( (d) => showMinMax(dataSet, 'sales', d.sales, 'all'))
.attrs({
    x: (d) => d.month * 2,
    y: (d) => hei - d.sales,
    'font-family': 'sans-serif',
    'fill': '#666666',
    'text-anchor': 'start'
});

d3.select('select')
    .on('change', (d) => {
        let sel = d3.select('#label-option').node().value;
        svgPlot.selectAll('text')
            .data(dataSet)
            .text((d) => showMinMax(dataSet, 'sales', d.sales, sel))
    });