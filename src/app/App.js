import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Todo from './components/Todo';
import Navbar from './components/Navbar';
import './App.css';

// App
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
     
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
