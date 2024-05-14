import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { categoriesExApiSlice } from "./features/categories/categoriesSlice.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { productsExApiSlice } from "./features/products/productsSlice.js";

store.dispatch(categoriesExApiSlice.endpoints.getCategories.initiate());
store.dispatch(productsExApiSlice.endpoints.getProducts.initiate());
console.log(process.env.VITE_API_SERVER);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
