import React, { useRef, useState } from 'react'; // Import useRef untuk menggunakan refs dan useState untuk status
import axios from 'axios'; // Import axios untuk melakukan request HTTP ke API

const UnsplashSearch = () => {
  const queryRef = useRef(null); // Ref untuk merujuk elemen input
  const buttonRef = useRef(null); // Ref untuk merujuk elemen tombol
  const gridRef = useRef(null); // Ref untuk merujuk grid container

  const [photos, setPhotos] = useState([]); // State untuk menyimpan hasil foto dari Unsplash API
  const [loading, setLoading] = useState(false); // State untuk menunjukkan status loading
  const [error, setError] = useState(null); // State untuk menyimpan error jika terjadi kesalahan

  // Fungsi asinkron untuk mencari gambar dari API Unsplash berdasarkan query dari pengguna
  const searchImage = async () => {
    const accessKey = 'CXDMqo-CmxDSOfNdJuKadvlq06uaEijTvWiBd5mM47g'; // API key untuk akses Unsplash API
    const query = queryRef.current.value; // Mengambil nilai dari input menggunakan ref
    const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`; // URL API dengan query pengguna

    setLoading(true); // Set loading menjadi true ketika proses pencarian dimulai
    setError(null); // Reset error sebelum pencarian baru dimulai

    try {
      const response = await axios.get(url); // Request ke Unsplash API menggunakan axios
      setPhotos(response.data.results); // Simpan hasil foto dari response ke state 'photos'
      setLoading(false); // Setelah data diambil, loading diset ke false
      gridRef.current.scrollIntoView({ behavior: 'smooth' }); // Scroll ke hasil gambar
    } catch (error) {
      setError('Error fetching images'); // Jika terjadi error, simpan pesan error
      setLoading(false); // Setelah gagal, loading diset ke false
    }
  };

  // Return JSX untuk merender komponen di layar
  return (
    <div style={styles.container}>
      {/* Judul halaman */}
      <h1 style={styles.title}>Unsplash Image Search</h1>

      {/* Input dan tombol search */}
      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Search for images..." // Placeholder yang ditampilkan di input
          ref={queryRef} // Gunakan ref untuk mengakses input
          style={styles.input} // Gaya CSS untuk input
        />
        {/* Tombol untuk memulai pencarian gambar */}
        <button onClick={searchImage} ref={buttonRef} style={styles.button}>Search</button>
      </div>

      {/* Jika status loading true, tampilkan teks 'Loading...' */}
      {loading && <p style={styles.loading}>Loading...</p>}
      {/* Jika ada error, tampilkan pesan error */}
      {error && <p style={styles.error}>{error}</p>}

      {/* Menampilkan grid gambar hasil pencarian */}
      <div ref={gridRef} style={styles.grid}>
        {/* Iterasi setiap foto dalam state 'photos' untuk ditampilkan di dalam grid */}
        {photos.map((photo) => (
          <div key={photo.id} style={styles.photoCard}>
            {/* Gambar yang diambil dari API Unsplash */}
            <img
              src={photo.urls.small} // URL gambar kecil dari Unsplash
              alt={photo.alt_description} // Deskripsi alternatif untuk gambar
              style={styles.image} // Gaya CSS untuk gambar
            />
            {/* Caption yang menampilkan nama fotografer */}
            <p style={styles.caption}>Photo by {photo.user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Gaya CSS dalam objek JavaScript yang diterapkan langsung ke elemen
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif', // Font default untuk halaman
    textAlign: 'center', // Teks diatur agar berada di tengah halaman
    padding: '20px', // Padding agar konten tidak menempel pada tepi
    backgroundColor: '#f9f9f9', // Warna latar belakang yang lembut
    minHeight: '100vh', // Tinggi minimum halaman adalah 100% dari viewport (layar penuh)
  },
  title: {
    fontSize: '2rem', // Ukuran font untuk judul
    color: '#333', // Warna teks judul (abu-abu gelap)
    marginBottom: '20px', // Jarak bawah dari judul ke elemen berikutnya
  },
  searchBox: {
    marginBottom: '20px', // Jarak bawah antara input dan tombol ke elemen lain
  },
  input: {
    padding: '10px', // Padding dalam input text
    width: '300px', // Lebar input text
    borderRadius: '5px', // Membulatkan tepi input text
    border: '1px solid #ddd', // Border tipis berwarna abu-abu terang
    fontSize: '16px', // Ukuran font pada input text
    outline: 'none', // Menghilangkan garis fokus default saat input aktif
  },
  button: {
    padding: '10px 20px', // Padding di dalam tombol (atas-bawah dan kanan-kiri)
    marginLeft: '10px', // Jarak kiri antara tombol dengan input
    borderRadius: '5px', // Membulatkan tepi tombol
    backgroundColor: '#007bff', // Warna latar belakang tombol (biru)
    color: '#fff', // Warna teks pada tombol (putih)
    border: 'none', // Menghilangkan border tombol default
    cursor: 'pointer', // Kursor akan berubah menjadi pointer saat berada di atas tombol
    fontSize: '16px', // Ukuran font pada tombol
  },
  grid: {
    display: 'grid', // Menggunakan grid layout untuk menampilkan gambar
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', // Grid responsif dengan kolom fleksibel
    gap: '20px', // Jarak antar elemen di grid
    padding: '20px', // Padding di dalam grid container
  },
  photoCard: {
    borderRadius: '10px', // Membulatkan tepi container gambar
    overflow: 'hidden', // Menyembunyikan elemen yang keluar dari border
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Bayangan lembut di sekitar card
    backgroundColor: '#fff', // Warna latar belakang container gambar
  },
  image: {
    width: '250px',  // Ukuran lebar tetap untuk gambar
    height: '250px', // Ukuran tinggi tetap untuk gambar
    objectFit: 'cover',  // Gambar akan memenuhi container tanpa terdistorsi
    display: 'block',  // Menghilangkan jarak bawaan gambar (inline-block)
  },
  caption: {
    padding: '10px', // Padding di sekitar teks caption
    fontSize: '14px', // Ukuran font caption
    color: '#555', // Warna teks caption (abu-abu sedang)
  },
  loading: {
    fontSize: '18px', // Ukuran teks untuk loading
    color: '#333', // Warna teks loading (abu-abu gelap)
  },
  error: {
    color: 'red', // Warna teks error
  },
};

export default UnsplashSearch; // Ekspor komponen UnsplashSearch agar bisa digunakan di bagian lain aplikasi
