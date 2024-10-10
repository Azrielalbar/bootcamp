import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';



//membuat referensi
const el= document.getElementById("root");
//ambil aksen elemen
const root = ReactDOM.createRoot(el);

root.render(<App/>);




