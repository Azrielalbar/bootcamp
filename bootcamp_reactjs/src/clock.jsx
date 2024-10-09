import React, { useState, useEffect } from "react"; // Mengimpor useState dan useEffect dari React

const Clock = () => {
  // Menggunakan state untuk menyimpan waktu saat ini
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  // useEffect untuk menangani efek samping (mengatur timer)
  useEffect(() => {
    // Membuat interval yang memperbarui state 'time' setiap 1 detik
    const timerID = setInterval(() => {
      setTime(new Date().toLocaleTimeString()); // Memperbarui state 'time' dengan waktu terbaru
    }, 1000);

    // Cleanup function untuk membersihkan interval saat komponen di-unmount
    return () => {
      clearInterval(timerID); // Membersihkan interval untuk menghindari memory leak
    };
  }, []); // Dependency array kosong berarti efek ini hanya dijalankan sekali setelah komponen mount

  // Render tampilan jam
  return (
    <div style={styles.clockContainer}>
      <h2>{time}</h2> {/* Menampilkan waktu saat ini */}
    </div>
  );
};

// CSS inline untuk mengatur posisi dan gaya tampilan jam
const styles = {
  clockContainer: {
    position: "absolute", // Posisi absolut pada layar
    top: "5px", // Sesuaikan dengan tinggi navbar Anda
    right: "0px", // Diatur agar berada di sisi kanan layar
    color: "white", // Warna teks putih
    padding: "10px", // Memberikan padding untuk tampilan yang rapi
    borderRadius: "5px", // Membuat sudut container menjadi melengkung
  },
};



export default Clock; // Mengekspor komponen Clock agar bisa digunakan di file lain
