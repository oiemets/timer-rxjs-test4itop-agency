import React, { useState, useEffect  } from 'react';
import { interval, Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

const action = new Subject();
const wait = action.pipe(filter(action => action === 'wait'));
// const start = action.pipe(filter(action => action === 'start'));

const ObservablesCounter = () => {
    const [sec, setSec] = useState(0);
    const [run, setRun] = useState(false);
    const [waitIsOn, setWait] = useState(false);

    const secSetter = (v) => {
        v === 1;
        return setSec(sec + v);
    }

    const intervalObservable = interval(1000).pipe(
        takeUntil(wait)
    );

    const toggler = () => setRun(!run);

    useEffect(() => {
        if(run) {
            let subscription = intervalObservable.subscribe(s => secSetter(s));
            return () => subscription.unsubscribe();
        } else if(waitIsOn) {
            setSec(sec);
            setWait(false);
        }
        setSec(0);

    }, [run]);


    return (
        <div>
            <div>{sec}</div>
            <button onClick={toggler}>Start/Stop</button>
            <button onClick={() => {action.next('wait'); setWait(true)}}>Wait</button>
            <button>Reset</button>
        </div>
    );
}


export default ObservablesCounter;