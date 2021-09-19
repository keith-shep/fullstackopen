import React from "react";
import StatisticLine from "./StatisticLine";

const Statistics = ({ stats }) => {
  const { good, neutral, bad } = stats;

  const count = () => good + neutral + bad;

  const average = () => (count() ? (good * 1 + bad * -1) / count() : 0);

  const positive = () => (count() ? (good / count()) * 100 : 0);

  if (count() === 0) {
    return (
      <>
        <h2>Statistics</h2>
        <div>No feedback given</div>
      </>
    );
  }

  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={count()} />
          <StatisticLine text="average" value={average()} />
          <StatisticLine text="positive" value={positive()} />
        </tbody>
      </table>
    </div>
  );
};

export default Statistics;
