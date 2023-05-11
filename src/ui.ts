import { MANIFEST } from "./manifest";
import { Settings } from "./settings";
import { color_list } from "./colors";
let current = 0;
let showedSolve = false;

let elementPrototype = `
    <button id="more">...</button>
    <input type="text" id="input" class="input" placeholder="Type here...">
    <p id="result" class="result"></p>
`;

export interface ColorScheme {
  bg: string;
  font: string;
  accent: string;
  warn: string;
  error: string;
  info: string;
  success: string;
}

export class UI {
  constructor() {
    document.addEventListener("solve", () => {
      if (!showedSolve) {
        showedSolve = true;
        this.showToast("Solve is not fully supported.", "orange", 3000);
      }
    });

    var modal: any = document.getElementById("modal");
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.classList.remove("show");
        modal.classList.add("hide");
        window.location.href = "#";
        setTimeout(() => {
          modal.style.display = "none";
          modal.classList.remove("hide");
        }, 200);
      }
    };
  }

  setColor(color: ColorScheme) {
    var root = document.documentElement;
    root.style.setProperty("--bg", color.bg);
    root.style.setProperty("--font", color.font);
    root.style.setProperty("--yellow", color.accent);
    root.style.setProperty("--orange", color.warn);
    root.style.setProperty("--blue", color.info);
    root.style.setProperty("--red", color.error);
    root.style.setProperty("--green", color.success);

    var hover = this.hexToRgb(color.bg);
    hover[0] += 20;
    hover[1] += 20;
    hover[2] += 20;
    root.style.setProperty(
      "--hover",
      "rgb(" + hover[0] + "," + hover[1] + "," + hover[2] + ")"
    );

    var texttrans = this.hexToRgb(color.font);
    root.style.setProperty(
      "--text-transparent",
      "rgba(" + texttrans[0] + "," + texttrans[1] + "," + texttrans[2] + ",0.5)"
    );
  }

  hexToRgb(hex: string) {
    if (color_list[hex]) {
      hex = color_list[hex];
    }
    var bigint = parseInt(hex.replace("#", ""), 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return [r, g, b];
  }

  previewOutput(output: any) {
    var preview: any = document.querySelector("#latest > #result");
    preview.style.color = "var(--gray)";
    preview.innerHTML = output;

    if (current < 8) {
      return;
    }
    preview.scrollIntoView();
  }

  previewError(output: any) {
    var preview: any = document.querySelector("#latest > #result");
    preview.style.color = "var(--red)";
    preview.innerHTML = output;
  }

  setOutput(output: any) {
    var input: any = document.querySelector("#latest > #input");
    var out: any = document.querySelector("#latest > #result");
    var listItem: any = document.querySelector("#latest");
    var list: any = document.querySelector("#list");

    var proto: any = document.createElement("li");
    proto.setAttribute("id", "latest");
    proto.setAttribute("class", "listItem");
    proto.innerHTML = elementPrototype;

    input.readOnly = true;

    out.style.color = "var(--font)";
    out.innerHTML = output;

    listItem.setAttribute("id", "id" + current);
    listItem.classList.add("hoverable");
    listItem.querySelector("#more").style.display = "block";

    listItem.querySelector("#more").onclick = (e: any) => {
      let input = e.target.parentElement.children[1].value;
      let output = e.target.parentElement.children[2].innerHTML;
      this.showModal(modals.more(input, output));
      var res = document.getElementById("copy_res");
      var inp = document.getElementById("copy_in");
      var both = document.getElementById("copy_both");

      // @ts-ignore
      res.addEventListener("click", function () {
        try {
          navigator.clipboard.writeText(output);
          // @ts-ignore
          res.innerHTML = "Copied!";
          // @ts-ignore
          res.style.backgroundColor = "var(--green)";
          setTimeout(function () {
            // @ts-ignore
            res.innerHTML = "Copy Result";
            // @ts-ignore
            res.style.backgroundColor = "var(--hover)";
          }, 1000);
        } catch (err) {
          console.error("Failed to copy: ", err);
        }
      });

      // @ts-ignore
      inp.addEventListener("click", function () {
        try {
          navigator.clipboard.writeText(input);
          // @ts-ignore
          inp.innerHTML = "Copied!";
          // @ts-ignore
          inp.style.backgroundColor = "var(--green)";
          setTimeout(function () {
            // @ts-ignore
            inp.innerHTML = "Copy Input";
            // @ts-ignore
            inp.style.backgroundColor = "var(--hover)";
          }, 1000);
        } catch (err) {
          console.error("Failed to copy: ", err);
        }
      });

      // @ts-ignore
      both.addEventListener("click", function () {
        try {
          navigator.clipboard.writeText(input + " = " + output);
          // @ts-ignore
          both.innerHTML = "Copied!";
          // @ts-ignore
          both.style.backgroundColor = "var(--green)";
          setTimeout(function () {
            // @ts-ignore
            both.innerHTML = "Copy full Calculation";
            // @ts-ignore
            both.style.backgroundColor = "var(--hover)";
          }, 1000);
        } catch (err) {
          console.error("Failed to copy: ", err);
        }
      });
    };

    listItem.addEventListener("click", async (e: any) => {
      let l: any = null;
      if (e.target.id == "input") {
        l = e.target.parentNode.querySelector("#result");
      } else if (e.target.id == "more") {
        return;
      } else if (new RegExp("^id[0-9]+$").test(e.target.id)) {
        l = e.target.querySelector("#result");
      } else {
        l = e.target;
      }
      await navigator.clipboard.writeText(l.innerHTML);
      this.showToast("Copied to clipboard", "green");
    });

    list.appendChild(proto);

    // @ts-ignore
    document.querySelector("#latest > #input").focus();

    showedSolve = false;
    current++;
  }

  clearUi() {
    var listItems: any = document.getElementsByClassName("listItem");
    while (listItems.length > 0) {
      listItems[0].remove();
    }

    var list: any = document.getElementById("list");
    var proto: any = document.createElement("li");
    proto.setAttribute("id", "latest");
    proto.setAttribute("class", "listItem");
    proto.innerHTML = elementPrototype;
    list.appendChild(proto);
    // @ts-ignore
    document.querySelector("#latest > #input").focus();
    this.showToast("History cleared", "green");
  }

  showModal(template: any) {
    var modal: any = document.getElementById("modal");
    var inner: any = document.getElementById("modal-inner");

    inner.innerHTML = template.html;

    modal.style.display = "block";

    modal.classList.add("show");

    // @ts-ignore
    var span: HTMLElement = document.getElementsByClassName("close")[0];

    // @ts-ignore
    document.querySelector("#latest > #input").blur();
    span.onclick = function () {
      modal.classList.remove("show");
      modal.classList.add("hide");
      window.location.href = "#";
      setTimeout(() => {
        modal.style.display = "none";
        modal.classList.remove("hide");
      }, 200);
    };
  }

  showToast(text: any, color = "hover", time = 3000, autoClose = true) {
    // @ts-ignore
    var l: any = document.getElementById("snackbars");
    var x: HTMLElement = document.createElement("div");
    x.setAttribute("id", "snackbar");
    x.className = "show";
    x.style.backgroundColor = "var(--" + color + ")";
    x.innerHTML = text;
    l.appendChild(x);
    if (autoClose) {
      setTimeout(function () {
        x.remove();
      }, time);
    }
  }

  closeToast() {
    // @ts-ignore
    var x: HTMLElement = document.getElementById("snackbar");
    x.className = x.className.replace("show", "");
  }
}

