import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./AdminLogin";
import AdminSignup from "./AdminSignup";
import AdminList from "./AdminList";
import AdminEdit from "./AdminEdit"; 
import ProductAdd from "./ProductAdd";
import ProductList from "./ProductList";
import ProductEdit from "./ProductEdit";
import UserList from "./UserList";
import UserEdit from "./UserEdit";
import UserSignup from "./UserSignUp";
import UserLogin from "./UserLogin";
import PlaceOrder from "./PlaceOrder";
import OrderUpdate from "./OrderUpdate";
import OrderList from "./OrderList";
import Home from "./Home";
import AdminProfile from "./AdminProfile";
import BakeryShop from "./BakeryShop";
import Cart from "./Cart";
import UserOrders from "./UserOrders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/AdminSignup" element={<AdminSignup />} />
        <Route path="/AdminList" element={<AdminList />} />      
        <Route path="/AdminEdit/:id" element={<AdminEdit />} /> 
        <Route path="/admin/add-product" element={<ProductAdd />} />
        <Route path="/admin/products" element={<ProductList />} />
        <Route path="/admin/edit-product/:id" element={<ProductEdit />} />
        <Route path="/usersignup" element={<UserSignup />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/edituser/:id" element={<UserEdit />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/orderlist" element={<OrderList />} />
        <Route path="/order/update/:id" element={<OrderUpdate />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="/bakery" element={<BakeryShop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/myorders" element={<UserOrders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
