import { IoEllipsisHorizontal } from "react-icons/io5";
import AddNewTask from "./AddnewTask";
import ListTasks from "./ListTasks";
import ListTitle from "./ListTitle";

function CheckListLists({
  checkLists,
  onEdit,
  onDelete,
  onAddTask,
  onChecked,
}) {
  return (
    <>
      {checkLists.map((item) => (
        <div key={item.id} className="col-lg-4 col-6 mb-4">
          <ul className="list-group">
            <ListTitle
              id={item.id}
              title={item.name}
              onEdit={onEdit}
              onDelete={onDelete}
            />
            {item.tasks.$values.map((task) => (
              <ListTasks
                key={task.id}
                task={task}
                onDelete={onDelete}
                onChecked={onChecked}
              />
            ))}
            <AddNewTask catId={item.id} onAddTask={onAddTask} />
          </ul>
        </div>
      ))}
    </>
  );
}
export default CheckListLists;
