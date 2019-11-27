import HSVColor from '../src/colors/hsv_color';

describe("HSVColor", () => {
  describe("mixWithColor", () => {
    it("should mix colors correctly", () => {
      const red = HSVColor.
    })
  }

  describe("fromColorString", () => {
    it("should build from a hex string", () => {
      const colorObj = HSVColor.fromColorString("#FF3300").toRGBObject();
      expect(colorObj.r).toEqual(255);
      expect(colorObj.g).toEqual(51);
      expect(colorObj.b).toEqual(0);
      expect(colorObj.a).toEqual(1);
    });

    // it("should build from a partial hex string", () => {
    //   const colorObj = HSVColor.fromColorString("FF3300").toRGBObject();
    //   expect(colorObj.r).toEqual(255);
    //   expect(colorObj.g).toEqual(51);
    //   expect(colorObj.b).toEqual(0);
    //   expect(colorObj.a).toEqual(1);
    // });

    it("should build from an rgb string", () => {
      const colorObj = HSVColor.fromColorString("rgb(123, 34, 110)").toRGBObject();
      expect(colorObj.r).toEqual(123);
      expect(colorObj.g).toEqual(34);
      expect(colorObj.b).toEqual(110);
      expect(colorObj.a).toEqual(1);
    });

    it("should build from a partial rgb string", () => {
      const colorObj = HSVColor.fromColorString("(123, 34, 110)").toRGBObject();
      expect(colorObj.r).toEqual(123);
      expect(colorObj.g).toEqual(34);
      expect(colorObj.b).toEqual(110);
      expect(colorObj.a).toEqual(1);
    });

    it("should build from a csv rgb string", () => {
      const colorObj = HSVColor.fromColorString("123, 34, 110").toRGBObject();
      expect(colorObj.r).toEqual(123);
      expect(colorObj.g).toEqual(34);
      expect(colorObj.b).toEqual(110);
      expect(colorObj.a).toEqual(1);
    });

    it("should build from an rgba string", () => {
      const colorObj = HSVColor.fromColorString("rgb(123, 34, 110, 0.54)").toRGBObject();
      expect(colorObj.r).toEqual(123);
      expect(colorObj.g).toEqual(34);
      expect(colorObj.b).toEqual(110);
      expect(colorObj.a).toEqual(0.54);
    });

    it("should return the color black for invalid strings", () => {
      const invalidObj = HSVColor.fromColorString("definitely not colors").toRGBObject();
      expect(invalidObj.r).toEqual(0);
      expect(invalidObj.g).toEqual(0);
      expect(invalidObj.b).toEqual(0);
      expect(invalidObj.a).toEqual(1);
    });
  });
});