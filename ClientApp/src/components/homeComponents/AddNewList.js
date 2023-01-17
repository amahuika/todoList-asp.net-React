import { IoAddOutline } from "react-icons/io5";

function AddNewCard({ onAdd, text }) {
  return (
    <div className="col-3">
      <ul className="list-group">
        <li
          className="list-group-item pointer listName"
          onClick={() => onAdd()}
        >
          <div className="d-flex align-items-center">
            <IoAddOutline size={20} className="me-2" />
            <span>{text}</span>
          </div>
        </li>
      </ul>
    </div>
  );
}
export default AddNewCard;
