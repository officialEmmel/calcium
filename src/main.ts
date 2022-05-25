import math from "mathjs";
import {calculate} from "./calculator"
import {getCurrencies}  from "./currency"
import {showModal, showToast, clearUi, previewOutput, previewError, toggleK, setOutput, keyboardOverwritten} from "./ui"


let draft = ""
math.config({
    epsilon: CONFIG.math.epsilon,
    matrix: CONFIG.math.matrix,
    number: CONFIG.math.number,
    precision: CONFIG.math.precision,
    predictable: CONFIG.math.predictable,
    randomSeed: CONFIG.math.randomSeed
})

export let parser:any = localStorage.getItem("parser")
if(parser == null) {
    parser = math.parser()
    localStorage.setItem("parser", JSON.stringify(parser.getAll()))
} else {
    let vars = JSON.parse(parser)
    parser = math.parser()
    for (let key in vars) {
        parser.set(key, vars[key])
    }
}

let history:any = []
// @ts-ignore
try{history = JSON.parse(localStorage.getItem("history")).history} catch(err) {}
let currentIndex = history.length


// set even listeners
function setEventListener() {
    var input:any = document.querySelector("#latest > #input")
    //input.addEventListener("copy", copy)
    input.addEventListener("keyup", setPrev)
    input.addEventListener("keydown", keypress);
}

// remove event listeners
function removeEventListener() { 
    input.removeEventListener("keyup", setPrev)
    input.removeEventListener("keydown", keypress);
    //input.removeEventListener("copy", copy)
}

function keypress(event:any) {
    if (event.key === "Enter") {
      event.preventDefault();
      setOut()
      removeEventListener();
      setEventListener()
    } else if(event.key === "ArrowUp") {
        event.preventDefault();
        setHistory(-1)
    } else if(event.key === "ArrowDown") {
        event.preventDefault();
        setHistory(1)
    }
}

async function copy(e:any) {
    await navigator.clipboard.writeText(e.target.innerHTML)
    showToast("Copied to clipboard", "green")
}

function setHistory(amount:any) {
    if(history.length == 0) {
        return
    }
    
    var input:any = document.querySelector("#latest > #input")
    if(currentIndex + amount < 0) {
        currentIndex = 0
    }
    else if(currentIndex + amount > history.length-1) { 
        currentIndex = history.length
        input.value = draft
        return
    } else {
        currentIndex+=amount
    }
    input.value = history[currentIndex]
}

function setOut() {
    var input:any = document.querySelector("#latest > #input")
    var e = parse(input.value, false)

    if(e == "clear history") {
        removeEventListener();
        setEventListener()
        return
    }

    if(e == undefined) {return}
    else if(e.toString().includes("function")) {setOutput(input.value);}
    else {setOutput(e)}


    history.push(input.value)
    localStorage.setItem("history", JSON.stringify({history: history}))

    currentIndex = history.length

    localStorage.setItem("parser", JSON.stringify(parser.getAll()))

}

function setPrev() {
    var input:any = document.querySelector("#latest >#input")
    if(input.value.length == 0) { previewOutput(""); }

    if(history[currentIndex] != input.value) {draft = (input.value==undefined) ? "" : input.value}

    var e = ""
    try {e = parse(input.value, true)} catch(err:any) {
        if(err.message.includes("Unexpected end of expression")){
            e = "";
        } else {
            previewError(err.message);return
        }
        
    }

    if(e == undefined) {previewOutput(""); return}
    if(e.toString().includes("function")) {previewOutput(input.value); return}
    previewOutput(e)
}

const commands = [
    "clear",
    "help",
    "settings",
    "about",
    "keyboard",
    "c",
    "h",
    "s",
    "a",
    "k",
]

function clearHistory() {
    history = []
    currentIndex = 0
    draft = ""
    parser.clear()
    localStorage.setItem("parser", JSON.stringify(parser.getAll()))
    localStorage.setItem("history", history)
}

function parse(exp:any, prev:any) {
    if(exp[0]=="!") {
        if(new RegExp("^! *("+ commands.join("|") +")$").test(exp)) {
            let regex:any = new RegExp("^! *("+ commands.join("|") +")$").exec(exp)
            switch(regex[1]) {
                case "help":
                    if(!prev){showModal("help");}
                    if(prev){return "press enter for help"}
                    return "help"
                case "clear":
                    if(!prev){clearHistory();clearUi()}
                    if(prev){return "press enter to clear history"}
                    return "clear history"
                case "settings":
                    if(!prev){showModal("settings");}   
                    if(prev){return "press enter for settings"}
                    return "settings"
                case "about":
                    if(!prev){showModal("about");}   
                    if(prev){return "press enter for about page"}
                    return "about"
                case "h":
                    if(!prev){showModal("help");}
                    if(prev){return "press enter for help"}
                    return "help"
                case "c":
                    if(!prev){clearHistory();clearUi()}
                    if(prev){return "press enter to clear history"}
                    return "clear history"
                case "s":
                    if(!prev){showModal("settings");}   
                    if(prev){return "press enter for settings"}
                    return "settings"
                case "a":
                    if(!prev){showModal("about");}   
                    if(prev){return "press enter for about page"}
                    return "about"
                case "k":
                    if(!prev){toggleK(); return "keyboard"}
                    return "toggles keyboard"

            }
        } else {return "unknown command. you can see all commands: <b>!help</b>"}
    }
    return calculate(exp, prev)
}


//Start
//set all event listeners
setEventListener();
// download currencies and create new units
getCurrencies();

