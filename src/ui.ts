let current = 0;
let showedSolve = false

let elementPrototype = `
    <input type="text" id="input" class="input" placeholder="Type here...">
    <p id="result" class="result"></p>
`

export class UI {
    constructor() {
        document.addEventListener("solve",() => {
            if(!showedSolve) {
                showedSolve = true
                this.showToast("Solve is not fully supported.","orange",3000)
            }
        })
        
    }

    previewOutput(output:any) {
        var preview:any = document.querySelector("#latest > #result")
        preview.style.color = "var(--gray)"
        preview.innerHTML = output;
    
        if(current < 8){return}
        preview.scrollIntoView()
    }

    previewError(output:any) {
        var preview:any = document.querySelector("#latest > #result")
        preview.style.color = "var(--red)"
        preview.innerHTML = output;
    }

    setOutput(output:any) {
        var input:any = document.querySelector("#latest > #input")
        var out:any = document.querySelector("#latest > #result")
        var listItem:any = document.querySelector("#latest")
        var list:any = document.querySelector("#list")
    
        var proto:any = document.createElement("li")
        proto.setAttribute("id", "latest")
        proto.setAttribute("class", "listItem")
        proto.innerHTML = elementPrototype;
    
        input.readOnly = true;
    
    
        out.style.color = "var(--font)"
        out.innerHTML = output;
    
        listItem.setAttribute("id", "id"+current)
        listItem.classList.add("hoverable")
        listItem.addEventListener("click", async (e:any) => {
            let l:any = null
            if(e.target.id == "input") {
                l = e.target.parentNode.querySelector("#result")
            } else if(new RegExp("^id[0-9]+$").test(e.target.id)) {
                l = e.target.querySelector("#result")
            } else {
                l = e.target
            }
            await navigator.clipboard.writeText(l.innerHTML)
            this.showToast("Copied to clipboard", "green")
        })
    
        list.appendChild(proto)
    
        // @ts-ignore
        document.querySelector("#latest > #input").focus()
    
        showedSolve = false
        current++
    }

    clearUi() {
        var listItems:any = document.getElementsByClassName("listItem")
        while(listItems.length > 0) {
            listItems[0].remove()
        }
    
        var list:any = document.getElementById("list")
        var proto:any = document.createElement("li")
        proto.setAttribute("id", "latest")
        proto.setAttribute("class", "listItem")
        proto.innerHTML = elementPrototype;
        list.appendChild(proto)
        // @ts-ignore
        document.querySelector("#latest > #input").focus()
        this.showToast("History cleared", "green")
    }

    showModal(template:any) {
        var modal:any = document.getElementById("modal");
        var inner:any = document.getElementById("modal-inner");
    
        inner.innerHTML = template.html
    
        modal.style.display = "block";
    
        // @ts-ignore 
        var span:HTMLElement = document.getElementsByClassName("close")[0];
    
        // @ts-ignore 
        document.querySelector("#latest > #input").blur()
    
    
        span.onclick = function() {
            modal.style.display = "none";
        }
    
        window.onclick = function(event) {
            if (event.target == modal) {
            modal.style.display = "none";
            }
        }
    }

    showToast(text:any, color = "hover", time=3000, autoClose = true) {
        // @ts-ignore
        var x:HTMLElement = document.getElementById("snackbar");
        x.className = "show";
        x.style.backgroundColor = "var(--"+color+")" 
        x.innerHTML = text;
        if(autoClose) {
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, time);
        }
    }

    closeToast() {
        // @ts-ignore
        var x:HTMLElement = document.getElementById("snackbar");
        x.className = x.className.replace("show", "");
    }

    

}

 

export const modals = {
    help: {
        html: `html
            <div class="padding: 0; margin: 0; ">
                <h2>Help</h2>
                <h4>Basic usage</h4>
                <ul>
                    <li><code>2 + 2</code> returns <code>4</code></li>
                    <li><code>2 * sqrt(9)</code> returns <code>6</code></li>
                    <li><code>51 cm to inch</code> returns <code>20.07 inch</code></li>
                    <li><code>1 usd to eur</code> returns <code>0.94 eur</code></li>
                </ul>
                <h4>Commands</h4>
                <ul>
                    <li><code>!help</code>: Shows help</li>
                    <li><code>!clear</code>: Clears history and all variables</li>
                    <li><code>!about</code>: Shows about screen</li>
                </ul>  
                <h4>Operators (Overview)</h4>
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
                <p style="font-size:12px; color:var(--orange)">*Using solve() you might miss some features as we use another libary for this function</p>
                <p>You can find all operators <a href="https://mathjs.org/docs/expressions/syntax.html">here.</a></p>
            </div>  
        `
    },
    settings: {
        html: `
            <div class="padding: 0; margin: 0; ">
                <h2>Settings</h2>
                <h3>Calculator</h3>
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
                    <li style="white-space:nowrap; margin-bottom: 15px;">
                        <label for="prec">Precision:</label>
                        <input class="conf" type="number" id="prec" value="-">
                    </li>
                </ul>
                <h4>What does each option do? Take a look <a href="https://mathjs.org/docs/core/configuration.html">here.</a></h4>
            </div>  
        `
    },
    about: {
        html: `
            <div class="padding: 0; margin: 0; ">
                <h2 style="text-align: center;">*App name*</h2>
                <h4 style="text-align: center;">A leightweight calculator with focus on productivity and minimalism.</h4>
                <h4 style="text-align: center;">v1.0.0 | <a href="https://github.com/officialEmmel/">Source code</a></h4>
                <h4 style="text-align: center;">Made with ❤️ by emmel</h4>
            </div>  
        `
    }
}


function showKeyboard() {
    // @ts-ignore
    if(document.getElementById("keyboard").style.display == "block") {return}
    // @ts-ignore
    document.getElementById("list").classList.toggle("top");
    // @ts-ignore
    document.getElementById("keyboard").style.display = "block";
}

function hideKeyboard() {
    // @ts-ignore
    if(document.getElementById("keyboard").style.display == "none") {return}
    // @ts-ignore
    document.getElementById("list").classList.toggle("top");
    // @ts-ignore
    document.getElementById("keyboard").style.display = "none";
}

export function toggleK(){
    // @ts-ignore 
    if(document.getElementById("keyboard").style.display == "none") {showKeyboard()}
    else {hideKeyboard()}
}

let lastSize:Number = window.innerWidth
export let keyboardOverwritten = false

window.onresize = function() {
    if(window.innerWidth < 600 && !keyboardOverwritten) {
        showKeyboard()
    } else {
        hideKeyboard()
    }
}

if(window.innerWidth < 600 && !keyboardOverwritten) {
    showKeyboard()
}
