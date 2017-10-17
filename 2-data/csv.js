const h = 100, w = 400;
let ds;

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

d3.csv('MonthlySales.csv', (err, data) => {
    if(err) {
        console.log(err);
    } else {
        console.log(data);
        ds = data;
    }

    buildLine();
});