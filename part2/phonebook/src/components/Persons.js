import React from "react";

const Persons = ({ filteredPersons }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {filteredPersons.map((p) => (
        <li key={p.name}>
          {p.name} {p.number}
        </li>
      ))}
    </div>
  );
};

export default Persons;
