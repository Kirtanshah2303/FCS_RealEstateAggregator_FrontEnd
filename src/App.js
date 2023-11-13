import Register from './components/Register';
import Login from './components/Login';
// import Home from './components/Home';
import Layout from './components/Layout';
import SaleProperty from './components/SaleProperty';
import PropertyForm from './components/PropertyForm';
import Newhome from './components/Newhome';
import Ekyc from './components/Ekyc';
import UserProfile from './components/UserProfile';
import SellerContract from './components/SellerContract';
import ViewContractSeller from './components/viewContractSeller.';
import ViewPage from './components/ViewPage';
import BuyProperty from './components/BuyProperty';
import DealDoneProperty from './components/DealDoneProperty';
import SoldProperty from './components/SoldProperty';
// import Editor from './components/Editor';
// import Admin from './components/Admin';

//Rent properties pages
import RentProperty from './components/RentProperty';
import RentContract from './components/RentContract';
import AddNewRentedProperty from './components/AddNewRentedProperty';
import RentedProperty from './components/RentedProperty';

import ViewRentContract from './components/ViewRentContract'

import ViewPropertyPage from './components/ViewPropertyPage';
import MyPropertiesPage from './components/MyPropertiesPage';
import SellPropertyContractbuyer from './components/SellPropertyContractbuyer';
import ViewUserAdmin from './components/ViewUserAdmin';
import DeletePropertyAdmin from './components/DeleteRentedPropertyAdmin';
import ViewMyRentedProperty from './components/ViewMyRentedProperty';

import Admin from './components/Admin';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth'; 
import { Routes, Route } from 'react-router-dom';
import SellPropertyAdmin from './components/DeleteSalePropertyAdmin';




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
        <Route path="unauthorized" element={<Unauthorized />} />
        



        {/* we want to protect these routes */}
        <Route element={<RequireAuth />}>
          <Route path="saleProperty" element={<SaleProperty />} />
          <Route path="addProperty" element={<PropertyForm />} />
          <Route path="userProfile" element={<UserProfile />} />
          <Route path="/sellerContract/:id" element={<SellerContract />} />
          <Route path="/view/sellerContract/:id" element={<ViewContractSeller />} />

          <Route path="/rentProperty" element={<RentProperty/>}/>
          <Route path="/rentContract/:id" element={<RentContract/>}/>
          <Route path="/view/rentContract/:id" element={<ViewRentContract/>}/>

          <Route path="/addNewRentedProperty" element={<AddNewRentedProperty/>} />
          <Route path="/rentedProperty" element={<RentedProperty/>}/>

          <Route path='/viewPropertyPage' element={<ViewPropertyPage/>} />
          <Route path = "/admin" element={<Admin/>} />

          <Route path="/rent" element={<RentedProperty/>}/>
          <Route path="/buyproperty" element={<BuyProperty/>}/>
          <Route path='/sellpropertycontractbuyer/:id' element={<SellPropertyContractbuyer/>}/>
          <Route path='/mypropertiespage'  element={<MyPropertiesPage/>}/>
          <Route path='/soldProperty' element={<SoldProperty/>}/>
          <Route path='/dealDoneProperty' element={<DealDoneProperty/>}/>
          <Route path='/viewpage' element={<ViewPage/>}/>
          <Route path='admin' element={<Admin/>}/>
          <Route path='/viewuseradmin' element={<ViewUserAdmin/>}/>
          <Route path='/sellpropertyadmin' element={<SellPropertyAdmin/>}/>
          <Route path='/deletepropertyadmin' element={<DeletePropertyAdmin/>}/>
          <Route path='/viewmyrentedproperty' element={<ViewMyRentedProperty/>}/>
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