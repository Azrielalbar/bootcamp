import Comment from "./comment";
import Navbar from "./navbar";
import Data from "./PROPS-Class";
import Count from "./State";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Comment />
      <Data />
      <Count />
    </div>  
  );
}

export default App;
