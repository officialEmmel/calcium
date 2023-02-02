import { e } from "mathjs";
import { Calculator } from "./calculator";
import { Settings } from "./settings";
import { UI, toggleK, modals, ColorScheme } from "./ui";
// import { Keyboard } from "./keyboard_new";

//import {getConfig} from "./settings"

class App {
  settings: Settings;
  parser: any;
  history: any;
  currentIndex: any;
  draft: string;
  ui: UI;
  calculator: Calculator;
  keyboard: any;
  constructor() {
    // declare ui
    this.ui = new UI();

    // this.keyboard = new Keyboard();

    //create calculator with parser
    this.calculator = new Calculator();

    // create settings
    this.settings = new Settings(this.calculator);
    let c = this.settings.getConfig();
    console.log(c);
    let scheme: ColorScheme = {
      bg: c.colors.bg,
      font: c.colors.font,
      accent: c.colors.accent,
      warn: c.colors.warn,
      error: c.colors.error,
      info: c.colors.info,
      success: c.colors.success,
    };

    this.ui.setColor(scheme);

    //load history and set curr index
    this.history = this.getHistory();
    this.currentIndex = this.history.length;

    //download currencies and create new units (async)
    this.calculator.getCurrencies();

    //set draft
    this.draft = "";

    //set EventListeners
    this.setEventListeners();

    this.ui.showToast("This calculator is still in development.", "orange");
  }

  //#region EventListeners

  setEventListeners() {
    var input: any = document.querySelector("#latest > #input");
    input.addEventListener("keyup", () => {
      this.setPrev();
    });
    input.addEventListener("keydown", (event: any) => {
      this.keypress(event);
    });
  }

  removeEventListeners(input: any) {
    input.removeEventListener("keyup", () => {
      this.setPrev();
    });
    input.removeEventListener("keydown", (event: any) => {
      this.keypress(event);
    });
  }

  //#endregion

  //#region History
  getHistory() {
    let history: any = [];

    try {
      // @ts-ignore
      history = JSON.parse(localStorage.getItem("history")).history;
    } catch (err) {}

    return history;
  }

  setHistory(amount: any) {
    if (this.history.length <= 0) {
      return;
    }

    var input: any = document.querySelector("#latest > #input");
    if (this.currentIndex + amount < 0) {
      this.currentIndex = 0;
    } else if (this.currentIndex + amount > this.history.length - 1) {
      this.currentIndex = this.history.length;
      input.value = this.draft;
      return;
    } else {
      this.currentIndex += amount;
    }
    input.value = this.history[this.currentIndex];
  }

  clearHistory() {
    this.history = [];
    this.currentIndex = 0;
    this.draft = "";
    this.calculator.parser.clear();
    localStorage.setItem(
      "parser",
      JSON.stringify(this.calculator.parser.getAll())
    );
    localStorage.setItem("history", '{"history":[]}');
  }

  //#endregion

  //#region I/O
  setOut() {
    var input: any = document.querySelector("#latest > #input");
    var e = this.parse(input.value, false);

    if (e == "clear history") {
      this.removeEventListeners(input);
      this.setEventListeners();
      return;
    }

    if (e == undefined) {
      return;
    } else if (e.toString().includes("function")) {
      this.ui.setOutput(input.value);
    } else {
      this.ui.setOutput(e);
    }

    console.log(this.history);

    this.history.push(input.value);
    localStorage.setItem("history", JSON.stringify({ history: this.history }));

    this.currentIndex = this.history.length;

    localStorage.setItem(
      "parser",
      JSON.stringify(this.calculator.parser.getAll())
    );
  }

  setPrev() {
    var input: any = document.querySelector("#latest >#input");
    if (input.value.length == 0) {
      this.ui.previewOutput("");
    }

    if (this.history[this.currentIndex] != input.value) {
      this.draft = input.value == undefined ? "" : input.value;
    }

    var e = "";
    try {
      e = this.parse(input.value, true);
    } catch (err: any) {
      if (err.message.includes("Unexpected end of expression")) {
        e = "";
      } else {
        this.ui.previewError(err.message);
        return;
      }
    }

    if (e == undefined) {
      this.ui.previewOutput("");
      return;
    }
    if (e.toString().includes("function")) {
      this.ui.previewOutput(input.value);
      return;
    }
    this.ui.previewOutput(e);
  }

  //#endregion

  keypress(event: any) {
    this.inputAutoComplete(event);
    if (event.key === "Enter") {
      //event.preventDefault();
      this.setOut();
      this.removeEventListeners(event.target);
      this.setEventListeners();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      this.setHistory(-1);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      this.setHistory(1);
    }
  }

  inputAutoComplete(event: any) {
    let input: any = document.querySelector("#latest > #input");
    if (event.key == "(") {
      if (input.selectionStart != input.selectionEnd) {
        event.preventDefault();
        input.value =
          input.value.substring(0, input.selectionStart) +
          "(" +
          input.value.substring(input.selectionStart, input.selectionEnd) +
          ")" +
          input.value.substring(input.selectionEnd, input.value.length);
        input.selectionEnd = input.selectionStart;
      } else {
        let start = input.selectionStart;
        event.preventDefault();
        input.value =
          input.value.substring(0, input.selectionStart) +
          "()" +
          input.value.substring(input.selectionEnd, input.value.length);

        input.selectionStart = start + 1;
        input.selectionEnd = start + 1;
      }
    }

    if (event.key == "Backspace") {
      if (input.selectionStart != input.selectionEnd) {
        return;
      }
      if (input.value[input.selectionStart - 1] == "(") {
        if (input.value[input.selectionStart] == ")") {
          event.preventDefault();
          let start = input.selectionStart;
          input.value =
            input.value.substring(0, input.selectionStart - 1) +
            input.value.substring(input.selectionStart + 1, input.value.length);
          input.selectionStart = start - 1;
          input.selectionEnd = start - 1;
        }
      }
    }
  }

