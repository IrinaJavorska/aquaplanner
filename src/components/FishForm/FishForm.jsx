import React from "react";
import "./FishForm.css";

function FishForm({ data, onChange, validation, onAdd }) {
  return (
    <div className="fish-form">
      <input
        type="text"
        placeholder="Napište jméno rybičky"
        name="name"
        value={data.name}
        onChange={onChange}
      />
      <select
        className="fish-size"
        name="type"
        value={data.type}
        onChange={onChange}
      >
        <option>Vyberte velikost</option>
        <option value="malá">Malá</option>
        <option value="velká">Velká</option>
      </select>

      <button disabled={!validation} onClick={onAdd}>
        Přidat
      </button>
    </div>
  );
}

export default FishForm;
