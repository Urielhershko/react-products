import axios from "axios";
import { useEffect, useState } from "react";
import Product from "./components/Product";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import NoPage from "./components/NoPage";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Cart from "./components/Cart";
import AddProduct from "./components/AddProduct";
import { Alert } from "react-bootstrap";
import axiosHttp from './utils/axios'
// import { useNavigate } from 'react-router-dom'

function App() {
  // "https://django-rest-product.onrender.com/product?category="
  const HOST_URL = "https://django-rest-product.onrender.com";
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  // const navigate = useNavigate()

  useEffect(() => {
    getCategories()
    getProducts(null, 'byCategory')
  }, [currentCategory])

  const logout = () => {
    localStorage.removeItem('token')
    window.location.href='/'
  }
  function productAdded() {
    setCurrentCategory("asgasgasg");
    setCurrentCategory("");
    setMessage("Product Added Succesfuly");
    setShowAlert(true);
  }

  function clickButton(id) {
    console.log("click!", id);
    setCurrentCategory(id);
  }
  const getCategories = async () => {
    try {
      debugger
      const response = await axiosHttp.get('/category')
      setCategories(response.data)
    }
    catch (error) {
      //TODO
    }
  }

  const getProducts = async (searchText = null, state = 'all') => {
    let url = '/product'
    if (state === 'byCategory' && currentCategory) {
      url = 'product?category=' + currentCategory;
    }
    if (searchText) {
      url = 'product?search=' + searchText;
    }
    try {
      const response = await axiosHttp.get(url)
      setProducts(response.data)
    }
    catch (error) {
      //TODO
    }
  }

  function searchProduct(searchText) {
    getProducts(searchText);
  }

  const addToCart = async (product_id, quantity = 1) => {
    try {
      const response = await axiosHttp.post('cart-items', {
        product_id: product_id,
        quantity: quantity
        //TODO alert
      })
    }
    catch (error) {
      //TODO alert  
    }
  }

  return (
    <>
      <BrowserRouter>
        {showAlert && (
          <Alert
            variant="success"
            onClose={() => setShowAlert(false)}
            dismissible
          >
            {message}
          </Alert>
        )}

        <Navbar
          categories={categories}
          clickButton={clickButton}
          searchProduct={searchProduct}
          getProducts={getProducts}
          logout={logout}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="row row-cols-1 row-cols-md-3 row-cols-lg-6 g-4">
                  {products.map((product) => (
                    <div key={product.id} className="col">
                      <Product product={product} addToCart={addToCart} />
                    </div>
                  ))}
                </div>
                <br />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/add_product"
            element={<AddProduct productAdded={productAdded} />}
          />
          <Route path="*" element={<NoPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
