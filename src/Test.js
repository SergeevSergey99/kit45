import React, { useState, useEffect } from 'react';
import "./ResetBrowser.css";
import "./Test.css";
import {draw_rect_signal, draw_JK} from "./draw_functions.js";
import {jk_array} from "./jk.js";

function Rand_of_var(variant) {
    let a = 0;
    let signal = "";
    for (let i = 0; i < 16; i++) {
        a += variant + i;
        a = Math.abs(Math.sin(a)) * 10000;
        signal += Math.floor(a) % 2 + "";
    }
    a = 0;
    return signal;
}

/*function sfc32(_a) {
    a +=_a;
    a = Math.abs(Math.sin(a)) * 10000;
    return Math.floor(a);
}*/
/*
function JCreg() {
    return;
}*/

const Test = () => {
    const [variant, setVariant] = useState("2");

    const submitVariant = e => {
        e.preventDefault();
    };

    const changeVariant = e => {
        setVariant(e.target.value);
        
    };

    useEffect(() => {
        var cnv = document.querySelector("#cnv");
        cnv.width = cnv.parentNode.offsetWidth;
        cnv.height = cnv.parentNode.offsetHeight;
        let ctx = cnv.getContext("2d");
        for (var i = 0; i < 4; i++) {
            draw_rect_signal(ctx, 20.5, 20.5 + i * 30, 640, 10, Rand_of_var(variant + i**2)); 
        }
        draw_JK(ctx, 690.5, 20.5, 80, 200, 10, [true, false, true]);
    });
    
    return (
        <div className="App">
            <div className="App-header">
                Шапка
            </div>
            <div className="App-main">
               <div className="App-main-leftside">Лево</div>
                <div className="App-main-content">
                   <div className="App-main-content-data">
                        <div className="App-main-content-signal">
                            <canvas id="cnv" width={600} height={600} ></canvas>
                        </div>
                        <div className="Scheme">

                        </div>
                   </div>

                    <div className="App-main-content-variant">
                        <div className="Variant">
                           <VariantForm
                               variant={variant}
                               submitVariant={submitVariant}
                               changeVariant={changeVariant}
                           />
                        </div>
                        <div className="Answer">

                        </div>
                    </div>
                    <div className="App-main-content-description">
                        Задание
                    </div>
                </div>
                <div className="App-main-rightside">Право</div>
            </div>
        </div>
    );
};

const VariantForm = ({variant, submitVariant, changeVariant}) => (
    <form onSubmit={submitVariant}>
        <label>
            <input type="text" value={variant} onChange={changeVariant} />
        </label>
        <input type="submit" value="Да!" />
    </form>
);

const Signal = ({value}) => (
    <div className="Signal">{value}</div>
);

export default Test;
