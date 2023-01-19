import { IoCreateOutline } from "react-icons/io5";

function ListLists({ title, id, onView }) {
  return (
    <div className="col-6 col-md-4 col-lg-3 mb-4">
      <button
        onClick={() => onView(id, title)}
        className="btn btn-light border btnName d-flex pb-3 align-items-start"
      >
        <h5 className="m-0">{title}</h5>
      </button>
    </div>
  );
}
export default ListLists;
