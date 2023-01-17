import { IoTrashOutline } from "react-icons/io5";

function ListTasks({ onChecked, task, onDelete }) {
  return (
    <li className="list-group-item" key={task.id}>
      <div className="row align-items-center">
        <div className="col-10 d-inline-flex align-items-center">
          <input
            className="form-check-input me-2"
            type="checkbox"
            checked={task.isComplete ? true : false}
            onChange={() => onChecked(task)}
          />

          <span className={task.isComplete ? "strike-through" : ""}>
            {task.title}
          </span>
        </div>
        <div
          className="col-2 btn btn-sm p-0"
          onClick={() => onDelete("tasks", task.id)}
        >
          <IoTrashOutline className="text-danger" size={24} />
        </div>
      </div>
    </li>
  );
}
export default ListTasks;
