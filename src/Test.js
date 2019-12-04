import React, {useState, useEffect} from 'react';
import "./ResetBrowser.css";
import "./Test.css";
import {draw_rect_signal, draw_JK} from "./draw_functions.js";
import {jk_array} from "./jk.js";
import {JK_now} from "./generator.js";

const Test = () => {
    const [value, setValue] = useState("");
    const [answer, setAnswer] = useState("");
    const [variant, setVariant] = useState("2");
    const [variantMessage, setVariantMessage] = useState("");

    JK_now.generate(variant);

    const changeVariant = e => {
        if (e.target.value.length < 16) {
            JK_now.generate(e.target.value);
            setVariant(e.target.value);
            setAnswer(parseInt(jk_array(JK_now.signal_j, JK_now.signal_k, JK_now.signal_r, JK_now.signal_s, JK_now.signal_c, JK_now.q, {"inv_r": JK_now.inv_R, "inv_c": JK_now.inv_C, "inv_s": JK_now.inv_S}).join(""), 2).toString(16));
            console.log(parseInt(jk_array(JK_now.signal_j, JK_now.signal_k, JK_now.signal_r, JK_now.signal_s, JK_now.signal_c, JK_now.q, {"inv_r": JK_now.inv_R, "inv_c": JK_now.inv_C, "inv_s": JK_now.inv_S}).join(""), 2).toString(16));
        }
    };

    const changeValue = e => {
        if (e.target.value.length < 7) setValue(e.target.value);
    };
    const submitAnswer = e => {
        answer == value ? setVariantMessage("ВЕРНО!") : setVariantMessage("УВЫ!");
    };

    useEffect(() => {
        let cnv = document.querySelector("#cnv");
        cnv.width = cnv.parentNode.offsetWidth;
        cnv.height = cnv.parentNode.offsetHeight;
        let ctx = cnv.getContext("2d");
        let size = cnv.width * 0.825; // регулирует масштаб выводимых сигналов
        for (let i in JK_now.order) {
            let sig = JK_now.order[i];
            if (i * 1 === 0) {
                ctx.fillText(JK_now["inv_" + sig] * 1 + " ->", size + 10, 35.5 + i*35)
                continue;
            }
            if (sig === "C") ctx.strokeStyle = "#fff";
            let add_c = sig === "C"? size/19:0;
            draw_rect_signal(ctx, 30.5 - add_c/2, 33.5 + i*40, size + add_c, 10, JK_now["signal_" + sig.toLowerCase()]);
            ctx.strokeStyle = "#000";

        }
        ctx.clearRect(0, 0, 30, 200);
        ctx.clearRect(30.5 + size, 0, 50, 200);
        draw_JK(ctx, size + 50.5, 10.5, 80, 200, 10, [JK_now.inv_S, JK_now.inv_C, JK_now.inv_R], JK_now.order);
        ctx.beginPath(); // drawing dots
        for (let i = 0; i < 19; i++) {
            let cx = 30.5 + (i + 1) * size/19 - size/19/4;
            let y1 =  60.5,
                y2 = 212.5,
                yT = 50.5;
            ctx.moveTo(cx, y1);
            ctx.arc(cx, y1, 2, 0, Math.PI * 2);
            ctx.moveTo(cx, y2)
            ctx.arc(cx, y2, 2, 0, Math.PI * 2);
            ctx.fillText("ABCDEFGHIJKLMNOPQRS"[i], cx, yT);
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
        setAnswer(parseInt(jk_array(JK_now.signal_j, JK_now.signal_k, JK_now.signal_r, JK_now.signal_s, JK_now.signal_c, JK_now.q, {"inv_r": JK_now.inv_R, "inv_c": JK_now.inv_C, "inv_s": JK_now.inv_S}).join(""), 2).toString(16));
   });

    return (
        <div className="App">
            <div className="App-header">
                JK26.3
            </div>
            <div className="App-main">
                <div className="App-main-leftside"></div>
                <div className="App-main-content">
                    <div className="App-main-content-data">
                        <div className="App-main-content-signal">

                            <canvas id="cnv" ></canvas>

                        </div>
                    </div>

                    <div className="App-main-content-variant">
                        <div className="Variant">
                            <VariantForm
                                variant={variant}
                                changeVariant={changeVariant}
                            />
                        </div>
                        <div className="Answer">
                           <AnswerForm
                               answer={answer}
                               changeValue={changeValue}
                               value={value}
                               submitAnswer={submitAnswer}
                               />
                        </div>
                        <div className="VariantMessage">
                            <p>{variantMessage}</p>
                        </div>
                    </div>
                    <div className="App-main-content-description">

                        <p>В отмеченные моменты времени найдите 19 значений на выходе JK триггера при заданных временных диаграммах на входах C,J,K и R. Начальное значение Q&nbsp;=&nbsp;{JK_now.q * 1}. Ответ дайте в HEX коде.</p>
                        <p>Пример ответа: 9DB94. Обратите внимание на тип входов S,R,C.</p>
                    </div>
                </div>
                <div className="App-main-rightside"></div>
            </div>
        </div>
    );
};

const VariantForm = ({variant, changeVariant}) => (
    <div className="VariantContent">
       <div><b>ВВЕДИ ВАРИАНТ!</b></div>
        <input type="number" value={variant} onChange={changeVariant} min="1"/>
    </div>
);

const AnswerForm = ({answer, value, changeValue, submitAnswer}) => {
    return (
        <div className="AnswerForm">
            <input type="text" value={value} onChange={changeValue} placeholder="Каков ответ?"/>
            <button onClick={submitAnswer}> Давай! </button>
        </div>
    );
}

const Signal = ({value}) => (
    <div className="Signal">{value}</div>
);

export default Test;
