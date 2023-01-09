import { useEffect, useState } from "react";
import "bootstrap";
import Dropdown from "react-dropdown";
import axios from "axios";

function TodoList(props) {
  const [myList, setMyList] = useState([]);
  const [input, setInput] = useState("");
  const [categories, setCategories] = useState([]);
  const [dropdownOptions, setDropDownOptions] = useState([]);
  const [selectedDropdown, setSelectedDropdown] = useState();

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
        setMyList(response.data.$values);
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

  function handleChange(e) {
    setInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      Title: input,
      IsComplete: false,
      CategoryId: selectedDropdown,
    };
    // axios
    //   .post("categories", { name: "Another Test Category" })
    //   .then((response) => {
    //     console.log(response.data);
    //     getTasks();
    //     setInput("");
    //   })
    //   .catch((error) => console.log(error));

    axios
      .post("tasks", data)
      .then((response) => {
        console.log(response.data);
        getTasks();
        getCat();
        setInput("");
      })
      .catch((error) => console.log(error));
  }
  console.log(dropdownOptions);
  function deleteHandle(id) {
    axios
      .delete(`tasks/${id}`)
      .then((response) => {
        getTasks();
        getCat();
      })
      .catch((error) => console.log(error));
  }

  // Finish update tasks
  function update() {
    // axios.put;
  }

  function onSelectHandle(value) {
    console.log(value.value);
    setSelectedDropdown(value.value);
  }

  return (
    <div>
      <h3>To do List</h3>
      <form method="post" onSubmit={handleSubmit} className="mb-3">
        <div className="col-2 mb-2">
          <input
            className="form-control"
            value={input}
            onChange={handleChange}
          />
        </div>
        <div>
          <Dropdown
            options={dropdownOptions}
            onChange={(value) => onSelectHandle(value)}
            placeholder="Select category"
            className="border rounded col-2 p-2 my-3"
          />
        </div>
        <input type="submit" value="Add" className="btn btn-primary" />
      </form>
      <div>
        {categories.map((e) => (
          <>
            <h5>{e.name}</h5>
            {e.tasks.$values.map((t) => (
              <ul>
                <li>{t.title}</li>
              </ul>
            ))}
          </>
        ))}
      </div>
    </div>
  );
}
export default TodoList;
