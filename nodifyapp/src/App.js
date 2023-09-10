import { Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout.jsx";
import Home from "./pages/Home/Home.jsx"
import CreateTweet from "./pages/CreateTweet/CreateTweet.jsx";
import './App.css';

export default function App() {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/createtweet" element={<CreateTweet />} />
        </Route>
      </Routes>
    </div>
  );
}
