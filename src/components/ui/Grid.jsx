const Grid = ({ children, cols = 3, className = "" }) => {
  return (
    <div className={`grid grid-cols-${cols} gap-6 ${className}`}>
      {children}
    </div>
  );
};

export default Grid;
