import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AdminPanel from "./screens/AdminPanel/AdminPanel";
import AddTask from "./screens/AddTask";
import Employees from "./screens/Employees/Employees";
import Tasks from "./screens/Tasks/Tasks";
import AdminLogin from "./screens/AdminLogin/AdminLogin";

function App() {
  const pageStyle = {
    backgroundColor: "#f0f0f0",
  };
  return (
    <BrowserRouter style={pageStyle}>
      <Routes>
        <Route path="/" Component={AdminLogin}></Route>
        <Route path="/Employees" Component={Employees}></Route>
        <Route path="/Tasks" Component={Tasks}></Route>
        <Route path="/AddTask" Component={AddTask}></Route>
        <Route path="/AdminPanel" Component={AdminPanel}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
