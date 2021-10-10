import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    personService.getAll().then((persons) => setPersons(persons));
  }, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const createPerson = (personObject) => {
    personService
      .create(personObject)
      .then((createdPerson) => {
        setPersons(persons.concat(createdPerson));
        setNewName("");
        setNewNumber("");
      })
      .catch((e) => alert(e));
  };

  const updatePerson = (id, personObject) => {
    personService
      .update(id, personObject)
      .then((updatedPerson) => {
        const updatedPersons = persons.map((person) =>
          person.id === id ? updatedPerson : person
        );
        setPersons(updatedPersons);
      })
      .catch((e) => alert(e));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPerson = { name: newName, number: newNumber };

    const existingPerson = persons.find((p) => p.name === newName);

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace with new number?`
        )
      ) {
        updatePerson(existingPerson.id, newPerson);
      }
    } else {
      createPerson(newPerson);
    }
  };

  const handleDelete = (personObject) => {
    const { id, name } = personObject;
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deleteObject(id)
        .then(setPersons(persons.filter((p) => p.id !== id)))
        .catch((e) => alert(`${name} is already delete from server`));
    }
  };

  const filteredPersons = persons.filter((p) => {
    return p.name.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
