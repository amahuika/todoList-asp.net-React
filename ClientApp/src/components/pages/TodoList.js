import { useContext, useEffect, useRef, useState } from "react";
import {
  IoTrashOutline,
  IoEllipsisHorizontal,
  IoAdd,
  IoAddOutline,
  IoChevronForward,
  IoCreateOutline,
} from "react-icons/io5";
import Modal from "@mui/material/Modal";
import {
  axiosPut,
  axiosDelete,
  axiosGet,
  axiosPost,
} from "../../helperFunctions/AxiosFunctions";
import "./TodoList.css";
import AuthContext from "../../store/auth-context";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import OffCanvasSideMenu from "../OffCanvasSideMenu";
import { Card } from "@mui/material";
import CheckListLists from "../listComponents/CheckListLists";

function TodoList() {
  const [input, setInput] = useState("");
  const [categories, setCategories] = useState([]);
  const [dropdownOptions, setDropDownOptions] = useState([]);
  const [selectedCatId, setSelectedCatId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModal, setIsCategoryModal] = useState(false);

  const [addCategory, setAddCategory] = useState(false);
  const [categoryInput, setCategoryInput] = useState("");
  const [isEditCategory, setIsEditCategory] = useState(false);
  const [listTitle, setListTitle] = useState("");

  const inputRef = useRef();
  const categoryRef = useRef();
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();
  const { listId, listName } = useParams();

  useEffect(() => {
    if (!ctx.isLoggedIn) {
      navigate("/");
    }
    setListTitle(listName);

    // axiosGet("users");
    getCat();
  }, []);

  function getCat() {
    console.log(ctx.token);
    const config = { headers: { Authorization: `Bearer ${ctx.token}` } };
    axiosGet(`categories/listCat/${listId}`, config).then((response) => {
      console.log(response);
      // set options for dropdown
      if (response.$values.length === 0) {
        setAddCategory(true);
      }
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
      setSelectedCatId("");
      setInput("");
      setAddCategory(false);
      setCategoryInput("");
      setIsEditCategory(false);
    }
  }
  function toggleNewCategoryModal(action) {
    isCategoryModal ? setIsCategoryModal(false) : setIsCategoryModal(true);

    if (action === "close") {
      setAddCategory(false);
      setCategoryInput("");
    }
  }
  // axios Post function

  function handleSubmit(e) {
    e.preventDefault();

    if (isEditCategory) {
      // update category
      console.log(selectedCatId);

      const data = {
        Id: selectedCatId,
        Name: categoryInput,
        TodoListId: listId,
      };
      axiosPut("categories", selectedCatId, data).then((_) => getCat());
      toggleModal("close");
      return;
    }

    const dataObj = {
      Title: input,
      IsComplete: false,
      CategoryId: null,
    };
    if (addCategory) {
      const payload = { name: categoryInput, TodoListId: listId };
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
        CategoryId: selectedCatId,
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

  function newCategoryHandler(e) {
    e.preventDefault();
    const payload = { name: categoryInput, TodoListId: listId };
    axiosPost("categories", payload).then((response) => {
      getCat();
      toggleNewCategoryModal("close");
    });
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {listTitle}
          </li>
        </ol>
      </nav>

      <div className="d-flex flex-inline">
        <h4 className="me-3">{listTitle}</h4>

        <div className="dropdown ">
          <div
            className="headerHover d-flex align-items-top"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <IoCreateOutline className="" size={20} />
          </div>

          <ul className="dropdown-menu">
            <li>
              <span className="dropdown-item pointer">Edit title</span>
            </li>
            <li>
              <span className="dropdown-item pointer">Delete list</span>
            </li>
          </ul>
        </div>
      </div>
      <hr />

      <div className="row">
        {/* Pass array to check lists list then map inside the component TODO make list components and add task component  */}
        {categories.map((c) => {
          return <CheckListLists key={c.id} id={c.id} title={c.name} />;
        })}
        {categories.map((c) => (
          <div key={c.id} className="col-lg-4 col-6 mb-4">
            <ul className="list-group">
              <li className="d-flex flex-inline list-group-item bg-light justify-content-between">
                <h5
                  onClick={(e) => {
                    setSelectedCatId(c.id);
                    toggleModal();
                  }}
                  className="me-3 pointer"
                >
                  {c.name}
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
                            setIsEditCategory(true);
                            setCategoryInput(c.name);
                            setSelectedCatId(c.id);
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
                            axiosDelete("categories", c.id).then((_) =>
                              getCat()
                            )
                          }
                        >
                          Delete
                        </div>
                      </li>
                    </ul>
                  </div>
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
                      className="col-2 btn btn-sm p-0"
                      onClick={() =>
                        axiosDelete("tasks", t.id).then((_) => getCat())
                      }
                    >
                      <IoTrashOutline className="text-danger" size={24} />
                    </div>
                  </div>
                </li>
              ))}
              <li
                className="list-group-item pointer newList"
                onClick={() => {
                  setSelectedCatId(c.id);
                  toggleModal();
                }}
              >
                <div className="d-flex align-items-center">
                  <IoAddOutline size={20} className="me-1" />
                  <span>Add task</span>
                </div>
              </li>
            </ul>
          </div>
        ))}
        <div className="col-lg-4 col-6 mb-4">
          <ul className="list-group">
            <li
              className="list-group-item pointer newList"
              onClick={toggleNewCategoryModal}
            >
              <div className="d-flex align-items-center">
                <IoAddOutline size={20} className="me-1" />
                <span> Add new checklist</span>
              </div>
            </li>
          </ul>
        </div>
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
                    <label className="form-label mb-1">Task</label>
                    <input
                      className="form-control"
                      value={input}
                      onChange={handleChange}
                      ref={inputRef}
                      autoFocus
                    />
                  </div>

                  <div className="d-flex justify-content-between mb-1">
                    <label className="form-label mb-1">Check list</label>
                    {!addCategory && (
                      <div
                        className="btn btn-sm btn-success"
                        onClick={() => {
                          setAddCategory(true);
                          // categoryRef.current.focus();
                        }}
                      >
                        New CheckList
                      </div>
                    )}
                  </div>
                  {addCategory && (
                    <div className=" mb-3">
                      <input
                        className="form-control"
                        value={categoryInput}
                        onChange={(e) => setCategoryInput(e.target.value)}
                        placeholder="List title"
                        ref={categoryRef}
                        autoFocus
                      />
                    </div>
                  )}
                  {!addCategory && (
                    <select
                      className="form-select mb-3"
                      aria-label="Default select example"
                      onChange={(e) => setSelectedCatId(e.target.value)}
                      value={selectedCatId}
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
                    placeholder="List title"
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

      <Modal
        open={isCategoryModal}
        className="d-flex justify-content-center align-items-center"
        onBackdropClick={() => toggleNewCategoryModal("close")}
      >
        <div className="col-4 card">
          <div className="card-body">
            <h5 className="">New Checklist</h5>
            <form>
              <div className=" mb-3">
                <label className="form-label mb-1">Title</label>

                <input
                  className="form-control"
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                  placeholder="List title"
                  // ref={categoryRef}
                  autoFocus
                />
              </div>

              <input
                type="submit"
                value={"Add"}
                className="btn btn-primary px-4"
                onClick={newCategoryHandler}
              />
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default TodoList;
