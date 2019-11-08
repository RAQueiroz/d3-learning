import * as d3 from 'd3'

let rectWidth = 100
let height = 300
let data = [100, 250, 175, 200, 120]

d3.select('svg')
  .selectAll('rect')
  .data(data) // says it needs 5 rectangles
  .enter() // puts 5 placeholders where the rectangles should go
  .append('rect') // put rects where the placeholders were
  .attr('x', (d, i) => i * rectWidth)
  .attr('y', d => height - d)
  .attr('width', rectWidth)
  .attr('height', d => d)
  .attr('fill', d => d > 175 ? 'blue' : 'red')
  .attr('stroke', '#fff')

