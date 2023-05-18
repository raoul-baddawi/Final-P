import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Layout from './Maintainer/Layout';
import Home from './Pages/Home/Home';
import OurTeam from './Pages/OurTeam/OurTeam';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/ourteam" element={<OurTeam />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
