import './App.css';
import { Navigate, Route,Routes } from 'react-router-dom';
import Homepage from './pages/homepage';
import Register from "./pages/register"
import Login from './pages/login';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<ProtectedRoutes><Homepage/></ProtectedRoutes>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
    </Routes>
    </>
  );
}

export function ProtectedRoutes(props){
  if(localStorage.getItem("user")){
    return props.children;
  }else {
    return <Navigate to="/login"/>;
  }
}

export default App;
