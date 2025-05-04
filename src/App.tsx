import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Home, Login, Register, Reset, Doc } from "./pages";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app-container">
      <Header />

      <main className="mainland">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/doc" element={<Doc />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
