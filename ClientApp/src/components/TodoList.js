import { useEffect, useRef, useState } from "react";
import "bootstrap";
import axios from "axios";
import {
  IoAddCircleOutline,
  IoCreateOutline,
  IoPencilOutline,
  IoChevronDownOutline,
  IoChevronUpOutline,
  IoTrashOutline,
} from "react-icons/io5";
import Modal from "@mui/material/Modal";
import "./TodoList.css";

function TodoList() {
  const [input, setInput] = useState("");
  const [categories, setCategories] = useState([]);
  const [dropdownOptions, setDropDownOptions] = useState([]);
  const [selectedDropdown, setSelectedDropdown] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addCategory, setAddCategory] = useState(false);
  const [categoryInput, setCategoryInput] = useState("");
  const [isEditCategory, setIsEditCategory] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const inputRef = useRef();
  const categoryRef = useRef();

  useEffect(() => {
    console.log("useEffect");
    getCat();
    getTasks();
  }, []);

  function getTasks() {
    axios
      .get("tasks")
      .then((response) => {
        console.log(response.data.$values);
      })
      .catch((error) => console.log(error));
  }

  function getCat() {
    axios
      .get("categories")
      .then((response) => {
        console.log(response.data);
        const options = response.data.$values.map((val) => ({
          value: val.id,
          label: val.name,
        }));
        console.log(options);
        setCategories(response.data.$values);
        setDropDownOptions(options);
      })
      .catch((error) => console.log(error));
  }

  // task input change handler
  function handleChange(e) {
    setInput(e.target.value);
  }

  // toggle modal function
  function toggleModal(action) {
    isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true);

    // reset state on close
    if (action === "close") {
      setSelectedDropdown(null);
      setInput("");
      setAddCategory(false);
      setCategoryInput("");
      setIsEditCategory(false);
    }
  }
  // axios Post function
  function axiosPost(url, data) {
    const promise = axios.post(url, data);
    const response = promise.then((response) => response.data);
    response.catch((error) => console.log(error));
    return response;
  }
  function handleSubmit(e) {
    e.preventDefault();

    // form validation TO DO
    // check forms are valid
    // maybe do this in the modal component before sending data to this handler

    if (isEditCategory) {
      // update category
      console.log(selectedDropdown);

      const data = { Id: selectedDropdown, Name: categoryInput };
      axiosPut("categories", selectedDropdown, data).then((_) => getCat());
      toggleModal("close");
      return;
    }

    const dataObj = {
      Title: input,
      IsComplete: false,
      CategoryId: null,
    };
    if (addCategory) {
      const payload = { name: categoryInput };
      axiosPost("categories", payload).then((response) => {
        const data = {
          ...dataObj,
          CategoryId: response.id,
        };
        axiosPost("tasks", data).then((_) => getCat());
      });
    } else {
      const data = {
        ...dataObj,
        CategoryId: selectedDropdown,
      };
      axiosPost("tasks", data).then((_) => getCat());
    }
    toggleModal("close");
  }

  // axios delete function
  function axiosDelete(url, id) {
    axios
      .delete(`${url}/${id}`)
      .then((response) => {
        getTasks();
        getCat();
      })
      .catch((error) => console.log(error));
  }

  // axios update function
  function axiosPut(url, id, data) {
    const promise = axios.put(`${url}/${id}`, data);
    const response = promise.then((response) => response.data);
    response.catch((error) => console.log(error));
    return response;
  }

  // checkbox handler update isComplete
  function checkHandler(task) {
    const updateCompleted = task.isComplete ? false : true;
    const data = {
      Id: task.id,
      Title: task.title,
      IsComplete: updateCompleted,
      CategoryId: task.categoryId,
    };

    axiosPut("tasks", task.id, data).then((_) => getCat());
  }

  return (
    <div>
      <h3>To do List</h3>
      <input
        type="submit"
        value="New task"
        className="btn btn-primary px-5 my-3 mb-5"
        onClick={toggleModal}
      />

      <div className="row">
        {categories.map((c) => (
          <div key={c.id} className="col-lg-4 col-3">
            <ul className="list-group">
              <li className="d-flex flex-inline list-group-item bg-light">
                <h4
                  onClick={(e) => {
                    setSelectedDropdown(c.id);
                    toggleModal();
                  }}
                  className="me-3 pointer"
                >
                  {c.name}
                </h4>

                <IoCreateOutline
                  onClick={() => {
                    setIsEditCategory(true);
                    setCategoryInput(c.name);
                    setSelectedDropdown(c.id);
                    toggleModal();
                  }}
                  size={26}
                  className="me-3 pointer"
                />
                <IoTrashOutline
                  onClick={() => axiosDelete("categories", c.id)}
                  size={26}
                  input
                  className="text-danger pointer "
                />
              </li>

              {c.tasks.$values.map((t) => (
                <li className="list-group-item" key={t.id}>
                  <div className="row">
                    <div className="col-10 d-inline-flex">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        checked={t.isComplete ? true : false}
                        onChange={() => checkHandler(t)}
                      />

                      <span className={t.isComplete ? "strike-through" : ""}>
                        {t.title}
                      </span>
                    </div>
                    <div className="col-2 btn btn-sm">
                      <IoTrashOutline
                        onClick={() => axiosDelete("tasks", t.id)}
                        className="text-danger"
                        size={24}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Modal
        open={isModalOpen}
        className="d-flex justify-content-center align-items-center"
        onBackdropClick={() => toggleModal("close")}
      >
        <div className="col-4 card">
          <div className="card-body">
            <h5 className="">
              {isEditCategory ? "Edit Category" : "New Task"}
            </h5>
            <form>
              {!isEditCategory && (
                <div>
                  <div className=" mb-3">
                    <label className="form-label">Task</label>
                    <input
                      className="form-control"
                      value={input}
                      onChange={handleChange}
                      ref={inputRef}
                      autoFocus
                    />
                  </div>

                  <div className="d-flex justify-content-between mb-1">
                    <label className="form-label">Category</label>
                    {!addCategory && (
                      <div
                        className="btn btn-sm btn-success"
                        onClick={() => {
                          setAddCategory(true);
                          inputRef.current.focus();
                        }}
                      >
                        New Category
                      </div>
                    )}
                  </div>
                  {addCategory && (
                    <div className=" mb-3">
                      <input
                        className="form-control"
                        value={categoryInput}
                        onChange={(e) => setCategoryInput(e.target.value)}
                        placeholder="Category"
                      />
                    </div>
                  )}
                  {!addCategory && (
                    <select
                      className="form-select mb-3"
                      aria-label="Default select example"
                      onChange={(e) => setSelectedDropdown(e.target.value)}
                      value={selectedDropdown}
                    >
                      <option selected value={null}>
                        Select Category
                      </option>
                      {dropdownOptions.length === 0 && (
                        <option value={null}>No Categories</option>
                      )}
                      {dropdownOptions.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              )}

              {isEditCategory && (
                <div className=" mb-3">
                  <input
                    className="form-control"
                    value={categoryInput}
                    onChange={(e) => setCategoryInput(e.target.value)}
                    placeholder="Category"
                    ref={categoryRef}
                    autoFocus
                  />
                </div>
              )}

              <input
                type="submit"
                value={isEditCategory ? "Update" : "Add"}
                className="btn btn-primary px-4"
                onClick={handleSubmit}
              />
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default TodoList;
