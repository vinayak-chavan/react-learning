import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Create from './Create';
import Update from './Update';
import Read from './Read';
import 'bootstrap/dist/css/bootstrap.min.css';
import Demo from './Demo';
import Parent from './Parent';
import Child from './Child';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/create" element={<Create/>}></Route>
        <Route path="/update/:id" element={<Update/>}></Route>
        <Route path="/read/:id" element={<Read/>}></Route>
        <Route path="/demo" element={<Demo/>}></Route>
        <Route path="/parent" element={<Parent/>}></Route>
        <Route path="/child" element={<Child/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
