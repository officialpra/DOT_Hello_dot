const Marquee = ({ items = [] }) => {
  return (
    <div className="marquee-wrapper">
      <div className="marquee-track">
        {items.map((item, i) => (
          <span key={i} className="marquee-item">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
