import React, { useState } from "react";

interface MyCounter {
    child: number;
}

const Counter: React.FC = () => {
    const [state, setState] = useState<MyCounter>({ child: 0 });

    // Increment the count
    const addCounter = () => {
        setState(prevState => ({ child: prevState.child + 1 }));
    };

    // Decrement the count
    const subtractCounter = () => {
        setState(prevState => ({ child: prevState.child - 1 }));
    };

    // Reset the count
    const resetCounter = () => {
        setState({ child: 0 });
    };

    return (
        <div>
            <p>Count: {state.child}</p>
            <button onClick={addCounter}>Increment</button>
            <button onClick={subtractCounter}>Decrement</button>
            <button onClick={resetCounter}>Reset</button>
        </div>
    );
};

export default Counter;