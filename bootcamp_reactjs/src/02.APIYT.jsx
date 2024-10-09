import React, { useRef, useState, useEffect } from 'react'; 
import axios from 'axios'; 
import './YoutubeSearch.css'; 

const YoutubeSearch = () => {
  const queryRef = useRef(null); 
  const [videos, setVideos] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const [selectedVideo, setSelectedVideo] = useState(null); 
  const [query, setQuery] = useState(''); // Menambahkan state untuk query pencarian

  // Fungsi untuk melakukan pencarian video di YouTube
  const searchVideos = async () => {
    const apiKey = 'AIzaSyBLHkBJ6bdBzlK4AKZlrkyapip5XJYRBZk'; 
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query}&key=${apiKey}`; 

    setLoading(true); 
    setError(null); 

    try {
      const response = await axios.get(url); 
      setVideos(response.data.items); 
      setSelectedVideo(response.data.items[0]); 
      setLoading(false); 
    } catch (error) {
      setError('Error fetching videos'); 
      setLoading(false); 
    }
  };

  // useEffect untuk melakukan pencarian ketika query berubah
  useEffect(() => {
    if (query) {
      searchVideos();
    }
  }, [query]); // Trigger pencarian saat query berubah

  // Fungsi untuk memperbarui video yang dipilih
  const handleVideoSelect = (video) => {
    setSelectedVideo(video); 
  };

  // Fungsi untuk mengatur query dari input dan memulai pencarian
  const handleSearch = () => {
    const searchTerm = queryRef.current.value;
    setQuery(searchTerm); // Set query untuk melakukan pencarian
  };

  return (
    <div className="container"> 
      <h1 className="title">YouTube Video Search</h1> 

      <div className="searchBox"> 
        <input
          type="text"
          placeholder="Search for videos..."
          ref={queryRef} 
          className="input" 
        />
        <button onClick={handleSearch} className="button">Search</button> 
      </div>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="content">
        {selectedVideo && (
          <div className="mainVideoContainer">
            <iframe
              width="640"
              height="360"
              src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`} 
              title={selectedVideo.snippet.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="mainVideo"
            ></iframe>
            <h2 className="mainCaption">{selectedVideo.snippet.title}</h2> 
          </div>
        )}

        <div className="sidebar">
          {videos.slice(1, 6).map((video) => (
            <div
              key={video.id.videoId} 
              className="videoCard" 
              onClick={() => handleVideoSelect(video)} 
            >
              <img
                src={video.snippet.thumbnails.default.url}
                alt={video.snippet.title}
                className="thumbnail" 
              />
              <p className="smallCaption">{video.snippet.title}</p> 
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YoutubeSearch;
