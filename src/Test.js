import React, {useState, useEffect} from 'react';
import "./ResetBrowser.css";
import "./Test.css";
import {draw_rect_signal, draw_JK} from "./draw_functions.js";
import {jk_array} from "./jk.js";

class JK_Trigger {
    constructor() {
        this.signal_c = "";
        this.signal_j = "";
        this.signal_k = "";
        this.signal_r = "";
        this.signal_s = "";
        this.inv_C = true;
        this.inv_R = true;
        this.inv_S = true;
        this.order = "RCJKS";
        this.q = true;
        this.pass_in = "R";
        this.pass_val = 0;
    }

    generate(variant) {
        this.signal_c = Rand_of_var(variant + 0 ** 2, 20);
        this.signal_j = Rand_of_var(variant + 1 ** 2);
        this.signal_k = Rand_of_var(variant + 2 ** 2);
        this.signal_r = Rand_of_var(variant + 3 ** 2);
        this.signal_s = Rand_of_var(variant + 4 ** 2);

        let pos = ["C", "J", "K"];
        this.order = "" + (("1" === Rand_of_var(variant + 11 ** 2, 1)) ? "R" : "S");
        let tmp = Number(Rand_of_var3(variant + 12 ** 2,1));
        this.order += pos[tmp];
        pos.slice(tmp,1);
        tmp = Number(Rand_of_var(variant + 13 ** 2,1));
        this.order += pos[tmp];
        pos.slice(tmp,1);
        this.order += pos[0];
        this.order += (("0" === Rand_of_var(variant + 11 ** 2, 1)) ? "R" : "S");


        this.inv_C = "1" === Rand_of_var(variant + 5 ** 2, 1);
        this.inv_R = "1" === Rand_of_var(variant + 6 ** 2, 1);
        this.inv_S = "1" === Rand_of_var(variant + 7 ** 2, 1);
        this.q = "1" === Rand_of_var(variant + 8 ** 2, 1);
        this.pass_in = ("1" === Rand_of_var(variant + 9 ** 2, 1)) ? "R" : "S";
        this.pass_val = Rand_of_var(variant + 10 ** 2, 1);
    }


}

/**
 * @return {string}
 */
function Rand_of_var(variant, symbols = 19) {
    let a = 0;
    let signal = "";
    for (let i = 0; i < symbols; i++) {
        a += variant + i;
        a = Math.abs(Math.sin(a)) * 10000;
        signal += Math.floor(a) % 2 + "";
    }
    return signal;
}
/**
 * @return {string}
 */
function Rand_of_var3(variant, symbols = 19) {
    let a = 0;
    let signal = "";
    for (let i = 0; i < symbols; i++) {
        a += variant + i;
        a = Math.abs(Math.sin(a)) * 10000;
        signal += Math.floor(a) % 3 + "";
    }
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

var JK_now = new JK_Trigger();
const Test = () => {
    const [variant, setVariant] = useState("2");


    JK_now.generate(variant);

    const submitVariant = e => {

        alert(variant);
        JK_now.generate(variant);
        e.preventDefault();
    };

    const changeVariant = e => {
        JK_now.generate(e.target.value);
        setVariant(e.target.value);
        
    };

    useEffect(() => {
        var cnv = document.querySelector("#cnv");
        cnv.width = cnv.parentNode.offsetWidth;
        cnv.height = cnv.parentNode.offsetHeight;
        let ctx = cnv.getContext("2d");
        for (let i in JK_now.order) {
            let sig = JK_now.order[i];
            if (sig === JK_now.pass_in) continue;
            draw_rect_signal(ctx, 30.5 - (sig === "C"? 10:0), 50.5 + i*30, 640, 10, JK_now["signal_" + sig.toLowerCase()]);
        }
        draw_JK(ctx, 690.5, 20.5, 80, 200, 10, [JK_now.inv_S, JK_now.inv_C, JK_now.inv_R], JK_now.order);
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

                            {/*<Signal value={JK_now.signal_c}/>
                            <Signal value={JK_now.signal_j}/>
                            <Signal value={JK_now.signal_k}/>
                            <Signal value={JK_now.signal_r}/>*/}

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
            <input type="text" value={variant} onChange={changeVariant}/>
        </label>
        <input type="submit" value="Да!"/>
    </form>
);

const Signal = ({value}) => (
    <div className="Signal">{value}</div>
);

export default Test;
