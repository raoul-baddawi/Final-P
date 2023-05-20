import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Layout from './Maintainer/Layout';
import Home from './Pages/Home/Home';
import OurTeam from './Pages/OurTeam/OurTeam';
import Messenger from './Components/messenger/Messenger';
import Auth from './Pages/auth/Auth';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/auth" element={<Auth />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/ourteam" element={<OurTeam />} />
            <Route path="/community" element={<Messenger />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
