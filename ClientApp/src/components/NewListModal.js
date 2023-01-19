import { Modal } from "@mui/material";
import { useState } from "react";
import { axiosPut } from "../helperFunctions/AxiosFunctions";

function NewListModal({ isOpen, toggleModal, isEdit, onSubmit, listName, id }) {
  const [listInput, setListInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function onSubmitHandler(e) {
    e.preventDefault();
    if (listInput === "") {
      setErrorMessage("*List name is required!");
      return;
    }
    onSubmit(listInput);
  }

  function renderValue() {
    if (isEdit && listInput === "") {
      setListInput(listName);
    }
  }

  function changeHandler(e) {
    if (errorMessage !== "") {
      setErrorMessage("");
    }
    setListInput(e.target.value);
  }

  return (
    <Modal
      open={isOpen}
      className="d-flex justify-content-center align-items-center"
      onBackdropClick={() => toggleModal("close")}
      onClose={() => {
        setListInput("");
        setErrorMessage("");
      }}
    >
      <div className="col-9 col-md-4">
        <div className="card card-body">
          <div className="d-flex flex-inline justify-content-between">
            <h5>{isEdit ? "Edit title" : "Create new list"}</h5>
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
          <hr className="my-1" />
          <form>
            <div className=" mb-3">
              <label className="form-label mb-1">List name</label>
              <input
                className="form-control"
                value={listInput}
                onChange={(e) => changeHandler(e)}
                onFocus={renderValue}
                autoFocus
              />
              <small className="text-danger">{errorMessage}</small>
            </div>

            <input
              type="submit"
              onClick={onSubmitHandler}
              className="btn btn-primary px-4"
              value="Add"
            />
          </form>
        </div>
      </div>
    </Modal>
  );
}
export default NewListModal;
