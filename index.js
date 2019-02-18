const styles = {
  enanomapper: [
    { color: '#cf2323', textColor: 'white', radius: 40, text: [0, 0] },
    { color: '#555', textColor: '#555', radius: 70, text: [130, 50] },
    { color: 'grey', textColor: 'grey', radius: 100, text: [130, -80] }
  ],
  nanomaterialRegistry: {
    extends: 'enanomapper',
    parts: [
      { color: 'orange', textColor: 'white' },
      { color: 'lightblue', textColor: 'lightblue' },
      { color: 'lightgrey', textColor: 'lightgrey', striped: true }
    ]
  }
}

function makeStyle (style = 'enanomapper') {
  if (typeof style === 'string') {
    return makeStyle(styles[style])
  } else if (Array.isArray(style)) {
    return style
  } else if (!style.extends) {
    return style.parts
  } else {
    const parent = makeStyle(style.extends)
    return style.parts.map((part, i) => Object.assign({}, parent[i], part))
  }
}

function makeStripePattern (id, color) {
  return `<pattern id="${id}" width="10%" height="10%" viewbox="0,0,4,4" patternTransform="rotate(45)">
  <path stroke="${color}" d="M0,0 V4 M2,0 V4 M4,0 V4"></path>
</pattern>`
}

function makePart (part, style, defs) {
  let fill

  if (style.striped) {
    const id = `stripes-${part.label}`
    defs.push(makeStripePattern(id, style.color))
    fill = `url(#${id})`
  } else {
    fill = style.color
  }

  let textAnchor
  let lineEnd

  if (style.text[0] > 0) {
    textAnchor = 'start'
    lineEnd = Math.max(style.text[0] - 5, 0)
  } else if (style.text[0] < 0) {
    textAnchor = 'end'
    lineEnd = Math.min(style.text[0] + 5, 0)
  } else {
    textAnchor = 'middle'
    lineEnd = 0
  }

  return `<circle fill="${fill}" r="${style.radius}" />
<line stroke="${style.color}" stroke-width="3" x1="0" y1="${style.text[1]}" x2="${lineEnd}" y2="${style.text[1]}" />
<text fill="${style.textColor}" x="${style.text[0]}" y="${style.text[1]}"
      alignment-baseline="middle" text-anchor="${textAnchor}">
  ${part.label}
</text>`
}

module.exports.nanoMaterial = function nanoMaterial (parts, style) {
  style = makeStyle(style)

  const svg = [
    '<svg width="300" height="200" viewBox="-100 -100 300 200" font-weight="bold" xmlns="http://www.w3.org/2000/svg">'
  ]

  const defs = []

  const graphics = parts.map((part, i) => part ? makePart(part, style[i], defs) : '').reverse()

  svg.push(`
  <defs>
    ${defs.join('\n')}
  </defs>
`)

  svg.push(graphics.join('\n'))

  svg.push(`
</svg>`)

  return svg.join('')
}
