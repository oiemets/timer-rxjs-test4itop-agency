import React, { useState, useEffect } from 'react';
import styles from './Counter.module.css';



const Counter = () => {
    const [sec, setSec] = useState(0);
    const [min, setMin] = useState(0);
    const [hrs, setHrs] = useState(0);
    const [timerIsOn, setTimerIsOn ] = useState(false);

    const timeView = (t) => {
        return t < 10 ? `0${t}` : t
    }

    const startStopBtnHandler = () => {
        setSec(1);
        setTimerIsOn(!timerIsOn);
        timerIsOn ? resetTimer() : null
    }

    const resetTimer = () => { setSec(0); setMin(0); setHrs(0); setTimerIsOn(false)};

    const resetBtnHandler = () => {
        if (sec !== 0) {
            setSec(0);
            setTimerIsOn(true);
        }
    };

    const timeAdjuster = () => {
        if(sec === 60) {
            setSec(0);
            setMin(min => min + 1);
        } else if (min === 60){
            setMin(0);
            setHrs(hrs => hrs + 1)
        }
    };


    useEffect(() => {

        timeAdjuster();

        let interval = null;

        if(timerIsOn) {
            interval = setInterval(() => setSec(count => count + 1), 1000);
        } else if (!timerIsOn && sec !== 0) {
            clearInterval(interval)
        }
        return () => clearInterval(interval);

    }, [sec, timerIsOn]);



    return (
        <div className={styles.container}>
            <div className={styles.timeView}>{`${timeView(hrs)}:${timeView(min)}:${timeView(sec)}`}</div>
            <div>
                <button onClick={startStopBtnHandler} className={styles.btn}>Start/Stop</button>
                <button onDoubleClick={() => console.log('aa')} className={styles.btn}>Wait</button>
                <button onClick={resetBtnHandler} className={styles.btn}>Reset</button>
            </div>
        </div>
    );
}


export default Counter;