import React from "react";

import Part from "./Part";

const Content = ({ course }) => {
  const { parts } = course;
  return (
    <>
      {parts.map((part) => (
        <Part part={part} />
      ))}
    </>
  );
};

export default Content;
