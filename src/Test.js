import React, {useState, useEffect} from 'react';
import "./ResetBrowser.css";
import "./Test.css";
import {draw_rect_signal, draw_JK} from "./draw_functions.js";
import {jk_array} from "./jk.js";
import {JK_now} from "./generator.js";

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
        let size = 660; // регулирует масштаб выводимых сигналов
        let cnv = document.querySelector("#cnv");
        cnv.width = cnv.parentNode.offsetWidth;
        cnv.height = cnv.parentNode.offsetHeight;
        let ctx = cnv.getContext("2d");
        for (let i in JK_now.order) {
            let sig = JK_now.order[i];
            if (sig === JK_now.pass_in) {
                ctx.fillText(JK_now.pass_val + " ->", 660.5, 50.5 + i*35)
                continue;
            }
            if (sig === "C") ctx.strokeStyle = "#fff";
            let add_c = sig === "C"? size/19:0;
            draw_rect_signal(ctx, 30.5 - add_c/2, 50.5 + i*35, size + add_c, 10, JK_now["signal_" + sig.toLowerCase()]);
            ctx.strokeStyle = "#000";

        }
        ctx.clearRect(0, 0, 30, 200);
        ctx.clearRect(30.5 + size, 0, 50, 200);
        draw_JK(ctx, size + 50.5, 10.5, 80, 200, 10, [JK_now.inv_S, JK_now.inv_C, JK_now.inv_R], JK_now.order);
        ctx.beginPath(); // drawing dots
        for (let i = 0; i < 19; i++) {
            ctx.arc(30.5 + (i + 1) * size/19 - size/19/4, 40.5, 2, 0, Math.PI * 2);
        }
        ctx.fill();
        ctx.beginPath(); // drawing dashed lines
        ctx.setLineDash([3, 2]);
        for (let i = 15; i > 0; i -= 4) {
            ctx.moveTo(30.5 + i * size/19 + size/19/4, 38.5);
            ctx.lineTo(30.5 + i * size/19 + size/19/4, 208.5)
        }
        ctx.strokeStyle = "#0004";
        ctx.stroke();
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

                            <canvas id="cnv" ></canvas>

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
                            {parseInt(jk_array(JK_now.signal_j, JK_now.signal_k, JK_now.signal_r, JK_now.signal_s, JK_now.signal_c, JK_now.q, {"inv_r": JK_now.inv_R, "inv_c": JK_now.inv_C, "inv_s": JK_now.inv_S}).join(""), 2).toString(16)}
                        </div>
                    </div>
                    <div className="App-main-content-description">
                        <b>Задание: </b> JK-триггер, сигналы, как показано на картинке. В начальный момент <b>q={1 * JK_now.q}</b>. Определить q для всех моментов, обозначенных точкой. Записать в шестнадцатеричном виде.
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
            <input type="number" value={variant} onChange={changeVariant} min="1"/>
        </label>
        <input type="submit" value="Да!"/>
    </form>
);

const Signal = ({value}) => (
    <div className="Signal">{value}</div>
);

export default Test;
