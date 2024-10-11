import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios untuk membuat request HTTP

const YoutubeSearch = () => {
  // State hooks untuk mengelola data aplikasi
  const [videos, setVideos] = useState([]); // Menyimpan daftar video hasil pencarian
  const [loading, setLoading] = useState(false); // Menyimpan status loading
  const [error, setError] = useState(null); // Menyimpan pesan error jika terjadi
  const [selectedVideo, setSelectedVideo] = useState(null); // Menyimpan video yang dipilih
  const [query, setQuery] = useState(''); // Menyimpan query pencarian dari input pengguna
  const [searchTerm, setSearchTerm] = useState(''); // Menyimpan nilai input pencarian pengguna

  // Fungsi untuk mencari video berdasarkan query pengguna
  const searchVideos = async () => {
    // YouTube API Key dan URL endpoint
    const apiKey = 'AIzaSyBLHkBJ6bdBzlK4AKZlrkyapip5XJYRBZk';
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query}&key=${apiKey}`;

    setLoading(true); // Mengatur status loading menjadi true saat pencarian dimulai
    setError(null); // Reset error saat pencarian baru dimulai

    try {
      // Mengambil data dari API YouTube
      const response = await axios.get(url);
      setVideos(response.data.items); // Mengatur state videos dengan hasil pencarian
      setSelectedVideo(response.data.items[0]); // Mengatur video pertama sebagai default video yang dipilih
      setLoading(false); // Mengatur status loading menjadi false setelah data berhasil diambil
    } catch (error) {
      setError('Failed to fetch videos. Please try again later.'); // Mengatur pesan error jika terjadi kesalahan
      setLoading(false); // Menghentikan status loading jika ada error
    }
  };

  // useEffect akan memanggil searchVideos saat query berubah
  useEffect(() => {
    if (query) {
      searchVideos(); // Memanggil searchVideos saat query sudah ada nilainya
    }
  }, [query]); // Bergantung pada perubahan nilai query

  // Fungsi untuk memilih video saat diklik
  const handleVideoSelect = (video) => {
    setSelectedVideo(video); // Mengatur state video yang dipilih menjadi video yang diklik
  };

  // Fungsi untuk menangani pencarian, mengubah query dari input pencarian
  const handleSearch = () => {
    setQuery(searchTerm); // Mengatur nilai query menjadi input pencarian pengguna
  };

  return (
    <div className="container-fluid">
      {/* Header aplikasi */}
      <h1 className="text-center my-4">YouTube Video Search</h1>

      {/* Input pencarian video */}
      <div className="input-group mb-3">
        <input
          type="text"
          placeholder="Search for videos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Mengatur input pengguna sebagai nilai searchTerm
          className="form-control"
        />
        <div className="input-group-append">
          <button onClick={handleSearch} className="btn btn-primary">
            Search
          </button>
        </div>
      </div>

      {/* Tampilkan status loading jika pencarian sedang berlangsung */}
      {loading && <p className="text-center text-warning">Loading...</p>}

      {/* Tampilkan pesan error jika terjadi kesalahan saat mengambil data */}
      {error && <p className="text-center text-danger">{error}</p>}

      {/* Kontainer utama yang berisi video dan sidebar video saran */}
      <div className="video-container" style={{ display: 'flex' }}>
        {/* Video utama yang dipilih */}
        {selectedVideo && (
          <div className="main-video" style={{ flex: 1 }}>
            {/* Embed video dari YouTube */}
            <iframe
              width="70%" // Ukuran video 80% dari lebar kontainer
              height="80%" // Tinggi video juga 80% dari kontainer
              src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`} // URL video YouTube
              title={selectedVideo.snippet.title} // Title video sebagai deskripsi
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            {/* Judul video yang sedang diputar */}
            <h2 className="mt-3">{selectedVideo.snippet.title}</h2>
          </div>
        )}

        {/* Sidebar yang menampilkan daftar video saran */}
        <div
          className="sidebar"
          style={{
            width: "200px", // Lebar sidebar tetap 300px
            padding: "10px", // Padding dalam sidebar
            backgroundColor: "#f8f9fa", // Warna background sidebar
            maxHeight: "500px", // Ketinggian maksimum sidebar
            overflowY: "auto", // Scrollable jika tinggi konten melebihi 500px
            marginLeft: "0px" // Jarak antara sidebar dan video utama
          }}
        >
        
          <div className="row">
            {/* Loop untuk menampilkan daftar video saran */}
            {videos.slice(1, 5).map((video) => (
              <div
                key={video.id.videoId} // Key unik untuk setiap elemen
                className="col-md-12 mb-3 video-card"
                onClick={() => handleVideoSelect(video)} // Mengatur video yang diklik sebagai video yang diputar
              >
                {/* Thumbnail video */}
                <img
                  src={video.snippet.thumbnails.default.url}
                  alt={video.snippet.title} // Alt text sebagai deskripsi gambar
                  style={{ width: "100%" }} // Ukuran gambar full-width di dalam kontainer
                  className="img-fluid rounded" // Menggunakan Bootstrap class untuk gambar responsif
                />
                {/* Judul video saran */}
                <p className="small mt-2">{video.snippet.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YoutubeSearch; // Export komponen untuk digunakan di file lain
