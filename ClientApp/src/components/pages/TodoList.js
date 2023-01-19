import { useContext, useEffect, useRef, useState } from "react";
import { IoCreateOutline } from "react-icons/io5";
import Modal from "@mui/material/Modal";
import {
  axiosPut,
  axiosDelete,
  axiosGet,
  axiosPost,
} from "../../helperFunctions/AxiosFunctions";
import "./TodoList.css";
import AuthContext from "../../store/auth-context";
import { Link, useNavigate, useParams } from "react-router-dom";
import CheckListLists from "../listComponents/CheckListLists";
import AddNewCard from "../listComponents/AddNewCard";
import Header from "../listComponents/Header";
import NewListModal from "../NewListModal";

import "react-toastify/dist/ReactToastify.css";
import AddNewChecklistModal from "../listComponents/AddNewChecklistModal";
import AddNewTaskModal from "../listComponents/AddNewTaskModal";

function TodoList() {
  const [categories, setCategories] = useState([]);

  const [selectedCatId, setSelectedCatId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModal, setIsCategoryModal] = useState(false);
  const [isTitleModal, setIsTitleModal] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [selectedCatName, setSelectedCatName] = useState("");

  const [isEditCategory, setIsEditCategory] = useState(false);
  const [listTitle, setListTitle] = useState("");

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
    getListTitle();
  }, []);

  // get lists from db based on the selected list id
  function getCat() {
    const config = { headers: { Authorization: `Bearer ${ctx.token}` } };
    axiosGet(`categories/listCat/${listId}`, config).then((response) => {
      setCategories(response.$values);
    });
  }

  function getListTitle() {
    const config = { headers: { Authorization: `Bearer ${ctx.token}` } };
    axiosGet(`todolists/${listId}`, config).then((response) => {
      setListTitle(response.name);
    });
  }

  // toggle modal function for add task
  function toggleModal(action) {
    isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true);

    // reset state on close
    if (action === "close") {
      setSelectedCatId("");
      setSelectedCatName("");
      setIsEditCategory(false);
    }
  }

  function toggleEditTitleModal(action) {
    isTitleModal ? setIsTitleModal(false) : setIsTitleModal(true);
    if (action === "close") {
      setEditTitle(false);
    }
  }

  // add new checklist modal toggler
  function toggleNewCategoryModal(action) {
    isCategoryModal ? setIsCategoryModal(false) : setIsCategoryModal(true);

    if (action === "close") {
      setSelectedCatName("");
      setIsEditCategory(false);
    }
  }

  // submit handler new task / edit category
  function onEditTitle(input) {
    // edit title name
    if (editTitle) {
      const config = { headers: { Authorization: `Bearer ${ctx.token}` } };
      const data = { Id: listId, Name: input, AppUserId: ctx.user.id };
      axiosPut("todolists", listId, data, config).then((response) => {
        toggleEditTitleModal("close");
        getListTitle();
      });
      return;
    }
  }

  function addTask(id, task) {
    const data = {
      Title: task,
      IsComplete: false,
      CategoryId: id,
    };
    axiosPost("tasks", data).then((response) => {
      getCat();
      toggleModal("close");
    });
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

  // add new checklist onSubmit
  function newChecklistHandler(input) {
    if (isEditCategory) {
      const data = { Id: selectedCatId, Name: input, TodoListId: listId };
      axiosPut("categories", selectedCatId, data).then((response) => {
        getCat();
        toggleNewCategoryModal("close");
      });
    } else {
      const payload = { name: input, TodoListId: listId };
      axiosPost("categories", payload).then((response) => {
        getCat();
        toggleNewCategoryModal("close");
      });
    }
  }

  function editHandler(action, catName, catId) {
    if (action === "title") {
      toggleEditTitleModal();
      setEditTitle(true);
      return;
    }
    if (action === "checklist") {
      console.log(catName);
      toggleNewCategoryModal();
      setIsEditCategory(true);
      setSelectedCatName(catName);
      setSelectedCatId(catId);
      return;
    }
    toggleModal();
  }

  function deleteHandler(url, id) {
    const config = { headers: { Authorization: `Bearer ${ctx.token}` } };
    axiosDelete(url, id, config).then((response) => getCat());
    if (url === "todolists") {
      navigate("/");
    }
  }

  function addTaskHandler(id, name) {
    setSelectedCatId(id);
    setSelectedCatName(name);
    toggleModal();
  }

  return (
    <div>
      <Header
        listTitle={listTitle}
        id={listId}
        onDelete={deleteHandler}
        onEdit={editHandler}
      />
      <hr />

      <div className="row">
        <CheckListLists
          checkLists={categories}
          onDelete={deleteHandler}
          onEdit={editHandler}
          onChecked={checkHandler}
          onAddTask={addTaskHandler}
        />

        <div className="col-lg-4 col-6 mb-4">
          <ul className="list-group">
            <AddNewCard
              onAddNew={toggleNewCategoryModal}
              text="Add new checklist"
            />
          </ul>
        </div>
      </div>
      <AddNewTaskModal
        isOpen={isModalOpen}
        toggleModal={toggleModal}
        title={selectedCatName}
        id={selectedCatId}
        onSubmit={addTask}
      />
      <AddNewChecklistModal
        isOpen={isCategoryModal}
        toggleModal={toggleNewCategoryModal}
        onSubmit={newChecklistHandler}
        isEdit={isEditCategory}
        editName={selectedCatName}
      />
      {/* edit title */}
      <NewListModal
        isOpen={isTitleModal}
        toggleModal={toggleEditTitleModal}
        isEdit={editTitle}
        listName={listTitle}
        onSubmit={onEditTitle}
      />
    </div>
  );
}
export default TodoList;
