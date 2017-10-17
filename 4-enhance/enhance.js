const h = 300, w = 400, padding = 20;

function getDate(d){
    let strDate = new String(d);
    let year = strDate.substr(0,4);
    let month = strDate.substr(4,2) - 1;
    let day = strDate.substr(6,2);

    return new Date(year, month, day);
}

function buildLine(ds){
    let minDate = getDate(ds.monthlySales[0]['month']);
    let maxDate = getDate(ds.monthlySales[ds.monthlySales.length - 1]['month']);
    
    let xScale = d3.scaleTime()
        .domain([minDate, maxDate])
        .range([padding * 1.1, w - padding]);

    let yScale = d3.scaleLinear()
        .domain([0, d3.max(ds.monthlySales, (d) => d.sales)])
        .range([h - padding, padding]);

    let xAxisGen = d3.axisBottom(xScale).tickFormat(d3.timeFormat('%b'));
    let yAxisGen = d3.axisLeft(yScale).ticks(4);

    let line = d3.line()
    .x( (d) => xScale(getDate(d.month)) )
    .y( (d) => yScale(d.sales) )
    .curve(d3.curveLinear);

    let svg = d3.select('body')
        .append('svg')
        .attrs({
            width: w,
            height: h
        });
    
    let yAxis = svg.append('g').call(yAxisGen)
        .attrs({
            class: 'axis',
            transform: `translate(${padding}, 0)`
        });
    
    let xAxis = svg.append('g').call(xAxisGen)
        .attrs({
            class: 'axis',
            transform: `translate(0,${h - padding})`
        })

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