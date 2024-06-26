import { useDebugValue, useState } from "react";
import "./styles.css";

export default function App() {
  const [txt, setTxt] = useState("");
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);
  const [alert, setAlert] = useState("");

  const handleSubmit = () => {
    if (txt === "") {
      setAlert("pls write something...");
      setTimeout(() => {
        setAlert("");
      }, 5000);
    } else {
      if (edit) {
        const res = data.map((item, index) => {
          if (index == id) {
            return txt;
          } else {
            return item;
          }
        });
        setData(res);
        setTxt("");
        setEdit(false);
        setId(null);
      } else {
        setData([...data, txt]);
        setTxt("");
      }
    }
  };

  const handleDelete = (i) => {
    const filtered = data.filter((item, index) => index !== i);
    setData(filtered);
  };

  const handleEdit = (item, index) => {
    setEdit(true);
    setTxt(item);
    setId(index);
  };
  return (
    <div className="App">
      <input
        type="text"
        placeholder="Please write your task here...."
        onChange={(e) => setTxt(e.target.value)}
        value={txt}
      />
      <button onClick={handleSubmit}>Submit</button>
      <div style={{ color: "red" }}>{alert}</div>

      <div className="todo">
        <ol>
          {data.map((item, index) => (
            <>
              <li className="list">{item}</li>
              <button onClick={() => handleDelete(index)}>Delete</button>
              <button onClick={() => handleEdit(item, index)}>Edit</button>
            </>
          ))}
        </ol>
      </div>
    </div>
  );
}
