import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Layout from './Maintainer/Layout';
import Home from './Pages/Home/Home';
import Mentors from './Components/Mentors/Mentors';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/mentors" element={<Mentors />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
