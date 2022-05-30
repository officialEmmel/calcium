import {parse, parser, type Parser, config} from "mathjs";
//const nerdamer = require("nerdamer");

export function calculate(par: Parser, exp: string, prev: boolean) {
  // Replace stuff
  exp = exp.replaceAll("π", "pi");
  exp = exp.replaceAll("„", '"').replaceAll("“", '"').replaceAll("”", '"');
  exp = exp.replaceAll("√(", "sqrt(");
  exp = exp.replaceAll("°", "deg");
  exp = exp
    .replaceAll("€", "eur")
    .replaceAll("$", "usd")
    .replaceAll("£", "gbp");
  exp = exp.replaceAll("=>", " to ").replaceAll("->", " to ");
  let res = "";
  if (prev) {
    const vars: any = par.getAll();
    const prevParser: any = parser();
    for (const key in vars) {
      prevParser.set(key, vars[key]);
    }
    res = prevParser.evaluate(exp);
  } else {
    res = par.evaluate(exp);
    try {
      par.evaluate("ans = " + res);
    } catch (e) {
      console.log("cant set answer");
    }
    try {
      //nerdamer.evaluate(exp);
    } catch (e) {}
  }

  if (res == "69") {
    return "nice";
  }
  return res;
}

export function importFunctions() {
//   math.import({
//     solve: function (eq:any, t:any) {
//       const event = new Event("solve");
//       document.dispatchEvent(event);
//       return nerdamer.solve(eq, t);
//     },
//   });
}

export function createParser() {
  let p: any = localStorage.getItem("parser");
  if (p == null) {
    p = parser();
    localStorage.setItem("parser", JSON.stringify(p.getAll()));
  } else {
    const vars: any = JSON.parse(p);
    p = parser();
    for (const key in vars) {
      p.set(key, vars[key]);
    }
  }
  return p;
}

export function setConfig(config: any) {
  config({
    epsilon: config.math.epsilon,
    matrix: config.math.matrix,
    number: config.math.number,
    precision: config.math.precision,
    predictable: config.math.predictable,
    randomSeed: config.math.randomSeed
  })
}
