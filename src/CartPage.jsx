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
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [savedItems, setSaveItems] = useState(initialSavedItems);
  const [savedSelected, setSavedSelected] = useState(new Set());

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

  function handleSavedSelect(id) {
    setSavedSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }
  function handleBulkSave() {
    const selectedItems = cartItems.filter((item) => selected.has(item.id));
    setCartItems(cartItems.filter((item) => !selected.has(item.id)));
    setSaveItems((prev) => [...selectedItems, ...prev]);
    setSelected(new Set());
  }

  function handleBulkDelete() {
    setSaveItems(savedItems.filter((item) => !savedSelected.has(item.id)));
    setSavedSelected(new Set());
  }

  function handleBulkToCart() {
    const selectedItems = savedItems
      .filter((item) => savedSelected.has(item.id))
      .map((item) => ({ ...item, quantity: 1 }));
    setSaveItems(savedItems.filter((item) => !savedSelected.has(item.id)));
    setCartItems((prev) => [...prev, ...selectedItems]);
    setSavedSelected(new Set());
  }

  const totalInCart = cartItems.reduce(
    (sum, item) => sum + item.priceCents * item.quantity,
    0,
  );

  const totalSelected = subtotalCents(cartItems, selected);

  return (
    <div className="page-container">
      <Header />
      <div className="section-container">
        <CartSection
          items={cartItems}
          handleSelect={handleSelect}
          selected={selected}
          handleBulkSave={handleBulkSave}
          totalInCart={totalInCart}
        />
        <CartTotal
          items={cartItems}
          totalInCart={totalInCart}
          totalSelected={totalSelected}
          selected={selected}
        />
      </div>

      <SavedSection
        items={savedItems}
        saveSelected={savedSelected}
        handleSavedSelect={handleSavedSelect}
        handleBulkDelete={handleBulkDelete}
        handleBulkToCart={handleBulkToCart}
      />
    </div>
  );
}
