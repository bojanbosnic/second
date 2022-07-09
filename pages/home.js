import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { app, database } from "../firebase";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import styles from "../styles/Home.module.css";
import { useAuth } from "../Context/AuthContext";

const home = () => {
  const [ID, setID] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [fireData, setFireData] = useState([]);
  const [isUpadate, setIsUpdate] = useState(false);
  const { userToken } = useAuth();

  const router = useRouter();

  const auth = getAuth();



  const databaseRef = collection(database, "CRUD data");
  const addData = (e) => {
    e.preventDefault();
    addDoc(databaseRef, {
      name: name,
      age: Number(age),
    })
      .then(() => {
        alert("Data Sent!");
        getData();
        setName("");
        setAge(0);
      })
      .catch((error) => alert("Not sent!", error));
  };

  const getData = async () => {
    await getDocs(databaseRef).then((response) =>
      setFireData(
        response.docs.map((datas) => {
          return { ...datas.data(), id: datas.id };
        })
      )
    );
  };

  useEffect(() => {
    let token = localStorage.getItem("Token");

    if (token) {
      getData();
    }
    if (!token) {
      router.push("/register");
    }
  }, []);

  const getId = (id, name, age) => {
    setName(name);
    setID(id);
    setAge(age);
    setIsUpdate(true);
  };

  const updateFields = (e) => {
    e.preventDefault();
    let fieldToEdit = doc(database, "CRUD data", ID);
    updateDoc(fieldToEdit, {
      name: name,
      age: Number(age),
    })
      .then(() => {
        setName("");
        setAge(0);
        setIsUpdate(false);
        getData();
        alert("data updated");
      })
      .catch((error) => console.log(error));
  };

  const deleteDocument = (id) => {
    let fieldToEdit = doc(database, "CRUD data", id);
    deleteDoc(fieldToEdit)
      .then(() => alert("Data Deleted!"), getData())
      .catch((error) => console.log(error));
  };
  console.log(userToken)

  return (
    <div className="container">
      <h1>Welcome to Home Page!</h1>
      {userToken? 'TRUE': 'FALSE'}
      <form>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        {isUpadate ? (
          <button onClick={updateFields}>UPDATE</button>
        ) : (
          <button onClick={addData}>ADD</button>
        )}
      </form>
      {/* <button onClick={signout}>Sign Out</button> */}
      <div>
        {fireData.map((data) => (
          <div className={styles.datas} key={data.id}>
            <h2 style={{ marginRight: "1rem" }}>{data.name}</h2>
            <h2 style={{ marginRight: "1rem" }}>{data.age}</h2>
            <button
              className={styles.datasBtn}
              onClick={() => getId(data.id, data.name, data.age)}
            >
              Update
            </button>
            <button
              className={styles.datasBtn}
              onClick={() => deleteDocument(data.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default home;
