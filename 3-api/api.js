const h = 100, w = 400;

function buildLine(ds){
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
            d: line(ds.monthlySales),
            stroke: 'purple',
            'stroke-width': 2,
            'fill': 'none'
        });
}

function showHeader(ds){
    d3.select('body').append('h1')
        .text(`${ds.category} Sales (2013)`);
}

function showTotals(ds){
    let metrics = [];
    let salesTotal = 0;
    let t = d3.select('body').append('table');

    for (var i = 0; i < ds['monthlySales'].length; i++){
        salesTotal += ds['monthlySales'][i]['sales'] * 1
    }

    metrics.push(`Sales Total: ${salesTotal}`);
    metrics.push(`Sales Avg: ${(salesTotal / ds['monthlySales'].length).toFixed(2)}`);

    let tr = t.selectAll('tr')
        .data(metrics)
        .enter()
        .append('tr')
        .append('td')
        .text( (d) => d );
}

d3.json('https://api.github.com/repos/bsullins/d3js-resources/contents/monthlySalesbyCategoryMultiple.json', (err, data) => {
    if(err) {
        console.log(err);
        return;
    }
    let decodedData = JSON.parse(window.atob(data.content));

    decodedData.contents.forEach((ds) => {
        showHeader(ds);
        buildLine(ds);
        showTotals(ds);
    })


});