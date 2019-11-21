//import React, { useState, useEffect } from 'react';
import "./ResetBrowser.css";
import "./Test.css";

let a = 0;
/**
 * @return {string}
 */
function Rand_of_var(variant) {
    let signal = "";
    for (let i = 0; i < 16; i++)
        signal += sfc32(variant + i) % 2 + "";
    a = 0;
    return signal;
}
function sfc32(_a) {
    a +=_a;
    a = Math.abs(Math.sin(a)) * 10000;
    return Math.floor(a);
}
/*
function JCreg() {
    return;
}*/
var v = 0;
const Test = () => {

    return (
        <div className="App">
            <div className="App-header">
                Шапка
            </div>
            <div className="App-main">
               <div className="App-main-leftside">Лево</div>
                <div className="App-main-content">
                    <div className="App-main-content-signal">
                        <div className="Signal">{Rand_of_var(v)}</div>
                        <div className="Signal">{v}</div>
                        <div className="Signal">Сигнал 3</div>
                    </div>
                </div>
                <div className="App-main-rightside">Право</div>
            </div>
        </div>
    );
};
export default Test;
