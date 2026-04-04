const WorkFilterBar = ({ categories = [], active, onChange }) => {
  return (
    <div className="work-filter-bar">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={active === cat ? "active" : ""}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};
export default WorkFilterBar;
