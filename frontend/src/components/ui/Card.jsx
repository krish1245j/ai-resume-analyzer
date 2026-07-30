function Card({ children, className = "", hover = false, as: Tag = "div", ...props }) {
  return (
    <Tag
      className={`glass rounded-xl2 shadow-card ${
        hover ? "transition-transform duration-300 hover:-translate-y-0.5 hover:border-surface-borderStrong" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}

export default Card;