export const modals = {
  help: {
    html: `
            <div class="padding: 0; margin: 0; ">
                <h2 class="centered">Help</h2>
                <h4 style="margin-bottom: 10px;">Basic usage</h4>
                <div class="step">
                  <ul>
                      <li><code>2 + 2</code> -> <code>4</code></li>
                      <li><code>2 * sqrt(9)</code> -> <code>6</code></li>
                      <li><code>51 cm to inch</code> -> <code>20.07 inch</code></li>
                      <li><code>1 usd to eur</code> -> <code>0.94 eur</code></li>
                  </ul>
                </div>
                <h4 style="margin-bottom: 10px;">Commands</h4>
                <div class="step">
                  <ul>
                      <li><code>!help</code> Shows help</li>
                      <li><code>!settings</code> Configure Calcium</li>
                      <li><code>!clear</code> Clears history and all variables</li>
                      <li><code>!about</code> Shows about screen</li>
                  </ul>  
                </div>
                <h4 style="margin-bottom: 10px;">Operators (Overview)</h4>
                <div class="step">
                  <ul>
                      <li><code>+</code> Add</li>
                      <li><code>-</code> Substract</li>
                      <li><code>*</code> Multiply</li>
                      <li><code>/</code> Divide</li>
                      <li><code>^</code> Power</li>
                      <li><code>%</code> Modulo</li>
                      <li><code>pi</code> Pi</li>
                      <li><code>e</code> Euler's number</li>
                      <li><code>sqrt()</code> Square root</li>
                      <li><code>sin()</code> Sine</li>
                      <li><code>cos()</code> Cosine</li>
                      <li><code>tan()</code> Tangent</li>
                      <li><code>asin()</code> Arc sine</li>
                      <li><code>acos()</code> Arc cosine</li>
                      <li><code>atan()</code> Arc tangent</li>
                      <li><code>log()</code> Logarithm</li>
                      <li><code>ln()</code> Natural logarithm</li>
                      <li><code>exp()</code> Exponential</li>
                      <li><code>rand</code> Random number</li>
                      <li><code>solve()</code> Solves equation*</li>
                      <li><code>fact()</code> Factorial</li>
                      <li><code>abs()</code> Absolute value</li>
                      <li><code>round()</code> Round</li>
                      <li><code>ceil()</code> Ceil</li>
                      <li><code>floor()</code> Floor</li>
                  </ul> 
                </div> 
                <p style="font-size:12px; color:var(--orange)">*Using solve() you might miss some features as we use another libary for this function</p>
                <p>You can find all operators <a href="https://mathjs.org/docs/expressions/syntax.html">here.</a></p>
            </div>  
        `,
  },
  settings: (settings: Settings) => {
    return {
      html: `
            <div class="padding: 0; margin: 0; ">
                <h2>Settings</h2>
                <button id="settings-gen" class="collapsible"><h3>Genral Options</h3></button>
                <div class="content">
                <ul>
                    <li style="white-space:nowrap; margin-bottom: 5px;">
                        <label for="round">Round result: </label>
                        <p style="font-size:12px; ">"-1" for default mathJS behavior</p>
                        <input class="conf" type="text" id="round" value="">
                    </li>
                    <li style="white-space:nowrap; margin-bottom: 5px;">
                        <label for="brackets">Auto-complete brackets:</label>
                        <input class="conf" type="checkbox" id="brackets" >
                    </li>
                </ul>
                </div>
                &nbsp;
                <button id="settings-styles" class="collapsible"><h3>Style Options</h3></button>
                <div class="content">
                  <ul>
                        <li style="white-space:nowrap; margin-bottom: 5px;">
                            <label for="font_color">Text Color:</label>
                            <input class="conf" type="text" id="font_color" value="">

                        </li>
                        <li style="white-space:nowrap; margin-bottom: 5px;">
                            <label for="accent_color">Accent Color:</label>
                            <input class="conf" type="text" id="accent_color" value="">
                            
                        </li>
                        <li style="white-space:nowrap; margin-bottom: 5px;">
                            <label for="warn_color">Warn Color:</label>
                            <input class="conf" type="text" id="warn_color" value="">
                        </li>
                        <li style="white-space:nowrap; margin-bottom: 5px;">
                            <label for="error_color">Error Color:</label>
                            <input class="conf" type="text" id="error_color" value="">
                        </li>
                        <li style="white-space:nowrap; margin-bottom: 5px;">
                            <label for="info_color">Info Color:</label>
                            <input class="conf" type="text" id="info_color" value="">
                        </li>
                        <li style="white-space:nowrap; margin-bottom: 5px;">
                            <label for="success_color">Success Color:</label>
                            <input class="conf" type="text" id="success_color" value="">
                        </li>
                  </ul> 
                  <h4>You can use hex color codes or use <a href="https://www.w3.org/wiki/CSS/Properties/color/keywords">these</a> presets.</h4>  
                </div>
                &nbsp;
                <button id="settings-mathjs" class="collapsible"><h3>MathJS Options</h3></button>
                <div class="content">
                <ul>
                    <li style="white-space:nowrap; margin-bottom: 5px;">
                        <label for="ep">Epsilon:</label>
                        <input class="conf" type="text" id="ep" value="-">
                    </li>
                    <li style="margin-bottom: 15px;">
                        <label for="matrix">Matrix output for functions: </label>
                        <select name="matrix" id="matrix" value="-">
                            <option value="Matrix">Matrix</option>
                            <option value="Array">Array</option>
                        </select>
                    </li>
                    <li style="margin-bottom: 15px;">
                        <label for="number">Default numeric output: </label>
                        <select name="number" id="number" value="-">
                            <option value="number">Number</option>
                            <option value="BigNumber">BigNumber</option>
                            <option value="Fraction">Fraction</option>
                        </select>
                    </li>
                </ul>
                <h4>Wonder what each option does? Take a look at <a href="https://mathjs.org/docs/core/configuration.html">MathJS Documentation.</a></h4>
                </div>
                &nbsp;
                <button id="settings-advanced" class="collapsible"><h3>Advanced Options</h3></button>
                <div class="content">
                <ul>
                    <li style="white-space:nowrap; margin-bottom: 5px;">
                        <label for="cjs">Custom JavaScript Snippet:</label>
                        <input class="conf" type="text" id="cjs" value="-">
                    </li>
                    <li style="white-space:nowrap; margin-bottom: 5px;">
                        <label for="ccss">Custom CSS Snippet:</label>
                        <input class="conf" type="text" id="ccss" value="-">
                    </li>
                </ul>
                </div>
                <button class="btn" id="reset">Reset to default</button>
                `,
    };
  },
  about: {
    html: `
            <div class="padding: 0; margin: 0; ">
                <h2 style="text-align: center; color: var(--yellow)">${MANIFEST.name}</h2>
                <h4 style="text-align: center;">A lightweight calculator with focus on productivity and minimalism.</h4>
                <h4 style="text-align: center;">v${MANIFEST.version} | <a href="https://github.com/officialEmmel/calcium">code on Github</a></h4>
                <h4 style="text-align: center;">Made with ❤️ by emmel</h4>
            </div>  
        `,
  },
  more: (input: any, output: any) => {
    return {
      html: `
      &nbsp;
      <script>
        
      </script>
      <div class="padding: 0; margin: 0; ">
                <div style="background-color:var(--hover)" class="listItem" >
                  <input
                    tabindex="-1"
                    type="text"
                    id="input"
                    class="input"
                    placeholder="!help for usage..."
                    value="${input}"
                    style="background-color:var(--hover);"
                    readonly
                  />
                  <p id="result" class="result">${output}</p>
                </div>
                <button class="btn" id="copy_res">Copy Result</button>
                <button class="btn" id="copy_in">Copy Input</button>
                <button class="btn" id="copy_both">Copy full Calculation</button>
       </div>  
            `,
    };
  },
  graphing:{
    html: `
    <div id="ggb-element"></div> 
    
    <script>  
    var params = {"appName": "graphing", "width": 800, "height": 600, "showToolBar": true, "showAlgebraInput": true, "showMenuBar": true };
    var applet = new GGBApplet(params, true);
    applet.inject('ggb-element');
    </script>`
  }
};

function showKeyboard() {
  // @ts-ignore
  if (document.getElementById("keyboard").style.display == "block") {
    return;
  }
  // @ts-ignore
  document.getElementById("list").classList.toggle("top");
  // @ts-ignore
  document.getElementById("keyboard").style.display = "block";
}

function hideKeyboard() {
  // @ts-ignore
  if (document.getElementById("keyboard").style.display == "none") {
    return;
  }
  // @ts-ignore
  document.getElementById("list").classList.toggle("top");
  // @ts-ignore
  document.getElementById("keyboard").style.display = "none";
}

export function toggleK() {
  // @ts-ignore
  if (document.getElementById("keyboard").style.display == "none") {
    showKeyboard();
  } else {
    hideKeyboard();
  }
}

//let lastSize:Number = window.innerWidth
export let keyboardOverwritten = false;

// window.onresize = function() {
//     if(window.innerWidth < 600 && !keyboardOverwritten) {
//         showKeyboard()
//     } else {
//         hideKeyboard()
//     }
// }

// if(window.innerWidth < 600 && !keyboardOverwritten) {
//     showKeyboard()
// }
