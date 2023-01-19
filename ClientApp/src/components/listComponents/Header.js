import { IoCreateOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import AlertDialog from "../AlertDialog";

function Header({ listTitle, id, onDelete, onEdit }) {
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {listTitle}
          </li>
        </ol>
      </nav>
      <div className="d-flex flex-inline">
        <h4 className="me-3">{listTitle}</h4>

        <div className="dropdown ">
          <div
            className="headerHover d-flex align-items-top"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <IoCreateOutline className="" size={20} />
          </div>

          <ul className="dropdown-menu">
            <li>
              <span
                className="dropdown-item pointer"
                onClick={() => onEdit("title")}
              >
                Edit title
              </span>
            </li>
            <li className="dropdown-item pointer">
              <AlertDialog id={id} onDelete={onDelete} />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
export default Header;
