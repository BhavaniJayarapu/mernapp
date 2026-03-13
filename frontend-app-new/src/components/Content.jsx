import { useState, useEffect, useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";
import "./Content.css";

const API_URL = import.meta.env.VITE_API_URL;

function Content() {

  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  const { cart, setCart } = useContext(AppContext);

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
      product.quantity = 1;
      setCart([...cart, product]);
      setMessage(`${product.name} added to cart ☕`);
    } else {
      setMessage(`${product.name} is already in cart`);
    }

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return (
    <div>

      {/* Message Notification */}
      {message && <div className="cart-message">{message}</div>}

      {/* Cafe Intro */}
      <div className="cafe-intro">
        <h2 className="cafe-heading">
          Welcome to Cup & Co. ☕
        </h2>

        <p className="cafe-desc">
          Crafted coffee, cozy vibes, and flavors worth sharing.
        </p>
      </div>

      {/* Menu */}
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

            <button onClick={() => addToCart(product)}>
              Add to Cart
            </button>

          </div>

        ))}
      </div>

    </div>
  );
}

export default Content;