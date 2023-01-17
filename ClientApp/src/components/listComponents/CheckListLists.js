import { IoEllipsisHorizontal } from "react-icons/io5";

function CheckListLists({ onAddTask, id, title, onEdit, onDelete }) {
  console.log(title, id);
  return (
    <div className="col-lg-4 col-6 mb-4">
      <ul className="list-group">
        <li className="d-flex flex-inline list-group-item bg-light justify-content-between">
          <h5
            onClick={(e) => {
              onAddTask(id);
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
                      onEdit(id, title);
                    }}
                  >
                    Edit
                  </div>
                </li>
                <li>
                  <div
                    className="dropdown-item pointer"
                    onClick={() => onDelete(id)}
                  >
                    Delete
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
export default CheckListLists;
