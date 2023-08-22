import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { BackendResponse, Person } from "./types";
import { useAppDispatch, useAppSelector } from "./Redux/hooks";
import { getPersons, selectpersons } from "./Redux/personSlice";

function App() {
  // before adding Redux global store .. the data was been stored in below state
  //const [personArray, setPersonArray] = useState<Person[]>([]);
  const [hoveredItem, setHoveredItem] = useState<Person>();
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
    undefined
  );
  // let selectedIndex: number | undefined = undefined;
  const dispatch = useAppDispatch();
  const personArray = useAppSelector(selectpersons);

  useEffect(() => {
    dispatch(getPersons());
  }, []);

  //fetching data with React.js
  /*
  useEffect(() => {
    axios
      .get<BackendResponse>("https://randomuser.me/api/?results=10")
      .then((res) => setPersonArray(res.data.results));
  }, []);
*/
  const dateOfBirths = personArray.filter((item) => item.dob.age > 30);

  const images = personArray.map((item, index) => {
    return (
      <div
        style={{ borderRadius: "50%", padding: "20px", position: "relative" }}
        onClick={() => setSelectedIndex(index)}
        onMouseEnter={() => {
          setHoveredItem(item);
        }}
        onMouseLeave={() => setHoveredItem(undefined)}
      >
        <span className="decorative-circle"></span>

        <img src={item.picture.large} alt="Person Picture" />
        {hoveredItem === item && (
          <div className="name-container">
            {item.name.first} {item.email}
          </div>
        )}
      </div>
    );
  });
  return (
    <div className="App">
      {selectedIndex !== undefined && (
        <div className="card-styling">
          {personArray[selectedIndex].name.first}
        </div>
      )}
      {images}
    </div>
  );
}

export default App;
