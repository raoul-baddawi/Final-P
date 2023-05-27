import './App.css';
import { Route, Routes, BrowserRouter, Navigate, Outlet } from "react-router-dom";
import Layout from './Maintainer/Layout';
import Home from './Pages/Home/Home';
import OurTeam from './Pages/OurTeam/OurTeam';
import Messenger from './Components/messenger/Messenger';
import Auth from './Pages/auth/Auth';
import Profile from './Pages/Profile/Profile';
function App() {
  const useProfile = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role !== 'user') {
      return user;
    } else {
      return null;
    }
  };

  const useCommunity = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      return user;
    } else {
      return null;
    }
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/auth" element={<Auth />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/ourteam" element={<OurTeam />} />
            <Route element={useProfile() ? <Outlet /> : <Navigate to="/" />}>
                <Route path="/profile" element={<Profile />} />
            </Route>
            <Route element={useCommunity() ? <Outlet /> : <Navigate to="/auth" />}>
              <Route path="/community" element={<Messenger />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
