import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'
import { LandingPage } from "./pages/landing";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
