import { Route, Routes } from "react-router-dom";
import "./App.css";
import {
  Feed,
  Footer,
  LandingPage,
  LoginPage,
  Navbar,
  ProfilePage,
  Sidebar,
  SignUpPage,
} from "./components";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/user/:userId" element={<ProfilePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
