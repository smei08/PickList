import ItemRow from "../ItemRow/ItemRow";
import "./cartSection.css";
import { formatPrice, subtotalCents } from "../../utils/money";

export default function CartSection({
  items,
  handleSelect,
  selected,
  handleBulkSave,
  totalInCart,
}) {
  const CartItem = items.map((item) => (
    <ItemRow
      key={item.id}
      item={item}
      handleSelect={handleSelect}
      selected={selected}
    />
  ));

  return (
    <div className="cart-section">
      <h1 className="cart-title">Shopping Cart</h1>
      <button className="select-all-link">Select all link</button>
      <button className="bulk-save-btn" onClick={handleBulkSave}>
        Save all {selected.size} items
      </button>
      <div className="price-header">Price</div>
      {CartItem}
      <h3 className="subtotal">
        Subtotal ({items.length} items): {formatPrice(totalInCart)}
      </h3>
    </div>
  );
}
