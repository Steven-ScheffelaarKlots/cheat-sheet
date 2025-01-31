import React, { useMemo, useState, useEffect, useContext, createContext } from 'react';

// Create a context
const MyContext = createContext({ value: 0 });

const UseReactFunctions: React.FC = () => {
    // useState to manage local state
    const [count, setCount] = useState(0);

    // useContext to consume context value
    const contextValue = useContext(MyContext);

    // useMemo to memoize a computed value
    const memoizedValue = useMemo(() => {
        return count * 2;
    }, [count]);

    // useEffect to perform side effects
    // The first argument is a function that will be called when the component mounts
    // Since the second arguement is a value, useEffect will run every time the value changes
    // If the second argument was an empty array, the effect will only run once when the component mounts
    useEffect(() => {
        console.log('Component mounted or count changed:', count);
        return () => {
            console.log('Cleanup on unmount or before count changes');
        };
    }, [count]);

    

    return (
        <div>
            <p>Count: {count}</p>
            <p>Memoized Value: {memoizedValue}</p>
            <p>Context Value: {contextValue.value}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
};

// Example of providing context value
const App: React.FC = () => {
    return (
        <MyContext.Provider value={{ value: 42 }}>
            <UseReactFunctions />
        </MyContext.Provider>
    );
};

export default App;