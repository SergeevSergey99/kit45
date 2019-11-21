import React, { useState, useEffect } from 'react';
import "./ResetBrowser.css";
import "./Test.css";


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
                        <div className="Signal">Сигнал 1</div>
                        <div className="Signal">Сигнал 2</div>
                        <div className="Signal">Сигнал 3</div>
                    </div>
                </div>
                <div className="App-main-rightside">Право</div>
            </div>
        </div>
    );
};

export default Test;
