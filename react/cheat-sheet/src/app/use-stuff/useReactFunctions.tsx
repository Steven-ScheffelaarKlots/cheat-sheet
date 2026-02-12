"use client";

import React, { useMemo, useState, useEffect, useContext, createContext, useReducer } from 'react';

import { UseStuffService } from './useStuffService';

// Create a context
const MyContext = createContext({ value: 0 });

const UseReactFunctions: React.FC = () => {
    // useState to manage local state
    const [count, setCount] = useState(0);

    const [multipliedCount, setMultipliedCount] = useState<number | undefined>(undefined);

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

    useEffect(() => {
    (async () => {
        try {
            const result = await UseStuffService.submitNumber(count);
           console.log(result);
           setMultipliedCount(result.result)
        } catch (err) {
            console.error(err);
        }
    })();
    }, [count]);

    // useReducer - Alternative to useState for complex state logic
    // Define action types
    type CounterAction = 
        | { type: 'increment' }
        | { type: 'decrement' }
        | { type: 'reset' }
        | { type: 'incrementByAmount'; payload: number };

    // Define the reducer function
    const counterReducer = (state: number, action: CounterAction): number => {
        switch (action.type) {
            case 'increment':
                return state + 1;
            case 'decrement':
                return state - 1;
            case 'reset':
                return 0;
            case 'incrementByAmount':
                return state + action.payload;
            default:
                return state;
        }
    };

    // Use the reducer
    const [reducerCount, dispatch] = useReducer(counterReducer, 0);

    return (
        <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
            <h2>React Hooks Examples</h2>
            
            {/* useState Example */}
            <section style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
                <h3>useState Example</h3>
                <p>Count: {count}</p>
                <p>Memoized Value (count × 2): {memoizedValue}</p>
                <p>Multiplied Value (from API): {multipliedCount}</p>
                <p>Context Value: {contextValue.value}</p>
                <button 
                    onClick={() => setCount(count + 1)}
                    style={{ padding: '8px 16px', cursor: 'pointer' }}
                >
                    Increment
                </button>
            </section>

            {/* useReducer Example */}
            <section style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
                <h3>useReducer Example</h3>
                <p>Counter: {reducerCount}</p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <button 
                        onClick={() => dispatch({ type: 'increment' })}
                        style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}
                    >
                        Increment
                    </button>
                    <button 
                        onClick={() => dispatch({ type: 'decrement' })}
                        style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px' }}
                    >
                        Decrement
                    </button>
                    <button 
                        onClick={() => dispatch({ type: 'incrementByAmount', payload: 5 })}
                        style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '4px' }}
                    >
                        +5
                    </button>
                    <button 
                        onClick={() => dispatch({ type: 'reset' })}
                        style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#9E9E9E', color: 'white', border: 'none', borderRadius: '4px' }}
                    >
                        Reset
                    </button>
                </div>
                <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px', fontSize: '14px' }}>
                    <strong>How useReducer works:</strong>
                    <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                        <li>Define a reducer function that takes (state, action) and returns new state</li>
                        <li>Call useReducer with reducer function and initial state</li>
                        <li>Use dispatch to send actions to the reducer</li>
                        <li>Useful for complex state logic or when next state depends on previous state</li>
                    </ul>
                </div>
            </section>
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