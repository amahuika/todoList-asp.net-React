function Card({ children, className, onClick }) {
  return (
    <div className={"card " + className} onClick={onclick}>
      <div className="card-body">{children}</div>
    </div>
  );
}
export default Card;
