import {Calculator} from "./calculator"
import {UI, toggleK, modals} from "./ui"
import {Keyboard} from "./keyboard_new"

//import {getConfig} from "./settings"


class App {
    config: any
    parser: any
    history: any
    currentIndex: any
    draft: string
    ui: UI
    calculator: Calculator
    keyboard: any
    constructor() {
        
        //get config from local storage
        //this.config = getConfig()

        // declare ui
        this.ui = new UI()

        this.keyboard = new Keyboard()

        //load history and set curr index
        this.history = this.getHistory()
        this.currentIndex = this.history.length

        //create calculator with parser
        this.calculator = new Calculator()

        //download currencies and create new units (async)
        this.calculator.getCurrencies()

        //set draft
        this.draft = ""
    
        //set EventListeners
        this.setEventListeners()

        this.ui.showToast("This calculator is still in development.", "orange")
    }   


    //#region EventListeners

    setEventListeners() {
        var input:any = document.querySelector("#latest > #input")
        input.addEventListener("keyup", () => {this.setPrev()})
        input.addEventListener("keydown", (event:any) => {this.keypress(event)});
    }

    removeEventListeners(input:any) { 
        input.removeEventListener("keyup", () => {this.setPrev()})
        input.removeEventListener("keydown", (event:any) => {this.keypress(event)});
    }

    //#endregion

    //#region History
    getHistory() {
        let history:any = []

        // @ts-ignore
        try{history = JSON.parse(localStorage.getItem("history")).history} catch(err) {}

        return history
    }

    setHistory(amount:any) {
        if(history.length == 0) {
            return
        }
        
        var input:any = document.querySelector("#latest > #input")
        if(this.currentIndex + amount < 0) {
            this.currentIndex = 0
        }
        else if(this.currentIndex + amount > this.history.length-1) { 
            this.currentIndex = this.history.length
            input.value = this.draft
            return
        } else {
            this.currentIndex+=amount
        }
        input.value = this.history[this.currentIndex]
    }

    clearHistory() {
        this.history = []
        this.currentIndex = 0
        this.draft = ""
        this.calculator.parser.clear()
        localStorage.setItem("parser", JSON.stringify(this.calculator.parser.getAll()))
        localStorage.setItem("history", '{"history":[]}')
    }

    //#endregion

    //#region I/O
    setOut() {
        var input:any = document.querySelector("#latest > #input")
        var e = this.parse(input.value, false)
    
        if(e == "clear history") {
            this.removeEventListeners(input);
            this.setEventListeners()
            return
        }
    
        if(e == undefined) {return}
        else if(e.toString().includes("function")) {this.ui.setOutput(input.value);}
        else {this.ui.setOutput(e)}
    
        console.log(this.history)
    
        this.history.push(input.value)
        localStorage.setItem("history", JSON.stringify({history: this.history}))
    
        this.currentIndex = this.history.length
    
        localStorage.setItem("parser", JSON.stringify(this.calculator.parser.getAll()))
    
    }
    
    setPrev() {
        var input:any = document.querySelector("#latest >#input")
        if(input.value.length == 0) { this.ui.previewOutput(""); }
    
        if(this.history[this.currentIndex] != input.value) {this.draft = (input.value==undefined) ? "" : input.value}
    
        var e = ""
        try {e = this.parse(input.value, true)} catch(err:any) {
            if(err.message.includes("Unexpected end of expression")){
                e = "";
            } else {
                this.ui.previewError(err.message);return
            }
            
        }
    
        if(e == undefined) {this.ui.previewOutput(""); return}
        if(e.toString().includes("function")) {this.ui.previewOutput(input.value); return}
        this.ui.previewOutput(e)
    }

    //#endregion


    keypress(event:any) {
        if (event.key === "Enter") {
          //event.preventDefault();
          this.setOut();
          this.removeEventListeners(event.target);
          this.setEventListeners()
        } else if(event.key === "ArrowUp") {
            event.preventDefault();
            this.setHistory(-1)
        } else if(event.key === "ArrowDown") {
            event.preventDefault();
            this.setHistory(1)
        }
    }

    parse(exp:any, prev:any) {
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
        if(exp[0]=="!") {
            if(new RegExp("^! *("+ commands.join("|") +")$").test(exp)) {
                let regex:any = new RegExp("^! *("+ commands.join("|") +")$").exec(exp)
                switch(regex[1]) {
                    case "help":
                        if(!prev){this.ui.showModal(modals.help);}
                        if(prev){return "press enter for help"}
                        return "help"
                    case "clear":
                        if(!prev){this.clearHistory();this.ui.clearUi()}
                        if(prev){return "press enter to clear history"}
                        return "clear history"
                    case "settings":
                        if(!prev){this.ui.showModal(modals.settings);}   
                        if(prev){return "press enter for settings"}
                        return "settings"
                    case "about":
                        if(!prev){this.ui.showModal(modals.about);}   
                        if(prev){return "press enter for about page"}
                        return "about"
                    case "h":
                        if(!prev){this.ui.showModal(modals.help);}
                        if(prev){return "press enter for help"}
                        return "help"
                    case "c":
                        if(!prev){this.clearHistory();this.ui.clearUi()}
                        if(prev){return "press enter to clear history"}
                        return "clear history"
                    case "s":
                        if(!prev){this.ui.showModal(modals.settings);}   
                        if(prev){return "press enter for settings"}
                        return "settings"
                    case "a":
                        if(!prev){this.ui.showModal(modals.about);}   
                        if(prev){return "press enter for about page"}
                        return "about"
                    case "k":
                        if(!prev){toggleK(); return "keyboard"}
                        return "toggles keyboard"
    
                }
            } else {return "unknown command. you can see all commands: <b>!help</b>"}
        }
        return this.calculator.calculate(exp, prev)
    }

}

// @ts-ignore
const APP = new App()

