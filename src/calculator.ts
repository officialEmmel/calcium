import math from "mathjs";
import {parser} from "./main"
const nerdamer = require('nerdamer/all')

math.import({
    solve: function (eq:any,t:any) {
      const event = new Event('solve');
      document.dispatchEvent(event);
      return nerdamer.solve(eq,t)
    }
})


export function calculate(exp:any , prev:any) {
    // Replace stuff
    exp = exp.replaceAll("π", "pi")
    exp = exp.replaceAll("„", "\"").replaceAll("“", "\"").replaceAll("”","\"")
    exp = exp.replaceAll("√(", "sqrt(")
    exp = exp.replaceAll("°", "deg")
    exp = exp.replaceAll("€","eur").replaceAll("$","usd").replaceAll("£","gbp")
    exp = exp.replaceAll("=>", " to ").replaceAll("->"," to ")
    let res = ""
    if(prev) {
      let vars = parser.getAll()
      let prevParser = math.parser()
      for (let key in vars) {
          prevParser.set(key, vars[key])
      }
      res = prevParser.evaluate(exp)
    } else {
      res = parser.evaluate(exp)
      try{parser.evaluate("ans = "+res)}catch(e){console.log("cant set answer")}
      try{nerdamer.evaluate(exp)}catch(e){}
    }

    if(res == "69") { return "nice"}
    return res
}
