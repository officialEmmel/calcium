import math from "mathjs"
const URl = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json"

export async function getCurrencies() {
    const response = await fetch(URl)
    let data = await response.json()
    data = data["eur"]
    let units:any = {}
    let i = 0
    units["EUR"] = {
        definition: "",
        aliases: ["euro", "euros", "Euro", "Euros", "eur"],
        baseName : "CURRENCY",
    }
    for (const key in data) { 
        if (data.hasOwnProperty(key)) {
            const element = data[key];
            if(key == "1inch") {continue}
            if(key == "eur") {continue}
            units[key.toUpperCase()] = {
                definition: (1/element).toString() + " EUR",
                aliases: [key],
                //baseName : "CURRENCY",
            }
            i++
        }
    }
    console.log(units)
    math.createUnit(units,{override: true})
}