  settingsModal() {
    let bg_color = document.getElementById("bg_color");
    let font_color = document.getElementById("font_color");
    let accent_color = document.getElementById("accent_color");
    let warn_color = document.getElementById("warn_color");
    let error_color = document.getElementById("error_color");
    let info_color = document.getElementById("info_color");
    let success_color = document.getElementById("success_color");

    // @ts-ignore
    bg_color.value = this.settings.getConfig().colors.bg;
    // @ts-ignore
    bg_color?.addEventListener("change", (e) => {
      // @ts-ignore
      this.settings.setColorConfig("bg", e.target.value);
    });

    // @ts-ignore
    font_color.value = this.settings.getConfig().colors.font;
    // @ts-ignore
    font_color?.addEventListener("change", (e) => {
      // @ts-ignore
      this.settings.setColorConfig("font", e.target.value);
    });

    // @ts-ignore
    accent_color.value = this.settings.getConfig().colors.accent;
    // @ts-ignore
    accent_color?.addEventListener("change", (e) => {
      // @ts-ignore
      this.settings.setColorConfig("accent", e.target.value);
    });

    // @ts-ignore
    warn_color.value = this.settings.getConfig().colors.warn;
    // @ts-ignore
    warn_color?.addEventListener("change", (e) => {
      // @ts-ignore
      this.settings.setColorConfig("warn", e.target.value);
    });

    // @ts-ignore
    error_color.value = this.settings.getConfig().colors.error;
    // @ts-ignore
    error_color?.addEventListener("change", (e) => {
      // @ts-ignore
      this.settings.setColorConfig("error", e.target.value);
    });

    // @ts-ignore
    info_color.value = this.settings.getConfig().colors.info;
    // @ts-ignore
    info_color?.addEventListener("change", (e) => {
      // @ts-ignore
      this.settings.setColorConfig("info", e.target.value);
    });

    // @ts-ignore
    success_color.value = this.settings.getConfig().colors.success;
    // @ts-ignore
    success_color?.addEventListener("change", (e) => {
      // @ts-ignore
      this.settings.setColorConfig("success", e.target.value);
    });

    

    let ep = document.getElementById("ep");
    let matrix = document.getElementById("matrix");
    let number = document.getElementById("number");

    let reset = document.getElementById("reset");


    // @ts-ignore
    ep.value = this.settings.getConfig().math.epsilon;
    // @ts-ignore
    matrix.value = this.settings.getConfig().math.matrix;
    // @ts-ignore
    number.value = this.settings.getConfig().math.number;

    ep?.addEventListener("change", (e) => {
      // @ts-ignore
      this.settings.setMathConfig("epsilon", e.target.value);
    });

    matrix?.addEventListener("change", (e) => {
      // @ts-ignore
      this.settings.setMathConfig("matrix", e.target.value);
    });

    number?.addEventListener("change", (e) => {
      // @ts-ignore
      this.settings.setMathConfig("number", e.target.value);
    });

    reset?.addEventListener("click", (e) => {
      this.settings.reset();
      window.location.reload();
    });
  }

  parse(exp: any, prev: any) {
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
    ];
    if (exp[0] == "!") {
      if (new RegExp("^! *(" + commands.join("|") + ")$").test(exp)) {
        let regex: any = new RegExp("^! *(" + commands.join("|") + ")$").exec(
          exp
        );
        switch (regex[1]) {
          case "help":
            if (!prev) {
              this.ui.showModal(modals.help);
            }
            if (prev) {
              return "press enter for help";
            }
            return "help";
          case "clear":
            if (!prev) {
              this.clearHistory();
              this.ui.clearUi();
            }
            if (prev) {
              return "press enter to clear history";
            }
            return "clear history";
          case "settings":
            if (!prev) {
              this.ui.showModal(modals.settings);
            }
            if (prev) {
              return "press enter for settings";
            }
            return "settings";
          case "about":
            if (!prev) {
              this.ui.showModal(modals.about);
            }
            if (prev) {
              return "press enter for about page";
            }
            return "about";
          case "h":
            if (!prev) {
              this.ui.showModal(modals.help);
            }
            if (prev) {
              return "press enter for help";
            }
            return "help";
          case "c":
            if (!prev) {
              this.clearHistory();
              this.ui.clearUi();
            }
            if (prev) {
              return "press enter to clear history";
            }
            return "clear history";
          case "s":
            if (!prev) {
              this.ui.showModal(modals.settings(this.settings));
              this.settingsModal();
            }
            if (prev) {
              return "press enter for settings";
            }
            return "settings";
          case "a":
            if (!prev) {
              this.ui.showModal(modals.about);
            }
            if (prev) {
              return "press enter for about page";
            }
            return "about";
          case "k":
            // if (!prev) {
            //   toggleK();
            //   return "keyboard";
            // }
            if (!prev) {
              return "keyboard not available in deploy-mode";
            }
            return "toggles keyboard";
        }
      } else {
        return "unknown command. you can see all commands: <b>!help</b>";
      }
    }
    return this.calculator.calculate(exp, prev);
  }
}

// @ts-ignore
const APP = new App();
