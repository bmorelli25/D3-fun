const h = 100, w = 400;
let ds;
let metrics = [];

function buildLine(){
    let line = d3.line()
    .x( (d) => (d.month - 20130001) / 3.25)
    .y( (d) => h - d.sales )
    .curve(d3.curveLinear);

    let svg = d3.select('body').append('svg')
        .attrs({
            width: w,
            height: h
        });

    let viz = svg.append('path')
        .attrs({
            d: line(ds),
            stroke: 'purple',
            'stroke-width': 2,
            'fill': 'none'
        });
}

function showTotals(){
    let salesTotal = 0;
    let t = d3.select('body').append('table');

    for (var i = 0; i < ds.length; i++){
        salesTotal += ds[i]['sales'] * 1
    }

    metrics.push(`Sales Total: ${salesTotal}`);
    metrics.push(`Sales Avg: ${(salesTotal / ds.length).toFixed(2)}`);

    let tr = t.selectAll('tr')
        .data(metrics)
        .enter()
        .append('tr')
        .append('td')
        .text( (d) => d );
}

d3.csv('MonthlySales.csv', (err, data) => {
    if(err) {
        console.log(err);
    } else {
        console.log(data);
        ds = data;
    }

    buildLine();
    showTotals();
});