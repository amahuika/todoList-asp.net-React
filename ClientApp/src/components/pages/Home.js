import React, { useContext, useEffect, useRef, useState } from "react";
import Card from "../UI/Card";
import "./Home.css";
import { Button, NavLink, Spinner } from "reactstrap";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import {
  axiosDelete,
  axiosGet,
  axiosPost,
  axiosPut,
} from "../../helperFunctions/AxiosFunctions";
import AuthContext from "../../store/auth-context";
import Login from "../Login";
import {
  IoTrashOutline,
  IoEllipsisHorizontal,
  IoAddOutline,
  IoCreateOutline,
  IoEllipsisHorizontalOutline,
} from "react-icons/io5";
import { Modal } from "@mui/material";
import ListLists from "../homeComponents/ListLists";
import AddNewList from "../homeComponents/AddNewList";

function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [listNameInput, setListNameInput] = useState("");
  const [listArray, setListArray] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const ctx = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    getListArray();
  }, [ctx.token]);

  function toggleModal(action) {
    openModal ? setOpenModal(false) : setOpenModal(true);
    if (action === "close") {
      setListNameInput("");
      setIsEdit(false);
    }
  }

  function getListArray() {
    if (ctx.token === null) return;
    const config = { headers: { Authorization: `Bearer ${ctx.token}` } };
    axiosGet("todolists", config).then((response) => {
      setListArray(response.$values);
    });
  }

  function addNewListHandler(e) {
    e.preventDefault();
    const config = { headers: { Authorization: `Bearer ${ctx.token}` } };

    if (isEdit) {
      const data = { Id: editId, Name: listNameInput, AppUserId: ctx.user.id };

      axiosPut("todolists", editId, data, config).then((response) => {
        toggleModal("close");
        getListArray();
      });
    } else {
      const data = { Name: listNameInput, AppUserId: ctx.user.id };
      axiosPost("todolists", data, config).then((response) => {
        toggleModal("close");
        getListArray();
      });
    }
  }

  function editHandler(id, name) {
    setListNameInput(name);
    setEditId(id);
    setIsEdit(true);
    toggleModal();
  }

  function deleteHandler(id) {
    const config = { headers: { Authorization: `Bearer ${ctx.token}` } };
    axiosDelete("todolists", id, config).then((response) => {
      getListArray();
    });
  }

  function viewListHandler(listId, name) {
    navigate(`${name}/${listId}`);
  }

  return (
    <div>
      {/* <OffCanvasSideMenu /> */}
      {ctx.user !== null && <h3>Welcome {ctx.user.userName}</h3>}
      <div className="d-flex d-inline align-items-center">
        <h4 className="me-2 p-0 m-0">Your lists</h4>
      </div>
      <hr />
      <div className="row mt-4">
        {listArray.map((item) => (
          <ListLists
            key={item.id}
            id={item.id}
            title={item.name}
            onDelete={deleteHandler}
            onEdit={editHandler}
            onView={viewListHandler}
          />
        ))}
        <AddNewList text="Add new list" onAdd={toggleModal} />
      </div>

      <Modal
        open={openModal}
        className="d-flex justify-content-center align-items-center"
        onBackdropClick={() => toggleModal("close")}
      >
        <div className="col-4">
          <div className="card card-body">
            <h5>{isEdit ? "Edit list name" : "Create new list"}</h5>
            <hr className="my-1" />
            <form>
              <div className=" mb-3">
                <label className="form-label mb-1">List name</label>
                <input
                  className="form-control"
                  value={listNameInput}
                  onChange={(e) => setListNameInput(e.target.value)}
                  autoFocus
                />
              </div>

              <input
                type="submit"
                onClick={addNewListHandler}
                className="btn btn-primary px-4"
                value="Add"
              />
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Home;
