import "./App.css";
import TictactoeAI from "./Components/TictactoeAI";
import Tictactoe from "./Components/Tictactoe";

function App() {
  return (
    <div className="App">
      <Tictactoe />
      <TictactoeAI />
    </div>
  );
}

export default App;
