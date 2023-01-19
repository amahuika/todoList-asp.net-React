import { IoEllipsisHorizontal } from "react-icons/io5";

function ListTitle({ id, title, onEdit, onAddTask, onDelete }) {
  return (
    <li className="d-flex flex-inline list-group-item bg-light justify-content-between">
      <h5
        onClick={(e) => {
          onAddTask();
        }}
        className="me-3 pointer"
      >
        {title}
      </h5>
      <div className="d-flex flex-inline align-items-top">
        <div className="dropdown align-self-top">
          <IoEllipsisHorizontal
            className="pointer"
            size={26}
            data-bs-toggle="dropdown"
            aria-expanded="false"
          />
          <ul className="dropdown-menu">
            <li className="pointer">
              <div
                className="dropdown-item"
                onClick={(e) => {
                  onEdit("checklist", title, id);
                }}
              >
                Edit
              </div>
            </li>
            <li>
              <div
                className="dropdown-item pointer text-danger"
                onClick={() => onDelete("categories", id)}
              >
                Delete
              </div>
            </li>
          </ul>
        </div>
      </div>
    </li>
  );
}
export default ListTitle;
