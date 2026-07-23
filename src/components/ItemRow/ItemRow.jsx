import { initialCartItems } from "../../data/data.js";
import placeHolder from "../../assets/placeHolder.jpg";
import { formatPrice } from "../../utils/money.js";
import "./itemRow.css";

export default function CartSection() {
  return (
    <div className="cart-section">
      <h1 className="cart-title">Shopping Cart</h1>
      <button className="select-all-link">Select all items</button>
      <div className="price-header">Price</div>

      {initialCartItems.map((item) => (
        <div className="item-row" key={item.id}>
          <input
            type="checkbox"
            className="item-checkbox"
            aria-label={`Select ${item.title}`}
          />
          <img className="item-image" src={placeHolder} alt="" />

          <div className="item-info">
            <h3 className="item-title">{item.title}</h3>
            <p className="in-stock">In Stock</p>
            <p className="delivery">
              <span className="prime">prime</span> <strong>Tomorrow</strong>
            </p>
            <p className="delivery">
              FREE delivery <strong>Tomorrow, Jul 24</strong>
            </p>
            <p className="link-text">FREE Returns</p>

            <div className="item-actions">
              <div className="quantity-stepper">
                <button aria-label="Decrease quantity">
                  {item.quantity === 1 ? "🗑" : "−"}
                </button>
                <span>{item.quantity}</span>
                <button aria-label="Increase quantity">+</button>
              </div>
              <span className="divider" />
              <button className="link-btn">Delete</button>
              <span className="divider" />
              <button className="link-btn">Save for later</button>
            </div>
          </div>

          <div className="item-price">{formatPrice(item.priceCents)}</div>
        </div>
      ))}
    </div>
  );
}
