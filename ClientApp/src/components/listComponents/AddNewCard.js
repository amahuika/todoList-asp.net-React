import { IoAddOutline } from "react-icons/io5";

function AddNewCard({ onAddNew, catId, text, catTitle }) {
  return (
    <li
      className="list-group-item pointer newList"
      onClick={() => {
        onAddNew(catId, catTitle);
      }}
    >
      <div className="d-flex align-items-center">
        <IoAddOutline size={20} className="me-1" />
        <span>{text}</span>
      </div>
    </li>
  );
}
export default AddNewCard;
