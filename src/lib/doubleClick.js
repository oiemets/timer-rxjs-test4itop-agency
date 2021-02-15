import { filter, buffer, debounceTime, map } from 'rxjs/operators';

const doubleClick = (delay = 300) => (eventAmount = 1) => (source$) => {
    return source$.pipe(
        buffer(source$.pipe(debounceTime(delay))),
        map(a => a.length),
        filter(x => x === eventAmount),
    )
}

export default doubleClick(300)(2);