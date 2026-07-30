import SavedItems from "../SavedItems/SavedItems";
import "./saveSection.css";

export default function SavedSection({
  items,
  saveSelected,
  handleSavedSelect,
  handleBulkDelete,
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
      <div className="saved-grid">{savedItems}</div>
    </section>
  );
}
