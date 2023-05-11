/* eslint-disable react/jsx-key */
import { useEffect, useRef, useState } from "react";
import { actionFilterMap, actionStatus } from "../src/constants";
import { generate_avatar_data } from "../src/utility";
import "./Action.css";
import formatDate from "../src/formatDate";
import useIntersectionObserver from "../src/useIntersection";

const Action = ({ filter }: any) => {
  let data = require("../data/actions.json");
  const [pendingData, setPendingData] = useState(data); // store all data initially
  const [ignoredData, setIgnoredData] = useState<any>([]); // state to store the ignored data on click
  const [completedData, setCompletedData] = useState<any>([]); // state to store the completed data on click
  const [allData, setAllData] = useState<any>([]); // for the all filter selected
  const [selected, setSelected] = useState("pending"); // for the selected filter
  const ref = useRef(null);
  const [endIndex, setEndIndex] = useState(20); // for lazy load of 20 data

  const getTagDetails = (event: any) => {
    // to get what type of action is on the entry
    const filteredData: any = Object.keys(actionFilterMap).filter((key) =>
      actionFilterMap[key].filters.includes(event)
    );
    return actionFilterMap[filteredData];
  };

  const inViewPort = useIntersectionObserver(ref, { threshold: 0.1 }); // intersection detection

  useEffect(() => {
    setEndIndex(20);
  }, [selected]);

  useEffect(() => {
    if (inViewPort?.isIntersecting) {
      setEndIndex(endIndex + 20);
    }
  }, [inViewPort]);

  useEffect(() => {
    switch (selected) {
      case "pending":
        setAllData(pendingData);
        break;
      case "ignored":
        setAllData(ignoredData);
        break;
      case "completed":
        setAllData(completedData);
        break;
      default:
        setAllData([...pendingData, ...ignoredData, ...completedData]);
    }
  }, [selected]);

  return (
    <div style={{ width: "100%" }}>
      <div className="actionHeader">
        <h3>Action Needed</h3>
        <ul className="nav nav-pills tabs">
          {Object.keys(actionStatus)?.map((item) => {
            return (
              <li
                className={
                  "nav-link " +
                  (selected === actionStatus[item] ? "selected" : "")
                }
                onClick={() => {
                  setSelected(actionStatus[item]);
                }}
              >
                {actionStatus[item]}
              </li>
            );
          })}
          <li
            className={"nav-link " + (selected === "All" ? "selected" : "")}
            onClick={() => {
              setSelected("All");
            }}
          >
            All
          </li>
        </ul>
      </div>
      <div style={{ maxHeight: "500px", overflow: "auto" }}>
        {allData?.slice(0, endIndex)?.map((item: any, index: number) => {
          const avatar = generate_avatar_data(
            // creating avatar for the name
            item?.patient_first_name + " " + item?.patient_last_name
          );
          const tag = getTagDetails(item?.event_type);
          return (item?.status === selected && tag?.text === filter) ||
            selected === "All" ||
            (filter === "all" && item?.status === selected) ? (
            <div className="actions">
              <div className="card">
                <span
                  style={{
                    width: "70px",
                    height: "60px",
                    borderRadius: "50%",
                    backgroundColor: avatar?.color,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                  }}
                >
                  {avatar?.initials}
                </span>
                <div style={{ width: "100%" }}>
                  <div className="content">
                    <p
                      className="tag"
                      style={{
                        backgroundColor: tag?.background,
                        color: tag.color,
                      }}
                    >
                      {tag?.text}
                    </p>
                    <p>{formatDate(item?.date_created)}</p>{" "}
                    {/** to detect how old the data is */}
                  </div>
                  <div className="content2">
                    <p>{item?.sms_body ?? "action dummy text will go here"}</p>
                    {item?.status === "pending" && ( // to show cross and tick mark only for the pending data
                      <div style={{ display: "flex", gap: "10px" }}>
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            allData?.splice(index, 1);
                            setCompletedData([
                              { ...item, status: "completed" },
                              ...completedData,
                            ]);
                            setPendingData([...allData]);
                          }}
                        >
                          <div className="tick-container">
                            <div className="tick">✓</div>
                          </div>
                        </div>
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            allData?.splice(index, 1);
                            setIgnoredData([
                              { ...item, status: "ignored" },
                              ...ignoredData,
                            ]);
                            setPendingData([...allData]);
                          }}
                        >
                          <div className="tick-container">
                            <div className="tick cross">x</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : null;
        })}
        <div ref={ref}></div> {/** for the intersection */}
      </div>
    </div>
  );
};
export default Action;
