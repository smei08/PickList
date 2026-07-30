import SavedItems from "../SavedItems/SavedItems";
import "./saveSection.css";

export default function SavedSection({
  items,
  saveSelected,
  handleSavedSelect,
  handleBulkDelete,
  handleBulkToCart,
}) {
  const savedItems = items.map((item) => (
    <SavedItems
      key={item.id}
      item={item}
      handleSavedSelect={handleSavedSelect}
      handleBulkDelete={handleBulkDelete}
      saveSelected={saveSelected}
    />
  ));
  return (
    <section className="saved-section">
      <h2>Your Items!</h2>
      <button onClick={handleBulkDelete}>
        Delete {saveSelected.size} items
      </button>
      <button onClick={handleBulkToCart}>
        Move {saveSelected.size} items to cart
      </button>
      <div className="saved-grid">{savedItems}</div>
    </section>
  );
}
