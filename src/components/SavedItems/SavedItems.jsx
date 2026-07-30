import placeHolder from "../../assets/placeHolder.jpg";
import { formatPrice } from "../../utils/money.js";
import "./savedItems.css";

export default function Saveditems({
  item,
  saveSelected,
  handleBulkDelete,
  handleSavedSelect,
}) {
  return (
    <div className="saved-card">
      <input
        onChange={() => handleSavedSelect(item.id)}
        checked={saveSelected.has(item.id)}
        type="checkbox"
        className="item-checkbox"
        aria-label={`Select ${item.title}`}
      />
      <img className="saved-image" src={placeHolder} alt="" />
      <h3 className="saved-title">{item.title}</h3>
      <div className="saved-price">{formatPrice(item.priceCents)}</div>
      <p className="saved-prime">
        <strong>Prime</strong> & FREE Returns
      </p>
      <button className="move-to-cart" aria-label="move to cart">
        Move to cart
      </button>
      <button className="slink-btn">Delete</button>
      <button className="slink-btn">Add to list</button>
    </div>
  );
}
