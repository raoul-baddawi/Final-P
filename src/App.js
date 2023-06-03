import './App.css';
import { Route, Routes, BrowserRouter, Navigate, Outlet } from "react-router-dom";
import Layout from './Maintainer/Layout';
import Home from './Pages/Home/Home';
import OurTeam from './Pages/OurTeam/OurTeam';
import Messenger from './Components/messenger/Messenger';
import  './Pages/auth/auth.css';
import Profile from './Pages/Profile/Profile';
import Cv from './Pages/Cv/Cv';
import Dashboard from './Pages/Dashboard/Dashboard';
import Aboutme from './Pages/Aboutme/Aboutme';

import LoginUp from './Pages/popAuth/LoginUp'
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
  
  const useDashboard = async() => {
    try{
      const user = await JSON.parse(localStorage.getItem("user"));
      if (!user) {
        return null
      } else if(user && user.role === "superAdmin"){
        return user;
      }
      else{
        return null
      }
    }catch(error){
      console.log(error)
    }
    
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/auth" element={<LoginUp />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Aboutme />} />
            <Route path="/ourteam" element={<OurTeam />} />
            <Route element={useProfile() ? <Outlet /> : <Navigate to="/" />}>
                <Route path="/profile" element={<Profile />} />
            </Route>
            <Route element={useCommunity() ? <Outlet /> : <Navigate to="/auth" />}>
              <Route path="/community" element={<Messenger />} />
            </Route>
            <Route element={useDashboard() ? <Outlet /> : <Navigate to="/" />}>
              <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          </Route>

         
          <Route path="/cv" element={<Cv />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
