import { RGBAObject } from './colors/hsv_color';

export function loopValueInRange(val: number, min: number, max: number): number {
  var diff = max - min;
  while (val > max) {
    val -= diff;
  }
  while (val < min) {
    val += diff;
  }
  return val;
}

export function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max)
}

export function parseHexString(hexStr: string): RGBAObject {
  var offset = 0
  if (hexStr[0] === "#") {
    offset = 1;
  }
  try {
    const r = clamp(parseInt(hexStr.substring(offset, offset + 2), 16), 0, 255);
    const g = clamp(parseInt(hexStr.substring(offset + 2, offset + 4), 16), 0, 255);
    const b = clamp(parseInt(hexStr.substring(offset + 4, offset + 6), 16), 0, 255);
    if (isNaN(r) || isNaN(g) || isNaN(b)) {
      return {r: 0, g: 0, b: 0, a: 1};
    } else {
      return {r, g, b, a: 1};
    }
  } catch {
    return {r: 0, g: 0, b: 0, a: 1};
  }
}

const rgbStrRegex = /[^\(\)]+(?=\))/
export function parseRGBString(rgbString: string): RGBAObject {
  var parts;
  try {
    if (rgbString[0] === "r" || rgbString[0] === "(") {
      const regexOutput: string[] = rgbString.match(rgbStrRegex) || [""];
      parts = regexOutput[0].split(",");
    } else {
      parts = rgbString.split(",");
    }
    const r = clamp(parseInt(parts[0] || "0"), 0, 255);
    const g = clamp(parseInt(parts[1] || "0"), 0, 255);
    const b = clamp(parseInt(parts[2] || "0"), 0, 255);
    const a = clamp(parseFloat(parts[3] || "1"), 0, 1);
    if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(a)) {
      return {r: 0, g: 0, b: 0, a: 1};
    } else {
      return {r, g, b, a};
    }
  } catch {
    return {r: 0, g: 0, b: 0, a: 1};
  }
}

export function convertValueToHexString(v: number) {
    const str = v.toString(16);
    if (str.length === 1) {
      return "0" + str;
    } else {
      return str;
    }
  }