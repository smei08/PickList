import placeHolder from "../../assets/placeHolder.jpg";
import { formatPrice } from "../../utils/money.js";

export default function Saveditems({ item }) {
  return (
    <div className="sitems-row">
      <img className="sitems-image" src={placeHolder} alt="" />
      <h3 className="sitems-title">{item.title}</h3>
      <div className="sitems-price">{formatPrice(item.priceCents)}</div>
      <p className="sdelivery">
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
