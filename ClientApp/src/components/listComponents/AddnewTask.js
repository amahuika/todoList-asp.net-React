import { IoAddOutline } from "react-icons/io5";

function AddNewTask({ onAddTask, catId }) {
  return (
    <li
      className="list-group-item pointer newList"
      onClick={() => {
        onAddTask(catId);
      }}
    >
      <div className="d-flex align-items-center">
        <IoAddOutline size={20} className="me-1" />
        <span>Add task</span>
      </div>
    </li>
  );
}
export default AddNewTask;
