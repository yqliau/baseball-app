import "./styles/App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Player from "./Components/Player";
import Container from "./Components/Container";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Container />} />
        <Route exact path="/player/:playerID" element={<Player />} />
      </Routes>
    </Router>
  );
}

export default App;
