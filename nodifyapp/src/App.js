import { Route, Routes} from "react-router-dom"
import './App.css';
import Home from "./pages/Home/Home";
import TwitterPost from "./pages/TwitterPost/TwitterPost";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/twitterpost" element={<TwitterPost />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
