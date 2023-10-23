import Register from './components/Register';
import Login from './components/Login';
// import Home from './components/Home';
import Layout from './components/Layout';
import SaleProperty from './components/SaleProperty';
import PropertyForm from './components/PropertyForm';
import Newhome from './components/Newhome';
import Ekyc from './components/Ekyc';
// import Editor from './components/Editor';
// import Admin from './components/Admin';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import LinkPage from './components/LinkPage';
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';

// const ROLES = {
//   'User': 2001,
//   'Editor': 1984,
//   'Admin': 5150
// }

function App() {

  return (
    <Routes>
      
      <Route path="/" element={<Newhome />} /> {/* Change the path to "/" for Navbar to be the default */}
      <Route element={<Layout />}>
      {/* <Route path="/" element={<Layout />}> */}
      
        {/* public routes */}
        <Route path = "ekyc" element={<Ekyc/>} />
        <Route path="login" element={<Login />} />

        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        



        {/* we want to protect these routes */}
        <Route element={<RequireAuth />}>
          <Route path="saleProperty" element={<SaleProperty />} />
          <Route path="addProperty" element={<PropertyForm />} />
        </Route>


        {/* <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<Admin />} />
        </Route> */}

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;