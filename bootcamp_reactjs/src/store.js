import { createStore } from 'redux';

// Initial state
const initialState = {
  count: 0,  // Nilai awal count adalah 0
};

// Reducer (fungsi yang menangani perubahan state berdasarkan action)
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1,  // Tambah count 1
      };
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1,  // Kurangi count 1
      };
      case 'RESET':
        return { count: 0 };  // Mengatur ulang count ke 0
    default:
      return state;  // Jika action tidak dikenali, kembalikan state yang ada
  }
};

// Create store
const store = createStore(counterReducer);

export default store;

