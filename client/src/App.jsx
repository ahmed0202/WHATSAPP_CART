import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import CreateCategory from "./features/categories/CreateCategory";
import EditCategory from "./features/categories/EditCategory";
import ProductList from "./features/products/ProductList";
import CreateProduct from "./features/products/CreateProduct";
import EditProduct from "./features/products/EditProduct";
import ProductListByCategory from "./features/products/ProductListByCategory";
import ViewProduct from "./features/products/ViewProduct";
import SignIn from "./features/auth/SignIn";
import SignUp from "./features/auth/SignUp";
import RequireAuth from "./features/auth/components/RequireAuth";
import NotFound from "./components/NotFound";
import OrderList from "./features/orders/OrderList";
import ViewEditOrder from "./features/orders/ViewEditOrder";
import ViewCart from "./features/cart/ViewCart";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ProductList />} />

        <Route path="auth">
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>

        <Route path="category">
          <Route index element={<CreateCategory />} />
          <Route element={<RequireAuth />}>
            <Route path="create" element={<CreateCategory />} />
            <Route path="edit" element={<EditCategory />} />
          </Route>
        </Route>

        <Route path="cart">
          <Route index element={<ViewCart />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="orders">
            <Route index element={<OrderList />} />
            <Route path="edit/:id" element={<ViewEditOrder />} />
          </Route>
        </Route>

        <Route path="product">
          <Route index element={<ProductListByCategory />} />
          <Route path="details/:id" element={<ViewProduct />} />

          <Route element={<RequireAuth />}>
            <Route path="create" element={<CreateProduct />} />
            <Route path="edit/:id" element={<EditProduct />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
