import CartSection from "./components/CartSection/CartSection";
import SavedSection from "./components/SavedSection/SavedSection";
import Header from "./components/Header/Header";
import { initialCartItems, initialSavedItems } from "../src/data/data";
import "./index.css";

export default function CartPage() {
  return (
    <div className="page-container">
      <Header />
      <div className="section-container">
        <CartSection items={initialCartItems} />
        <SavedSection items={initialSavedItems} />
      </div>
    </div>
  );
}
