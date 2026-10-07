import react from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';
import LoginPage from './Components/Login/LoginPage';
import SignUpPage from './Components/SignUpPage/SignUpPage';
import HomePage from './Components/Home/HomePage';
import AddJobPage from './Components/AddJob/AddJobPage';
import ApplicationsPage from './Components/ApplicationsFolder/ApplicationsPage';
import StatisticsPage from './Components/Statistics/StatisticsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/addjob" element={<AddJobPage />} />
        <Route path="/application" element={<ApplicationsPage />} />
        <Route path="/stats" element={<StatisticsPage />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;