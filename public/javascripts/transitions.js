import * as d3 from 'd3'

let rectWidth = 100
let height = 300
let data = [
  [
    { id: 1, value: 100 },
    { id: 2, value: 250 },
    { id: 3, value: 175 },
    { id: 4, value: 200 },
    { id: 5, value: 120 }
  ],
  [
    { id: 4, value: 230 },
    { id: 5, value: 120 },
    { id: 6, value: 300 },
    { id: 7, value: 145 },
    { id: 8, value: 240 },
    { id: 9, value: 250 }
  ],
  [
    { id: 8, value: 240 },
    { id: 9, value: 250 },
    { id: 1, value: 100 },
    { id: 2, value: 250 }
  ]
]
let colors = d3.scaleOrdinal(d3.schemeCategory10)
let svg = d3.select('svg')

function updateBars(data) {
  let t = d3.transition().duration(3000)
  let bars = svg.selectAll('rect').data(data, d => d.id)

  // exit
  bars
    .exit()
    .transition(t)
    .attr('y', height)
    .attr('height', 0)
    .remove()

  // enter
  let enter = bars
    .enter()
    .append('rect')
    .attr('stroke', '#fff')
    .attr('width', rectWidth)
    .attr('y', height)

  // enter + update
  bars = enter
    .merge(bars)
    .attr('x', (d, i) => i * rectWidth)
    .attr('fill', d => colors(d.value))
    .transition(t)
    .attr('y', d => height - d.value)
    .attr('height', d => d.value)
}

let index = 0

setInterval(() => {
  updateBars(data[index % 3])
  index++
}, 5000)