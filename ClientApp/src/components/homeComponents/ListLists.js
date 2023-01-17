import {
  IoEllipseOutline,
  IoEllipsisHorizontal,
  IoEyeOutline,
} from "react-icons/io5";
import Card from "../UI/Card";

function ListLists({ title, id, onView, onEdit, onDelete }) {
  return (
    <div className="col-3">
      <ul className="list-group">
        <li
          className="list-group-item pointer listName pb-3"
          onClick={() => onView(id, title)}
        >
          <div className="d-flex justify-content-between">
            <h5
              onClick={() => onView(id, title)}
              className="card-title pointer mb-0"
            >
              {title}
            </h5>
            {/* <div className="dropdown btn btn-light btn-sm py-0">
              <IoEllipsisHorizontal
                size={20}
                className=" dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              />
              <ul className="dropdown-menu">
                <li>
                  <span
                    onClick={() => onEdit(id, title)}
                    className="dropdown-item pointer"
                  >
                    Edit
                  </span>
                </li>
                <li>
                  <span
                    onClick={() => onDelete(id)}
                    className="dropdown-item pointer"
                  >
                    Delete
                  </span>
                </li>
              </ul>
            </div> */}
          </div>
        </li>
      </ul>
    </div>
  );
}
export default ListLists;
