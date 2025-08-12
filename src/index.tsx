import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { Color, RED, GREEN, Quilt } from './quilt';
import { PatternA, PatternB, PatternC, PatternD, PatternE } from './patterns';
import { QuiltElem } from './quilt_draw';
import { symmetrize } from './quilt_ops';

const getSymmetrize = (params: URLSearchParams, result: Quilt): Quilt => {
  if (!params.has("symmetrize")) {
    return result;
  } else {
    return symmetrize(result);
  }
};

// Returns the pattern number, which must be A-E, or undefined if it was not
// provided or is not in the valid range.
const getPattern = (params: URLSearchParams): string|undefined => {
  if (!params.has("pattern"))
    return undefined;

  switch (params.get("pattern")) {
    case "A": return "A";
    case "B": return "B";
    case "C": return "C";
    case "D": return "D";
    case "E": return "E";
    default:  return undefined;
  }
}

// Returns the color requested or undefined if none was specified.
const getColor = (params: URLSearchParams): Color | undefined => {
  if (!params.has("color")) {
    return undefined;
  } else {
    const color = params.get("color");
    if (color === null) {
      return undefined;
    }
    const lowercaseColor = color.toLowerCase();
    if (lowercaseColor === "red") {
      return RED; 
    } else if (lowercaseColor === "green") {
      return GREEN;
    } else {
      return undefined;
    }
  }
};

// Returns the number of rows, which must be a natural number. Defaults to 4.
const getRows = (params: URLSearchParams): bigint => {
  if (!params.has("rows")) {
    return BigInt(4);
  } else {
    const rowsStr = params.get("rows");
    if (rowsStr === null) {
      return BigInt(4);
    }
    const rows = parseInt(rowsStr);
    return !isNaN(rows) ? BigInt(rows) : BigInt(4);
  }
};

const getQuilt = (pattern: string, params: URLSearchParams): Quilt | Error => {
  const rows: number = Number(getRows(params));
  const color: Color = getColor(params) || GREEN;
  const result: Quilt | Error =
    pattern === "A" ? PatternA(rows, color) :
    pattern === "B" ? PatternB(rows, color) :
    pattern === "C" ? PatternC(rows, color) :
    pattern === "D" ? PatternD(rows, color) :
    pattern === "E" ? PatternE(rows, color) :
    new Error('impossible');
  
  if (result instanceof Error) {
    throw result;
  }
  
  return result;
};

// Parse the arguments to the page, which can indicate the color and number of
// rows in the quilt.
const params: URLSearchParams = new URLSearchParams(window.location.search);
getColor(params);
getRows(params); 

// Create a root in which to show the quilt.
const main: HTMLElement|null = document.getElementById('main');
if (main === null)
  throw new Error('missing main element');
const root: Root = createRoot(main);

// Invoke the function for the pattern given in the query params.
const pattern: string|undefined = getPattern(params);
if (pattern === undefined) {
  window.location.replace("/?pattern=A");
} else {
  try {
    const quiltResult = getQuilt(pattern, params);
  
    if (quiltResult instanceof Error) {
      root.render(<p><b>Error</b>: {quiltResult.message}</p>);
    } else {
      const result = getSymmetrize(params, quiltResult);
        
      root.render(<React.StrictMode><QuiltElem quilt={result}/></React.StrictMode>);
    }
  } catch (e: unknown) {
    throw Error;
  }
}