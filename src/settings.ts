export class Settings {
  calculator: any;
  constructor(calculator: any) {
    this.calculator = calculator;
    this.updateConfig();
  }
  defaultConfig = {
    general: {
      language: "en",
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
      return this.defaultConfig;
    } else {
      return JSON.parse(s);
    }
  }

  reset() {
    this.setKey("config", JSON.stringify(this.defaultConfig));
    this.updateConfig();
  }

  updateConfig() {
    let conf = this.getConfig();
    this.calculator.setConfig(conf.math);
  }

  setConfig(key: string, value: string) {
    console.log("set config", key, value);
    let config = this.getConfig();
    config[key] = value;
    this.setKey("config", JSON.stringify(config));
    this.calculator.setConfig(config.math);
  }

  setMathConfig(key: string, value: string) {
    console.log("set math config", key, value);
    let config = this.getConfig();
    config.math[key] = value;
    this.setKey("config", JSON.stringify(config));
    this.calculator.setConfig(config.math);
  }

  setGeneralConfig(key: string, value: string) {
    console.log("set general config", key, value);
    let config = this.getConfig();
    config.general[key] = value;
    this.setKey("config", JSON.stringify(config));
    this.calculator.setConfig(config.math);
  }

  setColorConfig(key: string, value: string) {
    console.log("set colors config", key, value);
    let config = this.getConfig();
    config.colors[key] = value;
    this.setKey("config", JSON.stringify(config));
    this.calculator.setConfig(config.math);
  }

  setKey(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getKey(key: string) {
    return localStorage.getItem(key);
  }
}
