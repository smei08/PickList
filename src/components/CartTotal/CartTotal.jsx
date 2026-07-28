import { formatPrice } from "../../utils/money";

export default function CartTotal({
  items,
  totalInCart,
  totalSelected,
  selected,
}) {
  return (
    <div className="total-container">
      <div className="selected-total">
        Subtotal ({selected.size} items): {formatPrice(totalSelected)}
      </div>
      <button>Proceed to checkout</button>
    </div>
  );
}
