export class Settings {
  calculator: any;
  version: number = 3;
  ui: any;
  constructor(calculator: any, ui: any) {
    this.calculator = calculator;
    this.ui = ui
    this.updateConfig();
  }
  defaultConfig = {
    version: this.version,
    general: {
      language: "en",
      round_precision: "5",
      bracket_completion: true,
    },
    colors: {
      bg: "#121212",
      font: "#ffffff",
      accent: "#ffc814",
      warn: "#ff7214",
      error: "#fc4848",
      info: "#0982fc",
      success: "#349234",
    },
    math: {
      epsilon: 1e-12,
      matrix: "Matrix",
      number: "number",
      precision: 64,
      predictable: false,
      randomSeed: null,
    },
  };

  getConfig() {
    let s = this.getKey("config");
    if (s == null) {
      this.setKey("config", JSON.stringify(this.defaultConfig));
      console.log("no config found, using default")
      return this.defaultConfig;
    } else {
      let p = JSON.parse(s);
      if(p.version != this.version){
        setTimeout((that: any) => {
          that.ui.showToast("Your Config was ressetted due to version migration", "blue")
        }, 3000, this)
        this.reset();
        return this.defaultConfig;
      }
      console.log("config found", p )
      return p;
    }
  }

  reset() {

    this.setKey("config", JSON.stringify(this.defaultConfig));
    this.updateConfig();
  }

  resetColorConfig(key: string){
    let config = this.getConfig();
    // @ts-ignore
    config.colors[key] = this.defaultConfig.colors[key];
    this.setKey("config", JSON.stringify(config));
    this.updateConfig()
  }

  resetMathConfig(key: string){
    let config = this.getConfig();
    // @ts-ignore
    config.math[key] = this.defaultConfig.math[key];
    this.setKey("config", JSON.stringify(config));
    this.updateConfig()
  }

  resetGeneralConfig(key: string){
    let config = this.getConfig();
    // @ts-ignore
    config.general[key] = this.defaultConfig.general[key];
    this.setKey("config", JSON.stringify(config));
    this.updateConfig()
  }

  updateConfig() {
    let conf = this.getConfig();
    this.calculator.setConfig(conf.math);
    this.calculator.setRoundPrecision(conf.general.round_precision)
  }

  setConfig(key: string, value: string) {
    console.log("set config", key, value);
    let config = this.getConfig();
    config[key] = value;
    this.setKey("config", JSON.stringify(config));
    this.updateConfig()
  }

  setMathConfig(key: string, value: string) {
    console.log("set math config", key, value);
    let config = this.getConfig();
    config.math[key] = value;
    this.setKey("config", JSON.stringify(config));
    this.updateConfig()
  }

  setGeneralConfig(key: string, value: string) {
    console.log("set general config", key, value);
    let config = this.getConfig();
    config.general[key] = value;
    this.setKey("config", JSON.stringify(config));
    this.updateConfig()
  }

  setColorConfig(key: string, value: string) {
    console.log("set colors config", key, value);
    let config = this.getConfig();
    config.colors[key] = value;
    this.setKey("config", JSON.stringify(config));
    this.updateConfig()
  }

  setKey(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getKey(key: string) {
    return localStorage.getItem(key);
  }
}
