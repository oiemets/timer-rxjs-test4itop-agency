import React from 'react';
import styles from './ObservablesStopWatch.module.css';
import useObservable from '../../lib/useObservable';
import { Subject, merge, NEVER, timer } from 'rxjs';
import { filter, startWith, scan, tap, switchMap, withLatestFrom, mapTo, shareReplay } from 'rxjs/operators';

import countToTimeConverter from '../../lib/countToTimeConverter';
import pluckState from '../../lib/pluckState';
import doubleClick from '../../lib/doubleClick';


const actions$ = new Subject();
const reset$ = actions$.pipe(filter(action => action === 'reset'), mapTo({ count: 0, running: true }));
const wait$ = actions$.pipe(filter(action => action === 'wait'), doubleClick, mapTo({ running: false }));

const events$ = merge (reset$, wait$, actions$.asObservable());

const state$ = events$.pipe(
    startWith({ count: 0, running: false }),
    scan((state, update) => ({ ...state, ...update })),
    shareReplay(1)
);

const running$ = state$.pipe(pluckState('running'));
const count$ = state$.pipe(pluckState('count'));
const intervalRunning$ = running$.pipe(switchMap(running => running ? timer(0, 1000) : NEVER));
const startStop$ = actions$.pipe(
    filter(action => action === 'startStop'),
    withLatestFrom(running$, (_, running) => running),
    tap(isRunning => {
        const isRunningOn = isRunning === true;

        if(isRunningOn) {
            return actions$.next({ count: 0, running: !isRunning })
        }
        return actions$.next({ running: !isRunning })
    })
);

const countUp$ = intervalRunning$.pipe(
    withLatestFrom(count$, (_, count) => count),
    tap(countState => actions$.next({ count: ++countState }))
);


const subscribeStuff$ = merge(startStop$, countUp$, state$);
const mainStream$ = subscribeStuff$.pipe(
    scan((state, update) => ({ ...state, ...update }))
)


const ObservablesStopWatch = () => {
    const state = useObservable(mainStream$);
    const countView = state ? countToTimeConverter(state.count) : countToTimeConverter(0);

    return (
        <div className={styles.container}>
            <div className={styles.count}>{countView}</div>
            <button onClick={() => actions$.next('startStop')} className={`${styles.btn} ${styles.bouncy}`} style={{animationDelay: '0.07s'}}>
                {state ? state.running ? 'stop' : 'start' : 'start'}
            </button>
            <button onClick={() => actions$.next('wait')} className={`${styles.btn} ${styles.bouncy}`} style={{animationDelay: '0.14s'}}>wait</button>
            <button onClick={() => actions$.next('reset')} className={`${styles.btn} ${styles.bouncy}`} style={{animationDelay: '0.21s'}}>reset</button>

        </div>
    );
}


export default ObservablesStopWatch;