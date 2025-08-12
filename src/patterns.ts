import { Quilt, qnil, rnil, Square, Row, Color, rcons, qcons } from './quilt';


/** Returns a quilt in pattern "A". */
export const PatternA = (rows: number, color: Color): Quilt => {
  if (rows < 0) {
    throw new Error("Invalid negative row parameter.");
  } else if (rows === 0) {
    return qnil;
  }
  const a: Square = { shape: "ROUND", color, corner: "NE" };
  const b: Square = { shape: "ROUND", color, corner: "NE" };
  return qcons(rcons(a, rcons(b, rnil)), PatternA(rows - 1, color));
}

/** Returns a quilt in pattern "B". */
export const PatternB = (rows: number, color: Color): Quilt => {
  if (rows < 0) {
    throw new Error("Invalid negative row parameter.");
  }
  if (rows === 0) {
    return qnil;
  }
  const a: Square = { shape: "STRAIGHT", color, corner: "NE" };
  const b: Square = { shape: "STRAIGHT", color, corner: "SW" };
  return qcons(rcons(a, rcons(b, rnil)), PatternB(rows - 1, color));
}

/** Returns a quilt in pattern "C". */
export const PatternC = (rows: number, color: Color): Quilt => {
  if (rows < 0) {
    throw new Error("Invalid negative row parameter.");
  }
  if (rows % 2 === 1) {
    throw new Error("Invalid odd row parameter.");
  }
  if (rows === 0) {
    return qnil;
  }
  const a: Square = { shape: "ROUND", color, corner: "SE" };
  const b: Square = { shape: "ROUND", color, corner: "SW" };
  const c: Square = { shape: "ROUND", color, corner: "NE" };
  const d: Square = { shape: "ROUND", color, corner: "NW" };
  const u: Row = rcons(a, rcons(b, rnil));
  const v: Row = rcons(c, rcons(d, rnil));
  return qcons(u, qcons(v, PatternC(rows - 2, color)));
}

/** Returns a quilt in pattern "D". */
export const PatternD = (rows: number, color: Color): Quilt => {
  if (rows < 0) {
    throw new Error("Invalid negative row parameter.");
  }
  if (rows % 2 === 1) {
    throw new Error("Invalid odd row parameter.");
  }
  if (rows === 0) {
    return qnil;
  }
  const a: Square = { shape: "ROUND", color, corner: "NW" };
  const b: Square = { shape: "ROUND", color, corner: "NE" };
  const c: Square = { shape: "ROUND", color, corner: "SW" };
  const d: Square = { shape: "ROUND", color, corner: "SE" };
  const u: Row = rcons(a, rcons(b, rnil));
  const v: Row = rcons(c, rcons(d, rnil));
  return qcons(u, qcons(v, PatternD(rows - 2, color)));
}

/** Returns a quilt in pattern "E". */
export const PatternE = (rows: number, color: Color): Quilt => {
  if (rows < 0) {
    throw new Error("Invalid negative row parameter.");
  }
  if (rows === 0) {
    return qnil;
  }
  const a: Square = { shape: "STRAIGHT", color, corner: "NE" };
  const b: Square = { shape: "STRAIGHT", color, corner: "SW" };
  const c: Square = { shape: "STRAIGHT", color, corner: "SE" };
  const d: Square = { shape: "STRAIGHT", color, corner: "NW" };
  const u: Row = rcons(a, rcons(b, rnil));
  const v: Row = rcons(c, rcons(d, rnil));
  if (rows === 1) {
    return qcons(u, qnil);
  } else {
    return qcons(u, qcons(v, PatternE(rows - 2, color)));
  }
};
