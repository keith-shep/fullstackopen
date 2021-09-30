const Total = ({ course }) => {
  const partsArr = course.parts.map((part) => part.exercises);

  const sum = partsArr.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );

  return <strong>Total of {sum} exercises</strong>;
};

export default Total;
