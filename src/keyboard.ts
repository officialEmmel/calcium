let currentKeybod = 1

let keyboard1 = {
    equals: document.getElementById("equals"),
    plus: document.getElementById("plus"),
    minus:document.getElementById("minus"),
    multiply: document.getElementById("multiply"),
    divide: document.getElementById("divide"),
    pow: document.getElementById("pow"),
    backspace: document.getElementById("backspace"),
    decimal: document.getElementById("decimal"),
    zero: document.getElementById("zero"),
    one: document.getElementById("one"),
    two: document.getElementById("two"),
    three: document.getElementById("three"),
    four: document.getElementById("four"),
    five: document.getElementById("five"),
    six: document.getElementById("six"),
    seven: document.getElementById("seven"),
    eight: document.getElementById("eight"),
    nine: document.getElementById("nine"),
    ans: document.getElementById("ans"),

    toggleF: document.getElementById("fnc"),
    toggleC: document.getElementById("cmd"),
    up: document.getElementById("up"),
    down: document.getElementById("down"),
}

function setListenersK1() {
    keyboard1.one.addEventListener("click", (e) => {handleKey("1")})
    keyboard1.two.addEventListener("click", (e) => {handleKey("2")})
    keyboard1.three.addEventListener("click", (e) => {handleKey("3")})
    keyboard1.four.addEventListener("click", (e) => {handleKey("4")})
    keyboard1.five.addEventListener("click", (e) => {handleKey("5")})
    keyboard1.six.addEventListener("click", (e) => {handleKey("6")})
    keyboard1.seven.addEventListener("click", (e) => {handleKey("7")})
    keyboard1.eight.addEventListener("click", (e) => {handleKey("8")})
    keyboard1.nine.addEventListener("click", (e) => {handleKey("9")})
    keyboard1.zero.addEventListener("click", (e) => {handleKey("0")})
    keyboard1.decimal.addEventListener("click", (e) => {handleKey(".")})
    keyboard1.plus.addEventListener("click", (e) => {handleKey("+")})
    keyboard1.minus.addEventListener("click", (e) => {handleKey("-")})
    keyboard1.multiply.addEventListener("click", (e) => {handleKey("*")})
    keyboard1.divide.addEventListener("click", (e) => {handleKey("/")})
    keyboard1.pow.addEventListener("click", (e) => {handleKey("^")})
    keyboard1.backspace.addEventListener("click", (e) => {removeInput()})
    keyboard1.equals.addEventListener("click", (e) => {enter()})
    keyboard1.ans.addEventListener("click", (e) => {handleKey("ans")})

    keyboard1.toggleF.addEventListener("click", (e) => {toggleF()})
    keyboard1.toggleC.addEventListener("click", (e) => {})
    keyboard1.up.addEventListener("click", (e) => {up()})
    keyboard1.down.addEventListener("click", (e) => {down()})
}




let keyboard2 = {
    sin: document.getElementById("sin"),
    cos: document.getElementById("cos"),
    tan: document.getElementById("tan"),
    bracketOpen: document.getElementById("bracketOpen"),
    bracketClose: document.getElementById("bracketClose"),
    asin: document.getElementById("asin"),
    acos: document.getElementById("acos"),
    atan: document.getElementById("atan"),
    sqrt: document.getElementById("sqrt"),
    log: document.getElementById("log"),
    cbrt: document.getElementById("cbrt"),
    pi: document.getElementById("pi"),
    e: document.getElementById("euler"), 
    define: document.getElementById("define"),
    modulo: document.getElementById("modulo"),
    equals: document.querySelector("#keySet2 > .keyboardRow > #equals"),
    backspace: document.querySelector("#keySet2 > .keyboardRow > #backspace"),

    toggleC: document.querySelector("#keySet2 > .keyboardRowSmall > #cmd"),
    toggleN: document.querySelector("#keySet2 > .keyboardRowSmall > #num"),
    up: document.querySelector("#keySet2 > .keyboardRowSmall > #up"),
    down: document.querySelector("#keySet2 > .keyboardRowSmall > #down"),
}

function setListenersK2() {
    keyboard2.sin.addEventListener("click", (e) => {handleKey("sin(")})
    keyboard2.cos.addEventListener("click", (e) => {handleKey("cos(")})
    keyboard2.tan.addEventListener("click", (e) => {handleKey("tan(")})
    keyboard2.bracketOpen.addEventListener("click", (e) => {handleKey("(")})
    keyboard2.bracketClose.addEventListener("click", (e) => {handleKey(")")})
    keyboard2.asin.addEventListener("click", (e) => {handleKey("asin(")})
    keyboard2.acos.addEventListener("click", (e) => {handleKey("acos(")})
    keyboard2.atan.addEventListener("click", (e) => {handleKey("atan(")})
    keyboard2.sqrt.addEventListener("click", (e) => {handleKey("sqrt(")})
    keyboard2.log.addEventListener("click", (e) => {handleKey("log(")})
    keyboard2.cbrt.addEventListener("click", (e) => {handleKey("cbrt(")})
    keyboard2.pi.addEventListener("click", (e) => {handleKey("pi")})
    keyboard2.e.addEventListener("click", (e) => {handleKey("e")})
    keyboard2.define.addEventListener("click", (e) => {handleKey("=")})
    keyboard2.modulo.addEventListener("click", (e) => {handleKey("%")})

    keyboard2.backspace.addEventListener("click", (e) => {removeInput()})
    keyboard2.equals.addEventListener("click", (e) => {enter()})

    keyboard2.toggleC.addEventListener("click", (e) => {})
    keyboard2.toggleN.addEventListener("click", (e) => {toggleN()})
    keyboard2.up.addEventListener("click", (e) => {up()})
    keyboard2.down.addEventListener("click", (e) => {down()})

}




function handleKey(key) {
    console.log(key)
    addInput(key)
    setPrev()
}

function addInput(key) {
    document.querySelector("#latest > #input").value += key
}

function removeInput() {
    document.querySelector("#latest > #input").value = document.querySelector("#latest > #input").value.slice(0, -1)
    setPrev()
}

function clearInput() {
    document.querySelector("#latest > #input").value = ""
    setPrev()
}

function enter() {
    setOut()
}

function toggleKeyboard() {
    if (currentKeybod == 1) {
        //removeListenersK1()
        document.getElementById("keySet1").style.display = "none"
        currentKeybod = 2
        //setListenersK2()
        document.getElementById("keySet2").style.display = "block"
    } else {
        //removeListenersK2()
        document.getElementById("keySet2").style.display = "none"
        currentKeybod = 1
        //setListenersK1()
        document.getElementById("keySet1").style.display = "block"
    }
}

function toggleF() {
    document.getElementById("keySet2").style.display = "block"
    document.getElementById("keySet1").style.display = "none"
}

function toggleN() {
    document.getElementById("keySet1").style.display = "block"
    document.getElementById("keySet2").style.display = "none"
}

function up() {
    setHistory(-1)
}

function down() {
    setHistory(1)
}


setListenersK1()
setListenersK2()
toggleN()


