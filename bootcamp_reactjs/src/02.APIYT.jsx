import React, { useState, useEffect } from 'react';
import axios from 'axios';

const YoutubeSearch = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Fungsi untuk mencari video
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
      setError('Failed to fetch videos. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      searchVideos();
    }
  }, [query]);

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  const handleSearch = () => {
    setQuery(searchTerm);
  };

  return (
    <div className="container-fluid">
      <h1 className="text-center my-4">YouTube Video Search</h1>

      <div className="input-group mb-3">
        <input
          type="text"
          placeholder="Search for videos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control"
        />
        <div className="input-group-append">
          <button onClick={handleSearch} className="btn btn-primary">
            Search
          </button>
        </div>
      </div>

      {loading && (
        <p className="text-center text-warning">Loading...</p>
      )}

      {error && (
        <p className="text-center text-danger">{error}</p>
      )}

      <div className="video-container">
        {selectedVideo && (
          <div className="main-video">
            <iframe
              width="100%"
              height="450"
              src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}
              title={selectedVideo.snippet.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <h2 className="mt-3">{selectedVideo.snippet.title}</h2>
          </div>
        )}

        <div className="sidebar">
          <h2 className="mb-3">Video Suggestions</h2>
          <div className="row">
            {videos.slice(1, 6).map((video) => (
              <div
                key={video.id.videoId}
                className="col-md-6 mb-3 video-card"
                onClick={() => handleVideoSelect(video)}
              >
                <img
                  src={video.snippet.thumbnails.default.url}
                  alt={video.snippet.title}
                  className="img-fluid rounded"
                />
                <p className="small mt-2">{video.snippet.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YoutubeSearch;
