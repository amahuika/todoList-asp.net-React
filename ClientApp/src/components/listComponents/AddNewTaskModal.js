import { Modal } from "@mui/material";
import { useEffect, useState } from "react";

function AddNewTaskModal({ isOpen, toggleModal, title, onSubmit, id }) {
  const [taskInput, setTaskInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (taskInput === "") {
      setErrorMessage("*New task is a required field!");
      return;
    }
    onSubmit(id, taskInput);

    setTaskInput("");
  }

  function changeHandler(e) {
    if (errorMessage !== "") {
      setErrorMessage("");
    }
    setTaskInput(e.target.value);
  }

  return (
    <Modal
      open={isOpen}
      className="d-flex justify-content-center align-items-center"
      onBackdropClick={() => {
        toggleModal("close");
        setErrorMessage("");
      }}
    >
      <div className="col-9 col-md-5 col-lg-4 card">
        <div className="card-body">
          <div className="d-flex flex-inline justify-content-between">
            <h5 className="">{title}</h5>
            <button
              type="button"
              class="btn-close"
              aria-label="Close"
              onClick={() => {
                toggleModal("close");
                setErrorMessage("");
              }}
            ></button>
          </div>

          <form>
            <div className=" mb-3">
              <label className="form-label mb-1">New Task</label>
              <input
                className="form-control"
                value={taskInput}
                onChange={(e) => changeHandler(e)}
                autoFocus
              />
              <small className="text-danger">{errorMessage}</small>
            </div>

            <input
              type="submit"
              value={"Add"}
              className="btn btn-primary px-4"
              onClick={handleSubmit}
            />
          </form>
        </div>
      </div>
    </Modal>
  );
}
export default AddNewTaskModal;
