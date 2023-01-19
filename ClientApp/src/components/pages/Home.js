import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { Button, NavLink, Spinner } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { axiosGet, axiosPost } from "../../helperFunctions/AxiosFunctions";
import AuthContext from "../../store/auth-context";
import ListLists from "../homeComponents/ListLists";
import AddNewList from "../homeComponents/AddNewList";
import NewListModal from "../NewListModal.js";

function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [listArray, setListArray] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const ctx = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    getListArray();
  }, [ctx.token]);

  function toggleModal(action) {
    openModal ? setOpenModal(false) : setOpenModal(true);
    if (action === "close") {
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

  function addNewListHandler(nameInput) {
    const config = { headers: { Authorization: `Bearer ${ctx.token}` } };
    const data = { Name: nameInput, AppUserId: ctx.user.id };
    axiosPost("todolists", data, config).then((response) => {
      console.log(response);
      toggleModal("close");
      // viewListHandler(response.id, response.name);
      getListArray();
    });
  }

  function viewListHandler(listId, name) {
    navigate(`/${listId}`);
  }

  return (
    <div>
      {/* <OffCanvasSideMenu /> */}
      {ctx.user !== null && (
        <h3 className="title mb-4">Welcome {ctx.user.userName}</h3>
      )}
      <div className="d-flex d-inline align-items-center">
        <h4 className="me-2 p-0 m-0">Your lists</h4>
      </div>
      <hr className="mt-2" />

      <div className="row mt-4">
        {listArray.map((item) => (
          <ListLists
            key={item.id}
            id={item.id}
            title={item.name}
            onView={viewListHandler}
          />
        ))}
        <AddNewList text="Add new list" onAdd={toggleModal} />
      </div>
      <NewListModal
        isOpen={openModal}
        isEdit={isEdit}
        toggleModal={toggleModal}
        onSubmit={addNewListHandler}
      />
    </div>
  );
}

export default Home;
