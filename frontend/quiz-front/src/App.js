import Main from "./Pages/Main";
import "./App.css";
import Admin from "./Pages/Admin";

function App() {
  const dev = true;

  return dev ? (
    <div className="App">
      <Admin />
    </div>
  ) : (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
