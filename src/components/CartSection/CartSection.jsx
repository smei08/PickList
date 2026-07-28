import ItemRow from "../ItemRow/ItemRow";
import "./cartSection.css";

export default function CartSection({
  items,
  handleSelect,
  selected,
  handleBulkSave,
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
      <button>Select all link</button>
      <button onClick={handleBulkSave}>Save all {selected.size} items</button>
      <div className="price-header">Price</div>
      {CartItem}
    </div>
  );
}
