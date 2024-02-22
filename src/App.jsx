import { useEffect, useState } from "react";
import rawData from "./fishData.json";
import PageContainer from "./components/PageContainer/PageContainer";
import FishList from "./components/FishList/FishList";
import FishForm from "./components/FishForm/FishForm";
import Toggler from "./components/Toggler/Toggler";
import "./App.css";

function AquariumPlanner({ fishes }) {
  const [dimensions, setDimensions] = useState({
    width: 0,
    length: 0,
    height: 0,
  });
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const totalVolume =
      (dimensions.width * dimensions.length * dimensions.height) / 1000;
    const requiredVolume = fishes.reduce((acc, fish) => {
      return acc + (fish.type === "malá" ? 10 : 20);
    }, 0);

    setIsValid(totalVolume >= requiredVolume);
  }, [dimensions, fishes]);

  const handleChange = (event) => {
    setDimensions({
      ...dimensions,
      [event.target.name]: parseInt(event.target.value, 10) || 0,
    });
  };

  const handleSubmit = () => {
    if (isValid) {
      console.log("Dimensions approved:", dimensions);
    }
  };

  const totalVolume =
    (dimensions.width * dimensions.length * dimensions.height) / 1000;
  const totalFishCount = fishes.length;
  const smallFishCount = fishes.filter((fish) => fish.type === "malá").length;
  const largeFishCount = fishes.filter((fish) => fish.type === "velká").length;

  return (
    <div className="aquarium-design">
      <h3>KONCEPT AKVÁRIA</h3>
      <p>Objem akvária: {totalVolume.toFixed(2)} l</p>
      <p>Počet rybiček: {totalFishCount} ks</p>
      <p>Počet malých rybiček: {smallFishCount} ks</p>
      <p>Počet velkých rybiček: {largeFishCount} ks</p>
      <div className="aquarium-dem">
        <label>
          Šířka (cm)
          <input
            type="number"
            placeholder="Šířka (cm)"
            name="width"
            value={dimensions.width}
            onChange={handleChange}
          />
        </label>
        <label>
          Délka (cm)
          <input
            type="number"
            placeholder="Délka (cm)"
            name="length"
            value={dimensions.length}
            onChange={handleChange}
          />
        </label>
        <label>
          Výška (cm)
          <input
            type="number"
            placeholder="Výška (cm)"
            name="height"
            value={dimensions.height}
            onChange={handleChange}
          />
        </label>
        <button
          onClick={handleSubmit}
          style={{ backgroundColor: isValid ? "lightgreen" : "coral" }}
          disabled={!isValid}
        >
          Schválit rozměry
        </button>
      </div>
    </div>
  );
}

function App() {
  const [listOfFishes, setListOfFishes] = useState(rawData.fishes);
  const [newFish, setNewFish] = useState({
    id:
      listOfFishes.length > 0
        ? Math.max(...listOfFishes.map((fish) => fish.id)) + 1
        : 1,
    name: "",
    type: "",
  });

  const [valid, setValid] = useState(false);
  const [activeTab, setActiveTab] = useState(1);

  const validateData = (fish) => {
    if (fish.name.trim().length === 0) {
      setValid(false);
    } else if (!fish.type || fish.type === "Vyberte velikost") {
      setValid(false);
    } else {
      setValid(true);
    }
  };

  const handleChange = (event) => {
    const updatedFish = { ...newFish, [event.target.name]: event.target.value };
    validateData(updatedFish);
    setNewFish(updatedFish);
  };

  const handleAdd = () => {
    setListOfFishes((listOfFishes) => {
      return [...listOfFishes, newFish];
    });
    const newFishId = newFish.id + 1;
    const updatedFish = {
      id: newFishId,
      name: "",
      type: "",
    };
    setNewFish(updatedFish);
    validateData(newFish);
  };

  const handleDelete = (idToDelete) => {
    setListOfFishes(listOfFishes.filter((fish) => fish.id !== idToDelete));
  };

  const handleChoose = (source) => {
    setActiveTab(source === "list-of-fishes" ? 1 : 2);
  };

  return (
    <div className="App">
      <PageContainer>
        <Toggler active={activeTab} onChoose={handleChoose} />
        {activeTab === 1 && (
          <>
            <FishList data={listOfFishes} onDelete={handleDelete} />
            <FishForm
              data={newFish}
              validation={valid}
              onChange={handleChange}
              onAdd={handleAdd}
            />
          </>
        )}
        {activeTab === 2 && <AquariumPlanner fishes={listOfFishes} />}
      </PageContainer>
    </div>
  );
}
export default App;
