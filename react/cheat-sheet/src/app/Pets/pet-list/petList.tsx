"use client";

import React, { useState } from "react";

interface PetData {
  name: string;
  age: number;
  species: string;
}

const defaultForm = {
  name: "",
  age: 0,
  species: "",
};

const Playground: React.FC = () => {
  const [petList, setPetList] = useState<PetData[]>([]);
  const [formData, setFormData] = useState<PetData>({
    ...defaultForm,
  });

  const handleFormChange = (e, field: string) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = () => {
    setPetList([...petList, { ...formData }]);
    setFormData({ ...defaultForm });
  };

  const handleRemovePet = (petIndex: number) => {
    setPetList(petList.filter((_, index) => index !== petIndex));
  };
  return (
    <div>
      <div>
        <div>Pet List</div>
        <div>
          {petList.map((pet, index) => (
            <div key={index}>
              <div>Name: {pet.name}</div>
              <div>Age: {pet.age}</div>
              <div>Species: {pet.species}</div>
              <button onClick={() => handleRemovePet(index)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div>Pet form</div>
        <label>Name: </label>
        <input
          value={formData.name}
          onChange={(e) => handleFormChange(e, "name")}
        ></input>
        <label>Age: </label>
        <input
          value={formData.age}
          type="number"
          onChange={(e) => handleFormChange(e, "age")}
        ></input>
        <label>Species: </label>
        <input
          value={formData.species}
          onChange={(e) => handleFormChange(e, "species")}
        ></input>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Playground;
