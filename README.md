Library to create SVG visualisations for nano materials.

[![NPM version](https://img.shields.io/npm/v/nanoviz-svg.svg)](https://npmjs.org/package/nanoviz-svg)
![License](https://img.shields.io/npm/l/nanoviz-svg.svg)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

    npm install nanoviz-svg

## Use

```js
const nanoviz = require('nanoviz-svg')

const svg = nanoviz.nanoMaterial([
  {label: 'CORE'},
  {label: 'SHELL'},
  {label: 'COATING'}
], 'enanomapper')
```

### `nanoviz.nanoMaterial`

![Example for the 'enanomapper' style](./example.svg)

Create an SVG with three parts, a core, a shell and a coating.

```ts
nanoviz.nanoMaterial(Array<Object> parts, (Array<Object>|Object|String|null) style)
```

  * `parts`: an array of objects
    * `part`: object with mandatory property label
  * `style`: a string denoting one of the built-in styles, an object extending an existing style, or a list of parts
    * `partStyle`: object with the following properties:
      * `color`: fill color
      * `textColor`
      * `striped`: whether the circle is striped (**DEPRECATED: use `pattern`**)
      * `pattern`: fill pattern (`'striped'`, `'dotted'`)
      * `radius`: radius of the circle (0 - 100)
      * `text`: pair of coordinates where the label should be (x: -100 - 200; y: -100 - 100); note that there is not much space

## Browser

```html
<div id="svg-container"></div>

<script src="https://bundle.run/nanoviz-svg"></script>
<script>
  window.onload = function () {
    const element = document.getElementById('svg-container')
    element.innerHTML = nanovizSvg.nanoMaterial(/* see above */)
  }
</script>
```
