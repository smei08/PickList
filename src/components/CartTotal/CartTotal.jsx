import { formatPrice } from "../../utils/money";
import "./cartTotal.css";

export default function CartTotal({
  items,
  totalInCart,
  totalSelected,
  selected,
}) {
  return (
    <div className="total-container">
      <div className="selected-total">
        Subtotal ({selected.size} items):{" "}
        <strong>{formatPrice(totalSelected)}</strong>
      </div>
      <button className="move-to-cart-btn">Proceed to checkout</button>
    </div>
  );
}
