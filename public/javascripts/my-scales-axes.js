import * as d3 from 'd3'
import data from './data.json'
let city = 'Austin'
let width = 800
let height = 300
let margin = { 
  top: 20,
  bottom: 20,
  left: 20,
  right: 20
}

let selectedCity = data.map(
  date => ({
    date: d3.timeParse('%Y%m%d')(date.date), 
    temperature: date[city]
  })
)

console.log(selectedCity)

let xScale = d3
  .scaleTime()
  .domain(d3.extent(selectedCity, d => d.date))
  .range([0, width])

console.log(xScale(d3.max(selectedCity, d => d.date)))

let yScale = d3
  .scaleLinear()
  .domain(d3.extent(selectedCity, d => d.temperature))
  .range([height, 0])

let yHeight = d3
.scaleLinear()
.domain(d3.extent(selectedCity, d => d.temperature))
.range([0, height])

d3
  .select('svg')
  .selectAll('rect')
  .data(selectedCity)
  .enter().append('rect')
  .attr('x', d => xScale(d.date))
  .attr('y', d => yScale(d.temperature))
  .attr('height', d => yHeight(d.temperature))
  .attr('width', d => 2)
  .attr('fill', 'tomato')
  .attr('stroke', '#333')
  .append('g')
  .attr('transform', 'translate(40,20)')
  .call(yScale)


// let data2 = [0.1, 0.17, 0.21, 0.2, 0.18]

// map data to display
// domain => input
// range => output

/*
console.log('min: ', d3.min(data2, d => d))
console.log('max: ', d3.max(data2, d => d))
console.log('extent: ', d3.extent(data2))
console.log(
  'yScale: ', 
  d3.scaleLinear().domain(d3.extent(data2)).range([200,0])(0.21)
)

let heightScale = d3.scaleLinear().domain(d3.extent(data2)).range([200,100])
let chartHeight = d3.scaleLinear().domain(d3.extent(data2)).range([100, 200])
let yAxis = d3.axisLeft().scale(chartHeight)
*/