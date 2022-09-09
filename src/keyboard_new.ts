interface KeySet {
    name: string;
    0: {
        0: {
            key: string,
            id: string,
            value: string|((message?:any)=>void),
        }
        1: {
            key: string,
            id: string,
            value: string,
        },
        2: {
            key: string,
            id: string,
            value: string,
        },
        3: {
            key: string,
            id: string,
            value: string,
        }
    },
    1: {
        0: {
            key: string,
            id: string,
            value: string,
        }
        1: {
            key: string,
            id: string,
            value: string,
        },
        2: {
            key: string,
            id: string,
            value: string,
        },
        3: {
            key: string,
            id: string,
            value: string,
        }
    },
    2: {
        0: {
            key: string,
            id: string,
            value: string,
        }
        1: {
            key: string,
            id: string,
            value: string,
        },
        2: {
            key: string,
            id: string,
            value: string,
        },
        3: {
            key: string,
            id: string,
            value: string,
        }
    },
    3: {
        0: {
            key: string,
            id: string,
            value: string,
        }
        1: {
            key: string,
            id: string,
            value: string,
        },
        2: {
            key: string,
            id: string,
            value: string,
        },
        3: {
            key: string,
            id: string,
            value: string,
        }
    },
    4: {
        0: {
            key: string,
            id: string,
            value: string,
        }
        1: {
            key: string,
            id: string,
            value: string,
        },
        2: {
            key: string,
            id: string,
            value: string,
        },
        3: {
            key: string,
            id: string,
            value: string,
        }
    },
    5: {
        0: {
            key: string,
            id: string,
            value: string,
        }
        1: {
            key: string,
            id: string,
            value: string,
        },
        2: {
            key: string,
            id: string,
            value: string,
        }
    } 
}

const keySet1: KeySet = {
    name: "keySet1",
    // f() !cmd up down
    0: {0:{key:"f()",id:"switch_1",value:alert},1:{key:"!cmd",id:"switch_2",value:""},2:{key:"&uarr;",id:"up",value:""},3:{key:"&darr;",id:"down",value:""}},

    // ans ^ <= /
    1: {0:{key:"ans",id:"ans",value:"ans"},1:{key:"^",id:"pow",value:"^"},2:{key:"&larr;",id:"del",value:""},3:{key:"&divide;",id:"divide",value:"/"}},

    // 7 8 9 *
    2: {0:{key:"7",id:"seven",value:"7"},1:{key:"8",id:"eight",value:"8"},2:{key:"9",id:"nine",value:"9"},3:{key:"&multiply;",id:"multiply",value:"*"}},

    // 4 5 6 -
    3: {0:{key:"4",id:"four",value:"4"},1:{key:"5",id:"five",value:"5"},2:{key:"6",id:"six",value:"6"},3:{key:"&minus;",id:"minus",value:"-"}},

    // 1 2 3 +
    4: {0:{key:"1",id:"one",value:"1"},1:{key:"2",id:"two",value:"2"},2:{key:"3",id:"three",value:"3"},3:{key:"&plus;",id:"plus",value:"+"}},

    // . 0 =
    5: {0:{key:".",id:"dot",value:"."},1:{key:"0",id:"zero",value:"0"},2:{key:"&equals;",id:"equals",value:""}},
    
}

const keySet2: KeySet = {
    name: "keySet2",
    // f() 123 up down
    0: {0:{key:"123",id:"switch_0",value:""},1:{key:"!cmd",id:"switch_2",value:""},2:{key:"&uarr;",id:"up",value:""},3:{key:"&darr;",id:"down",value:""}},

    // ( ) <= %
    1: {0:{key:"(",id:"lparen",value:"("},1:{key:")",id:"rparen",value:")"},2:{key:"&larr;",id:"del",value:""},3:{key:"%",id:"percent",value:"%"}},

    // sin( ) cos( ) tan( ) ?
    2: {0:{key:"sin()",id:"sin",value:"sin("},1:{key:"cos()",id:"cos",value:"cos("},2:{key:"tan()",id:"tan",value:"tan("},3:{key:"?",id:"-",value:"-"}},

    // asin( ) acos( ) atan( )
    3: {0:{key:"asin()",id:"asin",value:"asin("},1:{key:"acos()",id:"acos",value:"acos("},2:{key:"atan()",id:"atan",value:"atan("},3:{key:"?",id:"-",value:"-"}},

    // sqrt() cbrt() log() =
    4: {0:{key:"sqrt()",id:"sqrt",value:"sqrt("},1:{key:"cbrt()",id:"cbrt",value:"cbrt("},2:{key:"log()",id:"log",value:"log("},3:{key:"&equals;",id:"define",value:""}},

    // pi e =
    5: {0:{key:"pi",id:"pi",value:"pi"},1:{key:"e",id:"e",value:"e"},2:{key:"&equals;",id:"equals",value:""}}
}

