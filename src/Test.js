import React, { useState, useEffect } from 'react';
import "./ResetBrowser.css";
import "./Test.css";

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
        alert(variant);
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
                            <Signal value={Rand_of_var(variant + 0**2)}/>
                            <Signal value={Rand_of_var(variant + 1**2)}/>
                            <Signal value={Rand_of_var(variant + 2**2)}/>
                            <Signal value={Rand_of_var(variant + 3**2)}/>
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
