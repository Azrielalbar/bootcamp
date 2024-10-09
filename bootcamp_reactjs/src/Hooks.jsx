import React, { useState } from "react";

export default function ColourCheck() {
    // State untuk menyimpan warna (tidak digunakan dalam komponen ini, tetapi tetap diatur)
    const [colour, setColour] = useState("red");

    // State untuk menyimpan detail mobil
    const [car, setCar] = useState({
        brand: "toyota",  // Merek mobil
        model: "avanza",  // Model mobil
        colour: "silver", // Warna mobil
        year: 2005        // Tahun pembuatan mobil
    });

    // Fungsi untuk memperbarui warna mobil
    const UpdateColour = () => {
        setCar(previousState => {
            return {
                ...previousState, // Menjaga properti lain tetap sama
                colour: "blue"    // Mengubah warna menjadi biru
            };
        });
    };

    return (
        <div>
            {/* Menampilkan detail mobil */}
            <h1>My favorite car is {car.brand} {car.model}! It is a {car.colour} car from {car.year}.</h1>
            
            {/* Tombol untuk mengubah warna mobil */}
            <button type="button" onClick={UpdateColour}>Change Colour</button>

            <h1> My favorite color is {colour} !!!!!!!</h1>
            <button onClick={() => setColour("blue")}>Blue</button>
            <button onClick={() => setColour("red")}>Red</button>
            <button onClick={() => setColour("green")}>Green</button>

        </div>
    );
}
