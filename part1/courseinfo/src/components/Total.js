import React from "react";

const Total = ({ course }) => {
  const { parts } = course;

  const exercises = parts.map((part) => part.exercises);
  const sum = exercises.reduce((prev, current) => prev + current);

  return (
    <div>
      <p>Number of exercises {sum}</p>
    </div>
  );
};

export default Total;
