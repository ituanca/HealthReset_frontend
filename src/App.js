import logo from './logo.svg';
import './App.css';
import StartPage from "./components/StartPage";
import {render} from "react-dom";


function App() {

  const renderForm = (
        <div>
          <div className='App'>
            {/*<header className="App-header">*/}
              <StartPage />
            {/*</header>*/}
          </div>
        </div>
  )

  return (
    renderForm
  );

}

export default App;
