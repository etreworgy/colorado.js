import HSVColor from './colors/hsv_color';

type OverflowOption = "reverse" | "clamp" | "loop"

abstract class RandomGenerator {
  abstract next(options?: object): number;
}

interface PaletteOptions {
  monochrome: boolean | null,
  overflow: OverflowOption | null,
  randomGenerator: RandomGenerator | null
}

class GoldenDistribution extends RandomGenerator {
  private distibutions = {}

  next(options?: object) {
    var identifier = (options || {}).name || "default";
    if (!this.distributions[identifier]) {
      this.distibutions[identifier] = Math.random(Date.now());
    }
    this.distibutions[identifier] = (0.6180339887498547 + this.distibutions[identifier]) % 1;
    return this.distibutions[identifier];
  }
}

class BasicRandomGenerator extends RandomGenerator {
  next(options?: object) {
    return Math.random(Date.now());
  }
}

class ColorPalette {
  readonly colors: HSVColor[]
  readonly options: PaletteOptions

  constructor(colors: HSVColor[], options: PaletteOptions) {
    var monochromeDefault = false;
    if (colors.length === 0) {
      // If no colors are given, default to monochromatic palette.
      monochromeDefault = true;
      this.colors = [HSVColor.fromRGB(0, 0, 0), HSVColor.fromRGB(255, 255, 255)]
    } else {
      this.colors = colors;
    }
    this.options = Object.assign({
      monochrome: monochromeDefault,
      overflow: "clamp",
      randomGenerator: new GoldenDistribution()
    }, options);
  }

  generateRandomColor(option: PaletteOptions): HSVColor {
    if (this.colors.length === 1) {
      // Single color mode
    } else {
      // Multi color mode
      var startIndex = options.start || 0;
      var endIndex = option.end || (this.colors.length - 1);

    }
  }

}