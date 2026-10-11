import React from 'react';
import './App.css';
import Data from './Components/Data';
import { BrowserRouter,Routes,Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Routes>
        <Route index element ={<Data/>}/>
       </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
