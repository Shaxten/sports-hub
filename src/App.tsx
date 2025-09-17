import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Teams from './pages/Teams';
import Players from './pages/Players';
import MainLayout from "./layouts/MainLayout";

import './App.css'

function App() {
  return (
    <Routes>
      {/* Wrap routes inside MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/players" element={<Players />} />
        <Route path="/teams" element={<Teams />} />
      </Route>

      {/* 404 fallback */}
      <Route path="*" element={<h1 className="p-6 text-red-600">404 - Page not found</h1>} />
    </Routes>
  );
}


export default App;