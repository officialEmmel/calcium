interface KeySet {
    name: string;
    0: {
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
    0: {0:{key:"f()",id:"func",value:""},1:{key:"!cmd",id:"cmd",value:""},2:{key:"&uarr;",id:"up",value:""},3:{key:"&darr;",id:"down",value:""}},

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
    0: {0:{key:"f()",id:"func",value:""},1:{key:"123",id:"num",value:""},2:{key:"&uarr;",id:"up",value:""},3:{key:"&darr;",id:"down",value:""}},

    // ( ) <= %
    1: {0:{key:"(",id:"lparen",value:"("},1:{key:")",id:"rparen",value:")"},2:{key:"&larr;",id:"del",value:""},3:{key:"&percent;",id:"percent",value:"%"}},

    // sin( ) cos( ) tan( ) ?
    2: {0:{key:"sin()",id:"sin",value:"sin("},1:{key:"cos()",id:"cos",value:"cos("},2:{key:"tan()",id:"tan",value:"tan("},3:{key:"?",id:"-",value:"-"}},

    // asin( ) acos( ) atan( )
    3: {0:{key:"asin()",id:"asin",value:"asin("},1:{key:"acos()",id:"acos",value:"acos("},2:{key:"atan()",id:"atan",value:"atan("},3:{key:"?",id:"-",value:"-"}},

    // sqrt() cbrt() log() =
    4: {0:{key:"sqrt()",id:"sqrt",value:"sqrt("},1:{key:"cbrt()",id:"cbrt",value:"cbrt("},2:{key:"log()",id:"log",value:"log("},3:{key:"&equals;",id:"define",value:""}},

    // pi e =
    5: {0:{key:"pi",id:"pi",value:"pi"},1:{key:"e",id:"e",value:"e"},2:{key:"&equals;",id:"equals",value:""}}
}


class Keyboard {
    constructor() {

    }

    createKeyboards(keySets: KeySet[], parent: HTMLElement) {
        for (var keySet of keySets) {
            var container = document.createElement("div");
            container.className = "keyboard";
            container.id = keySet.name

            var firstRow = document.createElement("div");
            firstRow.className = "keyboardRowSmall";
            var keyRow = keySet[0];
            for (var i = 0; i < 4; i++) {
                let key = keyRow[i];
                let button = document.createElement("button");
                button.className = "keyboardButton";
                button.id = key.id;
                button.innerHTML = key.key;
                button.value = key.value;
                button.addEventListener("click", this.keyClicked);
            }

        }
    }
}