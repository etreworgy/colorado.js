import { loopValueInRange, clamp, parseHexString, parseRGBString, convertValueToHexString } from '../util';

export interface RGBAObject {
  r: number,
  g: number,
  b: number,
  a: number
}

class HSVColor {
  readonly hue: number;
  readonly saturation: number;
  readonly value: number;
  readonly alpha: number;

  constructor(h: number, s: number, v: number, a: number = 1) {
    this.hue = loopValueInRange(h, 0, 360);
    this.saturation = clamp(s, 0, 100);
    this.value = clamp(v, 0, 100);
    this.alpha = clamp(a, 0, 1);
  }

  static fromRGB(r: number, g: number, b: number, a: number = 1): HSVColor {
    var h, s, v;
    const max = Math.max(r, g, b);
    const diff = max - Math.min(r, g, b);
    s = (max === 0) ? 0 : (100 * diff) / max;
    if (s === 0) {
      h = 0;
    } else if (r === max) {
      h = ( g - b) / diff
    } else if (g === max) {
      h = 2 + (b - r) / diff;
    } else {
      h = 4 + (r - g) / diff;
    }
    h = (h * 60);
    s = (s);
    v = (max * 100 / 255);
    return new HSVColor(h, s, v, a);
  }

  static fromColorString(str: string): HSVColor {
    if (str[0] === "#") {
      var {r, g, b, a} = parseHexString(str);
    } else {
      var {r, g, b, a} = parseRGBString(str);
    }
    return HSVColor.fromRGB(r, g, b, a);
  }



  toHexString() {
    // TODO - do we want to pre-calc these values?  Since we're immutable and data is small this might just result in extra calculations
    const {r, g, b} = this.toRGBObject();
    return `#${convertValueToHexString(r)}${convertValueToHexString(g)}${convertValueToHexString(b)}`;
  }

  toRBGString() {
    const {r, g, b} = this.toRGBObject();
    return `rgb($r, $g, $b)`
  }

  toRBGAString() {
    const {r, g, b, a} = this.toRGBObject();
    return `rgb($r, $g, $b, $a)`
  }

  toRGBObject(): RGBAObject {
    var r, g, b;
    if (this.saturation === 0) {
      r = g = b = this.value * 2.55;
    } else {
      var normalizedHue = this.hue / 60;
      var normalizedSaturation = this.saturation / 100;
      var normalizedValue = this.value / 100;
      var i = Math.floor(normalizedHue);
      var f = normalizedHue - i;
      var p = normalizedValue * (1 - normalizedSaturation);
      var q = normalizedValue * (1 - normalizedSaturation * f);
      var t = normalizedValue * (1 - normalizedSaturation * (1 - f));
      switch(i) {
        case 0:
          [r, g, b] = [normalizedValue, t, p]
          break;
        case 1:
          [r, g, b] = [q, normalizedValue, p]
          break;
        case 2:
          [r, g, b] = [p, normalizedValue, t]
          break;
        case 3:
          [r, g, b] = [p, q, normalizedValue]
          break;
        case 4:
          [r, g, b] = [t, p, normalizedValue]
          break;
        default:
          [r, g, b] = [normalizedValue, p, q]
      }
    }
    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
      a: this.alpha
    };
  }
}

export default HSVColor;