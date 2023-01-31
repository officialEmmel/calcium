import { create, all } from "mathjs";
//const nerdamer = require("nerdamer");

export class Calculator {
  math: any;
  parser: any;
  constructor() {
    this.math = create(all);
    this.parser = this.createParser();
  }

  private createParser() {
    let p: any = localStorage.getItem("parser");
    if (p == null) {
      p = this.math.parser();
      localStorage.setItem("parser", JSON.stringify(p.getAll()));
    } else {
      const vars: any = JSON.parse(p);
      p = this.math.parser();
      for (const key in vars) {
        p.set(key, vars[key]);
      }
    }
    return p;
  }

  setConfig(cfg: any) {
    this.math.config(cfg);
  }

  calculate(exp: string, prev: boolean) {
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
      const vars: any = this.parser.getAll();
      const prevParser: any = this.math.parser();
      for (const key in vars) {
        prevParser.set(key, vars[key]);
      }
      res = prevParser.evaluate(exp);
    } else {
      res = this.parser.evaluate(exp);
      try {
        this.parser.evaluate("ans = " + res);
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

  async getCurrencies() {
    // currency api: https://github.com/fawazahmed0/currency-api
    const URl =
      "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json";

    const response = await fetch(URl);
    let data = await response.json();
    data = data["eur"];
    let units: any = {};
    units["EUR"] = {
      definition: "",
      aliases: ["euro", "euros", "Euro", "Euros", "eur"],
      baseName: "CURRENCY",
    };
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const element = data[key];
        if (key == "1inch") {
          continue;
        }
        if (key == "eur") {
          continue;
        }
        units[key.toUpperCase()] = {
          definition: (1 / element).toString() + " EUR",
          aliases: [key],
        };
      }
    }
    this.math.createUnit(units, { override: true });
  }
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
