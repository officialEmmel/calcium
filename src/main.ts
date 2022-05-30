import {calculate, createParser, setConfig} from "./calculator"
import {getCurrencies}  from "./currency"
import {showModal, showToast, clearUi, previewOutput, previewError, toggleK, setOutput, keyboardOverwritten, modals} from "./ui"
import {getConfig} from "./settings"


class App {
    config: any
    parser: any
    history: any
    currentIndex: any
    draft: string
    constructor() {
        
        //get config from local storage
        this.config = getConfig()

        //load history and set curr index
        this.history = this.getHistory()
        this.currentIndex = this.history.length

        //loading parser from local storage or create new one
        this.parser = createParser()

        //set draft
        this.draft = ""
        
        //download currencies and create new units
        getCurrencies()

        //set EventListeners
        this.setEventListeners()
    }   

    getHistory() {
        let history:any = []

        // @ts-ignore
        try{history = JSON.parse(localStorage.getItem("history")).history} catch(err) {}

        return history
    }

    setEventListeners() {
        var input:any = document.querySelector("#latest > #input")
        input.addEventListener("keyup", () => {this.setPrev()})
        input.addEventListener("keydown", (event:any) => {this.keypress(event)});
    }

    removeEventListeners(input:any) { 
        input.removeEventListener("keyup", () => {this.setPrev()})
        input.removeEventListener("keydown", (event:any) => {this.keypress(event)});
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

    setOut() {
        var input:any = document.querySelector("#latest > #input")
        var e = this.parse(input.value, false)
    
        if(e == "clear history") {
            this.removeEventListeners(input);
            this.setEventListeners()
            return
        }
    
        if(e == undefined) {return}
        else if(e.toString().includes("function")) {setOutput(input.value);}
        else {setOutput(e)}
    
        console.log(this.history)
    
        this.history.push(input.value)
        localStorage.setItem("history", JSON.stringify({history: history}))
    
        this.currentIndex = history.length
    
        localStorage.setItem("parser", JSON.stringify(this.parser.getAll()))
    
    }
    
    setPrev() {
        var input:any = document.querySelector("#latest >#input")
        if(input.value.length == 0) { previewOutput(""); }
    
        if(this.history[this.currentIndex] != input.value) {this.draft = (input.value==undefined) ? "" : input.value}
    
        var e = ""
        try {e = this.parse(input.value, true)} catch(err:any) {
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

    clearHistory() {
        this.history = []
        this.currentIndex = 0
        this.draft = ""
        this.parser.clear()
        localStorage.setItem("parser", JSON.stringify(this.parser.getAll()))
        localStorage.setItem("history", this.history)
    }

    keypress(event:any) {
        if (event.key === "Enter") {
          event.preventDefault();
          this.setOut()
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
                        if(!prev){showModal(modals.help);}
                        if(prev){return "press enter for help"}
                        return "help"
                    case "clear":
                        if(!prev){this.clearHistory();clearUi()}
                        if(prev){return "press enter to clear history"}
                        return "clear history"
                    case "settings":
                        if(!prev){showModal(modals.settings);}   
                        if(prev){return "press enter for settings"}
                        return "settings"
                    case "about":
                        if(!prev){showModal(modals.about);}   
                        if(prev){return "press enter for about page"}
                        return "about"
                    case "h":
                        if(!prev){showModal(modals.help);}
                        if(prev){return "press enter for help"}
                        return "help"
                    case "c":
                        if(!prev){this.clearHistory();clearUi()}
                        if(prev){return "press enter to clear history"}
                        return "clear history"
                    case "s":
                        if(!prev){showModal(modals.settings);}   
                        if(prev){return "press enter for settings"}
                        return "settings"
                    case "a":
                        if(!prev){showModal(modals.about);}   
                        if(prev){return "press enter for about page"}
                        return "about"
                    case "k":
                        if(!prev){toggleK(); return "keyboard"}
                        return "toggles keyboard"
    
                }
            } else {return "unknown command. you can see all commands: <b>!help</b>"}
        }
        return calculate(this.parser, exp, prev)
    }

}

const APP = new App()

