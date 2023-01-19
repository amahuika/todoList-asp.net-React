import { Modal } from "@mui/material";
import { useState } from "react";

function AddNewChecklistModal({
  isOpen,
  toggleModal,
  onSubmit,
  isEdit,
  editName,
}) {
  const [userInput, setUserInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function onSubmitHandler(e) {
    e.preventDefault();

    if (userInput === "") {
      setErrorMessage("*Title is a required field!");
      return;
    }
    onSubmit(userInput);
    setUserInput("");
  }

  function changeHandler(e) {
    if (errorMessage !== "") {
      setErrorMessage("");
    }
    setUserInput(e.target.value);
  }

  function renderValue() {
    if (isEdit && userInput === "") {
      setUserInput(editName);
    }
  }
  return (
    <Modal
      open={isOpen}
      className="d-flex justify-content-center align-items-center"
      onBackdropClick={() => {
        toggleModal("close");
        setUserInput("");
        setErrorMessage("");
      }}
    >
      <div className="col-9 col-md-5 col-lg-4 card">
        <div className="card-body">
          <div className="d-flex flex-inline justify-content-between">
            <h5 className="">{isEdit ? "Edit title" : "New Checklist"}</h5>
            <button
              type="button"
              class="btn-close"
              aria-label="Close"
              onClick={() => {
                toggleModal("close");
                setUserInput("");
                setErrorMessage("");
              }}
            ></button>
          </div>
          <form>
            <div className=" mb-3">
              <label className="form-label mb-1">Title</label>

              <input
                className="form-control"
                value={userInput}
                onChange={(e) => changeHandler(e)}
                placeholder="List title"
                onFocus={renderValue}
                autoFocus
              />
              <small className="text-danger">{errorMessage}</small>
            </div>

            <input
              type="submit"
              value={isEdit ? "Update" : "Add"}
              className="btn btn-primary px-4"
              onClick={onSubmitHandler}
            />
          </form>
        </div>
      </div>
    </Modal>
  );
}
export default AddNewChecklistModal;
