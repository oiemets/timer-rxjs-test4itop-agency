import { distinctUntilChanged, pluck } from 'rxjs/operators';

const pluckState = (name) => (source$) => source$.pipe(pluck(name), distinctUntilChanged());

export default pluckState;