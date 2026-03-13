import { useState, useEffect, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Content.css";

const API_URL = import.meta.env.VITE_API_URL;

function Content() {

  const [products, setProducts] = useState([]);
  const [showCartBtn, setShowCartBtn] = useState(false);

  const { cart, setCart } = useContext(AppContext);

  const navigate = useNavigate();

  const fetchProducts = async () => {
    const url = `${API_URL}/store`;
    const res = await axios.get(url);
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {

    const found = cart.find((item) => item._id === product._id);

    if (!found) {

      const updatedProduct = { ...product, quantity: 1 };

      setCart([...cart, updatedProduct]);

      setShowCartBtn(true);

    }

  };

  const isInCart = (id) => {
    return cart.some((item) => item._id === id);
  };

  return (
    <div>

      <div className="cafe-intro">
        <h2 className="cafe-heading">Welcome to Cup & Co. ☕</h2>
        <p className="cafe-desc">
          Crafted coffee, cozy vibes, and flavors worth sharing.
        </p>
      </div>

      <div className="products-title">
        <h2>Our Menu</h2>
      </div>

      <div className="row">

        {products.map((product) => (

          <div className="box" key={product._id}>

            <img
              src={`${API_URL}/${product.imageUrl}`}
              alt={product.name}
            />

            <h3>{product.name}</h3>

            <p>{product.desc}</p>

            <h4>₹{product.price}</h4>

            <button
              className={isInCart(product._id) ? "added-btn" : ""}
              onClick={() => addToCart(product)}
              disabled={isInCart(product._id)}
            >
              {isInCart(product._id) ? "Added ✓" : "Add to Cart"}
            </button>

          </div>

        ))}

      </div>

      {/* Floating View Cart Button */}

      {showCartBtn && (
        <button
          className="floating-cart-btn"
          onClick={() => navigate("/cart")}
        >
          🛒 View Cart
        </button>
      )}

    </div>
  );
}

export default Content;