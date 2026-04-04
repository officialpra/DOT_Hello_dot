const SectionHeading = ({ title, subtitle }) => {
  return (
    <div>
      {title && <h2>{title}</h2>}
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
};

export default SectionHeading;
