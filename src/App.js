import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import "./App.scss";
import Join from "./Components/Join/Join";
import Chat from "./Components/Chat/Chat";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Join} />
        <Route path="/chat" exact component={Chat} />
      </Router>
    </div>
  );
}

export default App;
