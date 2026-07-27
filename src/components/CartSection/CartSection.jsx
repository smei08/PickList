import ItemRow from "../ItemRow/ItemRow";
import "./cartSection.css";

export default function CartSection({ items }) {
  const CartItem = items.map((item) => <ItemRow key={item.id} item={item} />);

  return (
    <div className="cart-section">
      <h1 className="cart-title">Shopping Cart</h1>
      <button>Select all link</button>
      <div className="price-header">Price</div>
      {CartItem}
    </div>
  );
}
