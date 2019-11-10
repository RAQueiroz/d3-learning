import * as d3 from 'd3'
import data from './data.json'

let city = 'Austin'
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
  .domain([0, d3.max(selectedCity, d => d.temperature)])
  .range([
    height - margin.bottom,
    margin.top
  ])

let line = d3.line()
  .x(d => xScale(d.date))
  .y(d => yScale(d.temperature))

let svg = d3.select('svg')
svg.append('path')
  .attr('d', line(selectedCity))
  .attr('fill', 'none')
  .attr('stroke', '#333')  

let xAxis = d3.axisBottom().scale(xScale)
let yAxis = d3.axisLeft().scale(yScale)

svg.append('g')
  .attr('transform', 'translate('+[0, height - margin.bottom]+')')
  .call(xAxis)

svg.append('g')
  .attr('transform', 'translate('+[margin.left, 0]+')')
  .call(yAxis)