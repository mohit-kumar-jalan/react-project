import { useState } from "react";
import Action from "./Action";
import "./Activity.css";
import Filter from "./Filter";
import Notification from "./Notification";

const Activity = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  return (
    <div className="container1">
      <h1 style={{ color: "#172a58" }}>Activity</h1>
      <div className="activity">
        <Filter
          selectFilter={(data: any) => {
            // call back props to know which filter is selected
            setSelectedFilter(data);
          }}
        />
        <div style={{ display: "flex", width: "100%", gap: "36px" }}>
          {/** action and notification component with the props of selected filter */}
          <Action filter={selectedFilter} />
          <Notification filter={selectedFilter} />
        </div>
      </div>
    </div>
  );
};

export default Activity;
