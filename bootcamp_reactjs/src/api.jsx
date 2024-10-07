import React, { useState } from 'react'; // Import React dan useState untuk membuat state dan komponen
import axios from 'axios'; // Import axios untuk melakukan request HTTP ke API

const UnsplashSearch = () => {
  // State untuk menyimpan query dari input, foto yang didapat dari API, status loading, dan error
  const [query, setQuery] = useState(''); // State untuk menyimpan kata kunci pencarian dari input pengguna
  const [photos, setPhotos] = useState([]); // State untuk menyimpan hasil foto yang diterima dari API Unsplash
  const [loading, setLoading] = useState(false); // State untuk menunjukkan status loading (apakah data sedang diambil)
  const [error, setError] = useState(null); // State untuk menyimpan pesan error jika ada kesalahan saat pengambilan data

  // Fungsi asinkron untuk mencari gambar dari API Unsplash berdasarkan query dari pengguna
  const searchImage = async () => {
    // Unsplash API Access Key (API Key) untuk mengakses API
    const accessKey = 'CXDMqo-CmxDSOfNdJuKadvlq06uaEijTvWiBd5mM47g'; 
    // Endpoint URL untuk melakukan pencarian gambar dari Unsplash berdasarkan query yang diketikkan pengguna
    const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`;

    // Set loading ke true ketika memulai proses pengambilan gambar
    setLoading(true);
    // Reset error menjadi null sebelum pencarian baru dimulai
    setError(null);

    try {
      // Melakukan request GET ke Unsplash API menggunakan axios
      const response = await axios.get(url);
      // Menyimpan hasil foto yang didapat dari response API ke dalam state 'photos'
      setPhotos(response.data.results);
      // Setelah data berhasil didapat, set loading menjadi false
      setLoading(false);
    } catch (error) {
      // Jika terjadi kesalahan, tampilkan pesan error di state 'error'
      setError('Error fetching images');
      // Setelah gagal, set loading menjadi false
      setLoading(false);
    }
  };

  // Return JSX untuk merender komponen di layar
  return (
    <div style={styles.container}>
      {/* Menampilkan judul di bagian atas */}
      <h1 style={styles.title}>Unsplash Image Search</h1>

      {/* Input box dan tombol search */}
      <div style={styles.searchBox}>
        {/* Input text untuk mengetikkan query/kata kunci pencarian */}
        <input
          type="text"
          placeholder="Search for images..." // Placeholder teks pada input
          value={query} // Mengikat input dengan state 'query'
          onChange={(e) => setQuery(e.target.value)} // Meng-update state 'query' saat input berubah
          style={styles.input} // Gaya CSS untuk input text
        />
        {/* Tombol untuk memulai pencarian */}
        <button onClick={searchImage} style={styles.button}>Search</button>
      </div>

      {/* Menampilkan teks loading saat data sedang diambil */}
      {loading && <p style={styles.loading}>Loading...</p>}
      {/* Menampilkan pesan error jika terjadi kesalahan saat fetching */}
      {error && <p style={styles.error}>{error}</p>}

      {/* Grid yang digunakan untuk menampilkan gambar hasil pencarian */}
      <div style={styles.grid}>
        {/* Mengiterasi setiap foto dari array photos dan menampilkan setiap foto di dalam grid */}
        {photos.map((photo) => (
          <div key={photo.id} style={styles.photoCard}>
            {/* Menampilkan gambar dari hasil pencarian */}
            <img
              src={photo.urls.small} // URL gambar ukuran kecil yang diambil dari Unsplash API
              alt={photo.alt_description} // Deskripsi alternatif gambar
              style={styles.image} // Gaya CSS untuk gambar
            />
            {/* Menampilkan nama fotografer di bawah gambar */}
            <p style={styles.caption}>Photo by {photo.user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Gaya CSS yang dituliskan dalam objek JavaScript dan diterapkan langsung ke elemen
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif', // Font default untuk seluruh halaman
    textAlign: 'center', // Mengatur teks agar berada di tengah halaman
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
    marginBottom: '20px', // Jarak bawah dari search box ke elemen lainnya
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
    cursor: 'pointer', // Mengubah kursor menjadi pointer saat mouse di atas tombol
    fontSize: '16px', // Ukuran font pada tombol
  },
  grid: {
    display: 'grid', // Menggunakan grid layout untuk menampilkan gambar
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', // Grid responsif dengan kolom fleksibel
    gap: '20px', // Jarak antar elemen di grid
    padding: '20px', // Padding di dalam grid container
  },
  photoCard: {
    borderRadius: '8px', // Membulatkan tepi container gambar
    overflow: 'hidden', // Menyembunyikan elemen yang keluar dari border
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Bayangan lembut di sekitar card
    backgroundColor: '#fff', // Warna latar belakang container gambar
  },
  image: {
    width: '100%', // Gambar akan mengambil seluruh lebar container
    height: 'auto', // Tinggi gambar akan menyesuaikan proporsi
    display: 'block', // Menghilangkan jarak bawaan gambar (inline-block)
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

export default UnsplashSearch; // Ekspor komponen UnsplashSearch agar dapat digunakan di bagian lain aplikasi
