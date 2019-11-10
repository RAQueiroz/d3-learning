import * as d3 from 'd3'
import data from './data.json'
// d3-shape => line charts, pie charts

let city = 'San Francisco'
let width = 800
let height = 300
let margin = { 
  top: 20,
  bottom: 20,
  left: 50,
  right: 20
}

let selectedCity = data.map(
  date => ({
    date: d3.timeParse('%Y%m%d')(date.date), 
    temperature: date[city]
  })
)

let xExtent = d3.extent(selectedCity, d => d.date)
let xScale = d3.scaleTime()
  .domain(xExtent)
  .range([
    margin.left, 
    width - margin.right
  ])

let yExtent = d3.extent(selectedCity, d => d.temperature)
let yScale = d3.scaleLinear()
  .domain(yExtent)
  .range([
    height - margin.bottom,
    margin.top
  ])
let heightScale = d3.scaleLinear()
  .domain([0, d3.max(selectedCity, d => d.temperature)])
  .range([
    0, 
    height - margin.top - margin.bottom]
  )

let line = d3.line()
  .x(d => xScale(d.date))
  .y(d => yScale(d.temperature))

/* 
  Line Chart
  
*/
d3.select('svg')
  .append('path')
  .attr('d', line(selectedCity))
  .attr('fill', '#fff')
  .attr('stroke', '#333')

  
/* 
  PIE CHART 
  let colors = d3.scaleOrdinal(d3.schemeCategory10)
  let selectedData = data.filter(d => d.date > 20120920).map(d => d['Austin'])
  let pieData = d3.pie()(selectedData)
  let arc = d3.arc()
  .innerRadius(85)
  .outerRadius(100)
  .startAngle(d => d.startAngle)
  .endAngle(d => d.endAngle)
  
  let svg = d3.select('svg')
  .append('g')
  .attr('transform', 'translate(200, 200)')
  
  svg.selectAll('path')
  .data(pieData)
  .enter()
  .append('path')
  .attr('d', arc)
  .attr('fill', d => colors(d.value))
  .attr('stroke', '#fff')
 */