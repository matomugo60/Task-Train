// import Login from './components/Login';
// import SignUp from './components/SignUp';
import Navbar from './components/Navbar';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Todo from './components/Todo';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      {/* <SignUp/> */}

      <Routes>
      <Route path="/" element={< SignUp />} /> 
      <Route path="/login" element={< Login />} /> 
      <Route path="/todo" element={< Todo/>} /> 
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
