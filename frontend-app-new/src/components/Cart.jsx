import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";
import "./Cart.css";

function Cart() {

  const { cart, setCart, user } = useContext(AppContext);
  const [orderValue, setOrderValue] = useState(0);

  const API_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();


  const increment = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };


  const decrement = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };


  useEffect(() => {
    setOrderValue(
      cart.reduce((sum, item) => sum + item.quantity * item.price, 0)
    );
  }, [cart]);


  const placeOrder = async () => {

    if (user?.email) {

      const url = `${API_URL}/orders`;

      const order = {
        email: user.email,
        items: cart,
        orderValue: orderValue,
        orderDate: Date.now(),
      };

      await axios.post(url, order, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      setCart([]);

      navigate("/orders");

    }

  };


  return (
    <div className="cart-container">

      <h1 className="cart-title">Your Cart</h1>


      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty ☕</p>
      ) : (

        <div className="cart-items">

          {cart.map((item) => (

            <div className="cart-card" key={item._id}>

              <div className="cart-info">

                <h3>{item.name}</h3>

                <p className="price">₹{item.price}</p>

              </div>


              <div className="quantity-controls">

                <button onClick={() => decrement(item._id)}>-</button>

                <span>{item.quantity}</span>

                <button onClick={() => increment(item._id)}>+</button>

              </div>


              <div className="item-total">

                ₹{item.quantity * item.price}

              </div>

            </div>

          ))}

        </div>

      )}


      <div className="order-summary">

        <h2>Total: ₹{orderValue}</h2>

        {user?.email ? (

          <button className="order-btn" onClick={placeOrder}>
            Place Order
          </button>

        ) : (

          <button
            className="order-btn"
            onClick={() => navigate("/login")}
          >
            Login to Order
          </button>

        )}

      </div>

    </div>
  );
}

export default Cart;