import React from 'react';
import { Provider } from 'react-redux';  // Provider untuk menyambungkan Redux ke React
import store from './store';  // Import store Redux
import Counter from './counter';  // Import komponen Counter


const Home = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <p>Welcome to the Home Page!</p>
            <Provider store={store}>
      {/* Semua komponen dalam Provider bisa mengakses Redux store */}
      <Counter />
    </Provider>
        </div>
    );
};

export default Home;