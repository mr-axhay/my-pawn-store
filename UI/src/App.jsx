import NavBar from "./components/Navbar";
import Home from "./components/Home";
import { Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Logout from "./components/Logout";
import ManageUsers from "./components/ManageUsers";
import Categories from "./components/Categories";
import AdminHomePage from "./components/AdminHomePage";
import AddCategory from "./components/AddCategory";
import PaymentButton from "./components/PaymentButton";
import UserHome from "./components/UserHome";
import AddProduct from "./components/AddProduct";
import ViewProduct from "./components/ViewProduct";
import Product from "./components/Product";
import SubCategories from "./components/SubCategories";
import AddSubCategory from "./components/AddSubCategory";
import { useLocation } from "react-router-dom";
import SubAdminHomePage from "./components/SubAdminHomePage";
import ExpertDashboard from "./components/ExpertDashboard";
import OpenAIChat from "./components/OpenAIChat";
import AllProducts from "./components/AllProducts";
import Orders from "./components/Orders";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";


function App() {
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      <div className={`page-container ${!isHomePage ? "dark-bg" : ""}`}>
        <Routes>
          <Route path='/' element={<Home />} ></Route>
          <Route path='/register' element={<Register />} ></Route>
          <Route path='/login' element={<Login />} ></Route>
          <Route path='/logout' element={<Logout />} ></Route>
          <Route path='/manageUsers' element={<ManageUsers />} ></Route>
          <Route path='/categories' element={<Categories />} ></Route>
          <Route path='/subCategories/:name' element={<SubCategories />} ></Route>
          <Route path='/admin' element={<AdminHomePage />} ></Route>
          <Route path='/addCategory' element={<AddCategory />} ></Route>
          <Route path='/addSubCategory/:name' element={<AddSubCategory />} ></Route>
          <Route path='/pay' element={<PaymentButton />} ></Route>
          <Route path='/userHome' element={<UserHome />} ></Route>
          <Route path='/products' element={<AllProducts />} ></Route>
          <Route path='/addProduct' element={<AddProduct />} ></Route>
          <Route path='/myProducts' element={<Product />} ></Route>
          <Route path='/viewProduct/:id' element={<ViewProduct />} ></Route>
          <Route path='/editProduct/:id' element={<AddProduct />} ></Route>
          <Route path='/subadmin' element={<SubAdminHomePage />} ></Route>
          <Route path='/expertDashboard' element={<ExpertDashboard />} ></Route>
          <Route path='/orders' element={<Orders />} ></Route>
          <Route path='/forgot-password' element={<ForgotPassword />} ></Route>
          <Route path='https://my-pawn-store-fe.onrender.com/reset-password/:email' element={<ResetPassword />} ></Route>

        </Routes>
      </div>
      <OpenAIChat />
    </main>
  );
}

export default App;
