import React from "react";

const Persons = ({ filteredPersons, handleDelete }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {filteredPersons.map((p) => (
        <li key={p.name}>
          {p.name} {p.number}
          <button onClick={() => handleDelete(p)}>delete</button>
        </li>
      ))}
    </div>
  );
};

export default Persons;
