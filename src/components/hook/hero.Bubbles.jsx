import { useEffect, useState } from 'react'
import { Octokit } from '@octokit/rest'
import {
  forceCollide,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
  select,
  selectAll,
} from 'd3'

// A clip path is used to display the image as a circle
const BubbleClipPath = ({ r, id, ...props }) => (
  <clipPath id={id}>
    <circle r={r} {...props} />
  </clipPath>
)

// Main component
const Bubbles = ({
  members,
  svgWidth = 900,
  svgHeight = 900,
  config = { hoverScale: 1.15, imgSize: 140 },
}) => {
  const nodes = members.map((member, i) => ({
    index: i,
    radius: Math.floor(Math.random() * 30 + 50),
    x: Math.floor(Math.random() * svgWidth),
    y: Math.floor(Math.random() * svgHeight),
    to: member.html_url,
    img: member.avatar_url,
    imgSize: config.imgSize,
    name: member.login,
  }))

  // A useEffect() hook is used to call D3 in the browser.
  // The HTML DOM is used instead of React's VDOM to reduce overhead.
  useEffect(() => {
    const bubbles = selectAll('.bubble') // All bubbles
    bubbles.data(nodes)
    bubbles.select('clipPath > circle').attr('r', (d) => d.radius)
    bubbles
      .select('image')
      .style('width', (d) => `${2 * d.radius}px`)
      .style('height', (d) => `${2 * d.radius}px`)
      .attr('x', (d) => -d.radius)
      .attr('y', (d) => -d.radius)

    const tooltip = select('#bubble-tooltip') // Tooltip that appears on hover
    tooltip.data(nodes).style('position', 'fixed')

    // Increase bubble size and display tooltip on mouseover
    bubbles.on('mouseover', function (_d, t) {
      t.radius *= config.hoverScale
      select(this)
        .select('clipPath > circle')
        .attr('r', (d) => d.radius)
      select(this)
        .select('image')
        .style('width', (d) => `${2 * d.radius}px`)
        .style('height', (d) => `${2 * d.radius}px`)
        .attr('x', (d) => -d.radius)
        .attr('y', (d) => -d.radius)
      tooltip.html(t.name).style('display', 'block')
      simulation.nodes(nodes)
    })

    // Decrease bubble size and hide tooltip on mouseout
    bubbles.on('mouseout', function (_d, t) {
      t.radius /= config.hoverScale
      select(this)
        .select('clipPath > circle')
        .attr('r', (d) => d.radius)
      select(this)
        .select('image')
        .style('width', (d) => `${2 * d.radius}px`)
        .style('height', (d) => `${2 * d.radius}px`)
        .attr('x', (d) => -d.radius)
        .attr('y', (d) => -d.radius)
      tooltip.style('display', 'none')
      simulation.nodes(nodes)
    })

    // Move tooltip to mouse position. CSS transform is used for performance.
    bubbles.on('mousemove', function (d, _t) {
      tooltip.style(
        'transform',
        `translate(${d.clientX + 10}px, ${d.clientY + 10}px)`
      )
    })

    // Physics simulation
    const simulation = forceSimulation()
      .force(
        'charge',
        forceManyBody().strength((d) => d ** 2 * 0.1)
      )
      .force(
        'x',
        forceX()
          .strength(0.05)
          .x(svgWidth / 2)
      )
      .force(
        'y',
        forceY()
          .strength(0.05)
          .y(svgHeight / 2)
      )
      .force(
        'collision',
        forceCollide().radius((d) => d.radius + 3) // Radius is set to be larger for aestheics
      )
      .nodes(nodes)
      .on('tick', () => {
        bubbles.attr('transform', (d) => `translate(${d.x}, ${d.y})`)
      })
      .alphaTarget(0.1) // Do not stop the simulation
  }, [nodes])

  return (
    <>
      <svg
        className="w-full h-full"
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {nodes.map((node) => (
          <a
            key={node.index}
            href={node.to}
            target="_blank"
            className="bubble"
            rel="noreferrer"
          >
            <BubbleClipPath
              r={node.radius}
              id={`bubble-clip-path-${node.index}`}
            />
            <image
              x={-node.radius}
              y={-node.radius}
              width={node.imgSize}
              height={node.imgSize}
              xlinkHref={node.img}
              clipPath={`url(#bubble-clip-path-${node.index})`}
              className="bubble-image"
              style={{ width: node.radius * 2, height: node.radius * 2 }}
            />
          </a>
        ))}
      </svg>
    </>
  )
}

const BubbleWrapper = () => {
  const [members, setMembers] = useState([])
  const token = import.meta.env.PUBLIC_GITTOKEN
  const octokit = new Octokit({ auth: token })
  useEffect(() => {
    octokit
      .request('GET /orgs/poapper/public_members')
      .then(({ data }) => setMembers(data))
  }, [])

  return <Bubbles members={members} client:load />
}

export default BubbleWrapper
