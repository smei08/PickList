import CartSection from "./components/CartSection/CartSection";
import SavedSection from "./components/SavedSection/SavedSection";
import Header from "./components/Header/Header";
import { initialCartItems, initialSavedItems } from "../src/data/data";

export default function CartPage() {
  return (
    <>
      <Header />
      <CartSection items={initialCartItems} />
      <SavedSection items={initialSavedItems} />
    </>
  );
}
