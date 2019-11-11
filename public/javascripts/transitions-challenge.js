import * as d3 from 'd3'
import barleyfull from './barleyfull.json'

let radius = 10
let duration = 1500
let width = 800
let height = 600
let years = barleyfull.reduce((prev, curr) => {
  if (prev.some(d => d === curr.year)) {
    return prev
  }
  prev.push(curr.year)
  return prev
}, []).sort()
let index = 0

let svg = d3.select('body').append('svg')

//scales
let xScale = d3.scaleBand().rangeRound([0, width])
let yScale = d3.scaleLinear().range([height, 0])
let colorScale = d3.scaleOrdinal(d3.schemeCategory10)

xScale.domain(barleyfull.map(d => d.site))
yScale.domain([0, d3.max(barleyfull, d => d.yield)])

function update(data, year) {
  data = data.filter(d => d.year === year)
  let t = d3.transition().duration(1000)
  let circles = svg
    .selectAll('circle')
    .data(data, d => d.id)

  // enter
  circles
    .enter()
    .append('circle')
    .attr('r', radius)
    .attr('cy', d => yScale(d.yield))
    .merge(circles)
    .attr('cx', d => xScale(d.site))
    .attr('fill', d => colorScale(d.gen))
    .transition(t)
    .attr('cy', d => yScale(d.yield))

  // exit
  circles
    .exit()
    .transition()
    .attr('r', 0)
    .attr('fill', '#fff')
    .remove()
}

// update(barleyfull, 1927)

setInterval(() => {
  update(barleyfull, years[index % years.length])
  index++
}, 1500)
