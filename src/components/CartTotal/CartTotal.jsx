import { formatPrice } from "../../utils/money";

export default function CartTotal({
  items,
  totalInCart,
  totalSelected,
  selected,
}) {
  console.log("selected c", selected.length);
  return (
    <div className="total-container">
      <h3>
        Subtotal ({items.length} items): {formatPrice(totalInCart)}
      </h3>
      <div className="selected-total">
        Subtotal ({selected.size} items): {formatPrice(totalSelected)}
      </div>
      <button>Proceed to checkout</button>
    </div>
  );
}
