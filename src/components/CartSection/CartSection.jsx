import ItemRow from "../ItemRow/ItemRow";
import "./cartSection.css";

export default function CartSection() {
  return (
    <div className="cart-section">
      <h1>Shopping Cart!</h1>
      <ItemRow />
    </div>
  );
}
