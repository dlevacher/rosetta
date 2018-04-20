/* eslint no-bitwise: ["error", { "allow": ["&", ">>"] }] */
function objectAssign(obj) {
  const o = obj;
  switch (o.type) {
    case 'number':
      o.toString = function objectToString() { return `${this.val}${this.unit || ''}`; };
      break;
    case 'color':
      o.toString = function objectToString() { return this.toHex(); };
      o.toHex = function objectToString() {
        function hexVal(val, offset) { return ((val >> offset) & 0xFF).toString(16).concat('00').substring(0, 2); }
        return `#${hexVal(this.val, 16)}${hexVal(this.val, 8)}${hexVal(this.val, 0)}`;
      };
      o.toRgb = function objectToString() { return `rgb(${this.r}, ${this.g}, ${this.b}})`; };
      o.toRgba = function objectToString() { return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`; };
      break;
    case 'string':
    case 'url':
    case 'css':
    default:
      o.toString = function objectToString() { return this.val; };
      break;
  }
  return o;
}

function num(val, unit) {
  return objectAssign({ type: 'number', val, unit });
}

function string(val) {
  return objectAssign({ type: 'string', val });
}

function color(val, r, g, b, a) {
  return objectAssign({
    type: 'color',
    val,
    r,
    g,
    b,
    a: a || 1,
  });
}

function url(val) {
  return objectAssign({ type: 'url', val });
}

function css(val) {
  return objectAssign({ type: 'css', val });
}
