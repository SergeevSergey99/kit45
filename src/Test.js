import React, { useState, useEffect } from 'react';
import "./ResetBrowser.css";
import "./Test.css";
import {draw_rect_signal} from "./draw_functions.js";

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
        var cnv = document.querySelector("#cnv");
        cnv.width = cnv.width;
        let ctx = cnv.getContext("2d");
        draw_rect_signal(ctx, 20.5, 20.5, 320, 10, Rand_of_var(variant + 0**2));
        draw_rect_signal(ctx, 20.5, 50, 320, 10, Rand_of_var(variant + 1**2));
        ctx.fillText(variant, 40, 70);
        e.preventDefault();
    };

    const changeVariant = e => {
        setVariant(e.target.value);
        
    };
    
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
