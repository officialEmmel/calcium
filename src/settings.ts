const defaultConfig = {
    general: {
        language: "en",
        theme: "dark",
        fontSize: "14px",
    },
    math: {
        epsilon: 1e-12,
        matrix: 'Matrix',
        number: 'number',
        precision: 64,
        predictable: false,
        randomSeed: null,
    }
}
function getConfig() {
    let s = getKey("config")
    if(s == null) {
        setKey("config", JSON.stringify(defaultConfig))
        return defaultConfig
    } else {
        return JSON.parse(s)
    }
}

function setConfig(key:string, value:string) {
    let config = getConfig()
    config[key] = value
    setKey("config", JSON.stringify(config))
}

function setKey(key:string, value:string) {
    localStorage.setItem(key, value)
}

function getKey(key:string) {
    return localStorage.getItem(key)
}

const CONFIG = getConfig()
