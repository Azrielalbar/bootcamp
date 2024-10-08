import React, { useRef, useState } from 'react'; 
import axios from 'axios'; 

// Komponen utama untuk pencarian video YouTube
const YoutubeSearch = () => {
  const queryRef = useRef(null); // Ref untuk mengambil input pencarian
  const [videos, setVideos] = useState([]); // State untuk menyimpan hasil pencarian video
  const [loading, setLoading] = useState(false); // State untuk menunjukkan status loading
  const [error, setError] = useState(null); // State untuk menyimpan error jika terjadi kesalahan
  const [selectedVideo, setSelectedVideo] = useState(null); // State untuk menyimpan video yang dipilih

  // Fungsi untuk melakukan pencarian video di YouTube
  const searchVideos = async () => {
    const apiKey = 'AIzaSyBLHkBJ6bdBzlK4AKZlrkyapip5XJYRBZk'; // Ganti dengan API key YouTube-mu
    const query = queryRef.current.value; // Mendapatkan query dari input pencarian
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query}&key=${apiKey}`; // URL API untuk pencarian video

    setLoading(true); // Mengaktifkan status loading sebelum data diambil
    setError(null); // Reset error sebelum pencarian baru dimulai

    try {
      const response = await axios.get(url); // Request ke YouTube API untuk mendapatkan video
      setVideos(response.data.items); // Menyimpan hasil pencarian video
      setSelectedVideo(response.data.items[0]); // Menyimpan video pertama sebagai video default yang diputar
      setLoading(false); // Matikan loading setelah data diterima
    } catch (error) {
      setError('Error fetching videos'); // Menangani error jika request gagal
      setLoading(false); // Matikan loading jika terjadi error
    }
  };

  // Fungsi untuk memperbarui video yang dipilih saat thumbnail diklik
  const handleVideoSelect = (video) => {
    setSelectedVideo(video); // Mengatur video yang dipilih
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>YouTube Video Search</h1> {/* Judul halaman */}

      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Search for videos..."
          ref={queryRef} // Menghubungkan input pencarian dengan ref
          style={styles.input} // Gaya untuk input
        />
        <button onClick={searchVideos} style={styles.button}>Search</button> {/* Tombol pencarian */}
      </div>

      {loading && <p style={styles.loading}>Loading...</p>} {/* Menampilkan loading jika status loading aktif */}
      {error && <p style={styles.error}>{error}</p>} {/* Menampilkan error jika ada masalah */}

      <div style={styles.content}>
        {/* Video utama di sebelah kiri */}
        {selectedVideo && (
          <div style={styles.mainVideoContainer}>
            <iframe
              width="640"
              height="360"
              src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`} // Embed video yang dipilih
              title={selectedVideo.snippet.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={styles.mainVideo} // Gaya untuk iframe video
            ></iframe>
            <h2 style={styles.mainCaption}>{selectedVideo.snippet.title}</h2> {/* Menampilkan judul video utama */}
          </div>
        )}

        {/* Thumbnail kecil di sebelah kanan, dibatasi 5 video */}
        <div style={styles.sidebar}>
          {videos.slice(1, 6).map((video) => (
            <div
              key={video.id.videoId}
              style={styles.videoCard} // Gaya untuk setiap card video di sidebar
              onClick={() => handleVideoSelect(video)} // Memanggil fungsi untuk memperbarui video yang dipilih
            >
              {/* Thumbnail video YouTube */}
              <img
                src={video.snippet.thumbnails.default.url}
                alt={video.snippet.title}
                style={styles.thumbnail} // Gaya untuk thumbnail video
              />
              <p style={styles.smallCaption}>{video.snippet.title}</p> {/* Menampilkan judul kecil di sidebar */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Objek gaya CSS untuk setiap elemen di halaman
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif', // Menggunakan font Arial
    textAlign: 'center', // Teks diatur agar berada di tengah
    padding: '20px', // Padding di seluruh halaman
    backgroundColor: '#f1f1f1', // Latar belakang abu-abu terang
    minHeight: '100vh', // Tinggi minimum halaman
  },
  title: {
    fontSize: '2.5rem', // Ukuran besar untuk judul
    color: '#333', // Warna teks abu gelap
    marginBottom: '30px', // Jarak bawah judul
    letterSpacing: '1px', // Jarak antar huruf untuk kesan modern
  },
  searchBox: {
    marginBottom: '30px', // Jarak bawah antara pencarian dan elemen lain
    display: 'flex', // Mengatur input dan tombol pencarian dalam satu baris
    justifyContent: 'center', // Mengatur agar berada di tengah
    gap: '10px', // Jarak antar elemen input dan tombol
  },
  input: {
    padding: '10px', // Padding di dalam input text
    width: '300px', // Lebar input text
    borderRadius: '30px', // Membulatkan tepi input
    border: '1px solid #ddd', // Border abu terang
    fontSize: '16px', // Ukuran font dalam input
    outline: 'none', // Menghilangkan garis fokus
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Efek bayangan lembut
  },
  button: {
    padding: '10px 20px', // Padding tombol
    borderRadius: '30px', // Membulatkan tepi tombol
    backgroundColor: '#0056b3', // Warna tombol biru
    color: '#fff', // Teks putih
    border: 'none', // Menghilangkan border
    cursor: 'pointer', // Mengubah kursor menjadi pointer saat hover
    fontSize: '16px', // Ukuran font tombol
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Efek bayangan pada tombol
    transition: 'background-color 0.3s ease', // Animasi transisi warna latar
  },
  content: {
    display: 'flex', // Menyusun video utama dan sidebar dalam baris
    justifyContent: 'space-between', // Mengatur jarak antara video utama dan sidebar
    alignItems: 'flex-start', // Menyusun elemen di bagian atas
    padding: '20px',
    gap: '20px', // Jarak antar elemen
  },
  sidebar: {
    width: '30%', // Lebar sidebar (30%)
    maxHeight: '400px', // Tinggi maksimum sidebar
    overflowY: 'scroll', // Scroll jika konten terlalu panjang
    backgroundColor: '#fff', // Latar belakang putih
    borderRadius: '10px', // Membulatkan tepi sidebar
    padding: '10px', // Padding di dalam sidebar
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Efek bayangan lembut
  },
  mainVideoContainer: {
    width: '65%', // Lebar untuk video utama (65%)
    backgroundColor: '#fff', // Latar belakang putih
    borderRadius: '10px', // Membulatkan tepi kontainer video
    padding: '10px', // Padding di dalam kontainer video
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Efek bayangan pada video utama
  },
  videoCard: {
    display: 'flex', // Menyusun thumbnail dan judul secara horizontal
    alignItems: 'center', // Menyusun elemen pada baris yang sama
    cursor: 'pointer', // Mengubah kursor menjadi pointer saat hover
    marginBottom: '15px', // Jarak bawah antar video
  },
  thumbnail: {
    width: '120px', // Ukuran lebar thumbnail
    height: '80px', // Ukuran tinggi thumbnail
    marginRight: '10px', // Jarak kanan antara thumbnail dan teks
    borderRadius: '5px', // Membulatkan tepi thumbnail
  },
  smallCaption: {
    fontSize: '14px', // Ukuran font kecil untuk judul video di sidebar
    color: '#555', // Warna teks abu-abu sedang
    whiteSpace: 'nowrap', // Menghindari teks melompat ke baris berikutnya
    overflow: 'hidden', // Menyembunyikan teks yang keluar dari kontainer
    textOverflow: 'ellipsis', // Menampilkan "..." jika teks terlalu panjang
    maxWidth: '150px', // Lebar maksimum untuk teks
  },
  mainVideo: {
    width: '100%', // Lebar penuh untuk video utama
    height: '360px', // Tinggi untuk iframe video
    borderRadius: '5px', // Membulatkan tepi iframe video
  },
  mainCaption: {
    marginTop: '20px', // Jarak atas antara video dan judul
    fontSize: '20px', // Ukuran font untuk judul video utama
    color: '#333', // Warna teks abu gelap
    textAlign: 'left', // Rata kiri untuk judul video
  },
  loading: {
    fontSize: '18px', // Ukuran font untuk teks loading
    color: '#333', // Warna teks loading
  },
  error: {
    color: 'red', // Warna teks untuk pesan error
  },
};

export default YoutubeSearch; // Ekspor komponen utama untuk digunakan di aplikasi
