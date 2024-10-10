import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from './actions'; // Import action reset

const Counter = () => {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  return (
    <div style={{ textAlign: 'center', marginTop: 'auto' }}>
      <h1>Counter: {count}</h1>
      
      <button
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          marginRight: '10px',
        }}
        onClick={() => dispatch(increment())}
      >
        tambah
      </button>
      
      <button
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          marginRight: '10px',
        }}
        onClick={() => dispatch(decrement())}
      >
        kurang
      </button>
      
      <button
        style={{
          padding: '10px 20px',
          fontSize: '16px',
        }}
        onClick={() => dispatch(reset())}  // Dispatch action reset
      >
        Reset
      </button>
    </div>
  );
};

export default Counter;
