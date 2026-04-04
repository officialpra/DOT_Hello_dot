const ServiceCard = ({ title, description, icon }) => {
  return (
    <div className="service-card">
      {/* Service card content */}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default ServiceCard;