const KEYSETS = [
    keySet1,
    keySet2
]

const OPERATORS = {
    plus:{id:"plus",value:"+",key:"&plus;",},
    minus:{id:"minus",value:"-",key:"&minus;",},   
    multiply:{id:"multiply",value:"*",key:"&multiply;",},
    divide:{id:"divide",value:"/",key:"&divide;",},
    pow:{id:"pow",value:"^",key:"^",},
    percent:{id:"percent",value:"%",key:"%",},
    lparen:{id:"lparen",value:"(",key:"(",},
    rparen:{id:"rparen",value:")",key:")",},
    sin:{id:"sin",value:"sin(",key:"sin()",},
    cos:{id:"cos",value:"cos(",key:"cos()",},
    tan:{id:"tan",value:"tan(",key:"tan()",},
    asin:{id:"asin",value:"asin(",key:"asin()",},
    acos:{id:"acos",value:"acos(",key:"acos()",},
    atan:{id:"atan",value:"atan(",key:"atan()",},
    sqrt:{id:"sqrt",value:"sqrt(",key:"sqrt()",},
    cbrt:{id:"cbrt",value:"cbrt(",key:"cbrt()",},
    log:{id:"log",value:"log(",key:"log()",},
    pi:{id:"pi",value:"pi",key:"pi",},
    e:{id:"e",value:"e",key:"e",},
    ans:{id:"ans",value:"ans",key:"ans",},
    equals:{id:"equals",value:"=",key:"&equals;",},
    del:{id:"del",value:"del",key:"&larr;",},
    up:{id:"up",value:"up",key:"&uarr;",},
    down:{id:"down",value:"down",key:"&darr;",},
    func:{id:"func",value:"func",key:"f()",},
    cmd:{id:"cmd",value:"cmd",key:"!cmd",},
    dot:{id:"dot",value:".",key:".",},
    zero:{id:"zero",value:"0",key:"0",},
    one:{id:"one",value:"1",key:"1",},
    two:{id:"two",value:"2",key:"2",},
    three:{id:"three",value:"3",key:"3",},
    four:{id:"four",value:"4",key:"4",},
    five:{id:"five",value:"5",key:"5",},
    six:{id:"six",value:"6",key:"6",},
    seven:{id:"seven",value:"7",key:"7",},
    eight:{id:"eight",value:"8",key:"8",},
    nine:{id:"nine",value:"9",key:"9",},
    define:{id:"define",value:"=",key:"&equals;",},
    abs:{id:"abs",value:"abs(",key:"abs",},
    log10:{id:"log10",value:"log10(",key:"log10",},
    ln:{id:"ln",value:"ln(",key:"ln",},
    exp:{id:"exp",value:"exp(",key:"exp",},
    ceil:{id:"ceil",value:"ceil(",key:"ceil",},
    floor:{id:"floor",value:"floor(",key:"floor",},
    round:{id:"round",value:"round(",key:"round",},
    sinh:{id:"sinh",value:"sinh(",key:"sinh",},
    cosh:{id:"cosh",value:"cosh(",key:"cosh",},
    tanh:{id:"tanh",value:"tanh(",key:"tanh",},
    asinh:{id:"asinh",value:"asinh(",key:"asinh",},
    acosh:{id:"acosh",value:"acosh(",key:"acosh",},
    atanh:{id:"atanh",value:"atanh(",key:"atanh",},
    sign:{id:"sign",value:"sign(",key:"sign",},
    log2:{id:"log2",value:"log2(",key:"log2",},
    log1p:{id:"log1p",value:"log1p(",key:"log1p",},
    expm1:{id:"expm1",value:"expm1(",key:"expm1",},
    erf:{id:"erf",value:"erf(",key:"erf",},
    cube:{id:"cube",value:"cube(",key:"cube",},
    sqr:{id:"sqr",value:"sqr(",key:"sqr",},
    add:{id:"add",value:"add(",key:"add",},
    to:{id:"to",value:"to(",key:"to",},
    
}

