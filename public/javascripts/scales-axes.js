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
let heightScale = d3.scaleLinear()
  .domain([0, d3.max(selectedCity, d => d.temperature)])
  .range([
    0, 
    height - margin.top - margin.bottom]
  )

let svg = d3.select('svg')
let rect = svg.selectAll('rect')
  .data(selectedCity)
  .enter()
  .append('rect')
  .attr('width', 2)
  .attr('height', d => heightScale(d.temperature))
  .attr('x', d => xScale(d.date))
  .attr('y', d => yScale(d.temperature))
  .attr('fill', 'tomato')
  
let xAxis = d3.axisBottom().scale(xScale)
let yAxis = d3.axisLeft().scale(yScale)

svg.append('g')
  .attr('transform', 'translate('+[0, height - margin.bottom]+')')
  .call(xAxis)

svg.append('g')
  .attr('transform', 'translate('+[margin.left, 0]+')')
  .call(yAxis)