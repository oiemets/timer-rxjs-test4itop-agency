import React from 'react';
import CountersContainer from '../CountersContainer/CountersContainer';
import Counter from '../Counter/Counter';
import ObservablesCounter from '../ObservablesCounter/ObservablesCounter';

function App() {
  return (
    <div>
        <CountersContainer>
            <Counter/>
            <ObservablesCounter/>
        </CountersContainer>
        
    </div>
  );
}

export default App;