export class Keyboard {
    constructor() {
        this.createKeyboards(KEYSETS, document.getElementById("keyboard"));
    }

    createKeyboards(keySets: KeySet[], parent: HTMLElement|null) {
        for (var keySet of keySets) {
            var container = document.createElement("div");
            container.className = "keyboard";
            container.id = keySet.name

            var firstRow = document.createElement("div");
            firstRow.className = "keyboardRowSmall";
            firstRow.appendChild(this.createKey(keySet[0][0]));
            firstRow.appendChild(this.createKey(keySet[0][1]));
            firstRow.appendChild(this.createKey(keySet[0][2]));
            firstRow.appendChild(this.createKey(keySet[0][3]));
            container.appendChild(firstRow);

            var secondRow = document.createElement("div");
            secondRow.className = "keyboardRow";
            secondRow.appendChild(this.createKey(keySet[1][0]));
            secondRow.appendChild(this.createKey(keySet[1][1]));
            secondRow.appendChild(this.createKey(keySet[1][2]));
            secondRow.appendChild(this.createKey(keySet[1][3]));
            container.appendChild(secondRow);

            var thirdRow = document.createElement("div");
            thirdRow.className = "keyboardRow";
            thirdRow.appendChild(this.createKey(keySet[2][0]));
            thirdRow.appendChild(this.createKey(keySet[2][1]));
            thirdRow.appendChild(this.createKey(keySet[2][2]));
            thirdRow.appendChild(this.createKey(keySet[2][3]));
            container.appendChild(thirdRow);

            var fourthRow = document.createElement("div");
            fourthRow.className = "keyboardRow";
            fourthRow.appendChild(this.createKey(keySet[3][0]));
            fourthRow.appendChild(this.createKey(keySet[3][1]));
            fourthRow.appendChild(this.createKey(keySet[3][2]));
            fourthRow.appendChild(this.createKey(keySet[3][3]));
            container.appendChild(fourthRow);

            var fifthRow = document.createElement("div");
            fifthRow.className = "keyboardRow";
            fifthRow.appendChild(this.createKey(keySet[4][0]));
            fifthRow.appendChild(this.createKey(keySet[4][1]));
            fifthRow.appendChild(this.createKey(keySet[4][2]));
            fifthRow.appendChild(this.createKey(keySet[4][3]));
            container.appendChild(fifthRow);

            var sixthRow = document.createElement("div");
            sixthRow.className = "keyboardRow";
            sixthRow.appendChild(this.createKey(keySet[5][0]));
            sixthRow.appendChild(this.createKey(keySet[5][1]));
            sixthRow.appendChild(this.createKey(keySet[5][2]));
            container.appendChild(sixthRow);

            // @ts-ignore
            parent.appendChild(container);
        }
    }

    private createKey(key:any) {
        var keyButton = document.createElement("button");
        keyButton.className = "key";
        keyButton.id = key.id;
        keyButton.innerHTML = key.key;
        keyButton.value = key.value;
        keyButton.addEventListener("click", () => {this.onKeyClick(keyButton)});
        return keyButton;
    }

    onKeyClick(key: HTMLButtonElement) {
        if(key.value == "") {
            this.parseSpecialKeys(key.id)
        } else {
            this.parseKey(key.value)
        }
    }

    parseKey(key: string) {

    }

    parseSpecialKeys(key: string|any) {
        key("test")
        return;
        switch(key) {
            case "equals":
                // equals
        }

    }
    
    private spltSwitchKey() {
        // @DAMcraft ur mom 
    }
}