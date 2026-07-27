import SavedItems from "../SavedItems/SavedItems";
import "./saveSection.css";

export default function SavedSection({ items }) {
  const savedItems = items.map((item) => (
    <SavedItems key={item.id} item={item} />
  ));
  return (
    <section className="saved-section">
      <h2>Your Items!</h2>
      <div className="saved-grid">{savedItems}</div>
    </section>
  );
}
