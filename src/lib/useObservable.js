import { useState, useEffect } from 'react';


const useObservable = (observable, init) => {
    const [state, setState] = useState(init);
    useEffect(() => {
        const subscription = observable.subscribe(setState);
        return () => subscription.unsubscribe();
    }, [observable])
    return state
};



export default useObservable;