// import Comment from "./comment";
import Navbar from "./navbar";
import Data from "./PROPS-Class";
import Count from "./State";
import React from "react";
import Inputdata from "./input"; 
import Clock from "./clock";
import YoutubeSearch from "./02.APIYT";
// import UnsplashSearch from "./api"

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <Comment /> */}
      {/* <Data />
      <Count /> */}
      <Clock />
      <YoutubeSearch />
      {/* <Inputdata /> */}
      {/* <UnsplashSearch /> */}
    </div>  
  );
}

export default App;
