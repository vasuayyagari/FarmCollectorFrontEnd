import logo from './logo.svg';
import './App.css';
import Home from './Home';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to Farm Collector App.
        </p>
        <Home />
      </header>
    </div>
  );
}

export default App;
