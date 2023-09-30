import LandingPage from "./screens/LandingPage";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import PersonalInfo from "./screens/PersonalInfo";
import Confirmation from "./screens/Confirmation";


function App() {
  const pageStyle = {
    backgroundColor: "#f0f0f0",
  };
  return (
    <BrowserRouter style={pageStyle}>
      <Routes>
        <Route path="/" Component={LandingPage}></Route>
        <Route path="/PersonalInfo/:title" Component={PersonalInfo}></Route>
        <Route path="Confirmation/" Component={Confirmation}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
