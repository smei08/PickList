import { useState } from "react";
import CartSection from "./components/CartSection/CartSection";
import SavedSection from "./components/SavedSection/SavedSection";
import CartTotal from "./components/CartTotal/CartTotal";
import Header from "./components/Header/Header";
import { initialCartItems, initialSavedItems } from "../src/data/data";
import { formatPrice, subtotalCents } from "./utils/money";
import "./index.css";

export default function CartPage() {
  const [selected, setSelected] = useState(new Set());

  function handleSelect(id) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  const totalInCart = initialCartItems.reduce(
    (sum, item) => sum + item.priceCents * item.quantity,
    0,
  );

  const totalSelected = subtotalCents(initialCartItems, selected);

  return (
    <div className="page-container">
      <Header />
      <div className="section-container">
        <CartSection
          items={initialCartItems}
          handleSelect={handleSelect}
          selected={selected}
        />
        <CartTotal
          items={initialCartItems}
          totalInCart={totalInCart}
          totalSelected={totalSelected}
          selected={selected}
        />
      </div>
      <SavedSection items={initialSavedItems} />
    </div>
  );
}
