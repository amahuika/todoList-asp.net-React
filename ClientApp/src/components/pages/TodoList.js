import { useContext, useEffect, useRef, useState } from "react";
import { IoTrashOutline, IoEllipsisHorizontal } from "react-icons/io5";
import Modal from "@mui/material/Modal";
import {
  axiosPut,
  axiosDelete,
  axiosGet,
  axiosPost,
} from "../../helperFunctions/AxiosFunctions";
import "./TodoList.css";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";

function TodoList() {
  const [input, setInput] = useState("");
  const [categories, setCategories] = useState([]);
  const [dropdownOptions, setDropDownOptions] = useState([]);
  const [selectedDropdown, setSelectedDropdown] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addCategory, setAddCategory] = useState(false);
  const [categoryInput, setCategoryInput] = useState("");
  const [isEditCategory, setIsEditCategory] = useState(false);
  const [isValid, setIsValid] = useState(false);
  // TODO VALIDATION and break up into components
  // then host
  const inputRef = useRef();
  const categoryRef = useRef();
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // console.log("useEffect");
    // postUser();
    // loginUser();
    if (!ctx.isLoggedIn) {
      navigate("/");
    }
    axiosGet("tasks");
    axiosGet("users");

    getCat();
  }, []);

  // function loginUser() {
  //   const data = { Email: "test@email.com", Password: "TestPassword1" };
  //   axiosPost("users/login", data).then((response) =>
  //     console.log(response.token)
  //   );
  // }
  function postUser() {
    const data = {
      UserName: "Aron",
      Email: "test@email.com",
      Password: "TestPassword1",
    };
    axiosPost("users/register", data);
  }
  function getCat() {
    axiosGet("categories").then((response) => {
      // console.log(response);
      // set options for dropdown
      const options = response.$values.map((val) => ({
        value: val.id,
        label: val.name,
      }));
      // console.log(options);
      setCategories(response.$values);
      setDropDownOptions(options);
    });
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
      setSelectedDropdown("");
      setInput("");
      setAddCategory(false);
      setCategoryInput("");
      setIsEditCategory(false);
    }
  }
  // axios Post function

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
          <div key={c.id} className="col-lg-4 col-6 mb-4">
            <ul className="list-group">
              <li className="d-flex flex-inline list-group-item bg-light justify-content-between">
                <h4
                  onClick={(e) => {
                    setSelectedDropdown(c.id);
                    toggleModal();
                  }}
                  className="me-3 pointer"
                >
                  {c.name}
                </h4>

                <div className="dropdown align-self-center">
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
                          setIsEditCategory(true);
                          setCategoryInput(c.name);
                          setSelectedDropdown(c.id);
                          toggleModal();
                        }}
                      >
                        Edit
                      </div>
                    </li>
                    <li>
                      <div
                        className="dropdown-item pointer"
                        onClick={() =>
                          axiosDelete("categories", c.id).then((_) => getCat())
                        }
                      >
                        Delete
                      </div>
                    </li>
                  </ul>
                </div>
              </li>

              {c.tasks.$values.map((t) => (
                <li className="list-group-item" key={t.id}>
                  <div className="row align-items-center">
                    <div className="col-10 d-inline-flex align-items-center">
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
                    <div
                      className="col-2 btn btn-sm"
                      onClick={() =>
                        axiosDelete("tasks", t.id).then((_) => getCat())
                      }
                    >
                      <IoTrashOutline className="text-danger" size={24} />
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
                          // categoryRef.current.focus();
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
                        ref={categoryRef}
                        autoFocus
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
                      <option value="">Select Category</option>
                      {dropdownOptions.length === 0 && (
                        <option value="">No Categories</option>
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
                    // ref={categoryRef}
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
