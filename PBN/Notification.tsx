/* eslint-disable react/jsx-key */
import { useEffect, useRef, useState } from "react";
import { notificationFilterMap, notificationStatus } from "../src/constants";
import { generate_avatar_data } from "../src/utility";
import "./Notification.css";
import formatDate from "../src/formatDate";
import useIntersectionObserver from "../src/useIntersection";
const Notification = ({ filter }: any) => {
  const [selected, setSelected] = useState("unread");
  let data = require("../data/notifications.json");
  const [unreadData, setUnreadData] = useState<any>(data);
  const [readData, setReadData] = useState<any>([]);
  const [allData, setAllData] = useState<any>([]);
  const [endIndex, setEndIndex] = useState(20);
  const ref = useRef(null); // to detect the intersection of last element
  const getTagDetails = (event: any) => {
    const filteredData: any = Object.keys(notificationFilterMap).filter((key) =>
      notificationFilterMap[key].filters.includes(event)
    );
    return notificationFilterMap[filteredData];
  };

  const inViewPort = useIntersectionObserver(ref, { threshold: 0.1 });

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
      case "unread":
        setAllData(unreadData);
        break;
      case "read":
        setAllData(readData);
        break;

      default:
        setAllData([...unreadData, ...readData]);
    }
  }, [selected]);

  return (
    <div style={{ width: "80%", marginRight: "16px" }}>
      <div className="actionHeader">
        <h3>Notifications</h3>
        <ul className="nav nav-pills tabs">
          {Object.keys(notificationStatus)?.map((item) => {
            return (
              <li
                className={
                  "nav-link " +
                  (selected === notificationStatus[item] ? "selected" : "")
                }
                onClick={() => {
                  setSelected(notificationStatus[item]);
                }}
              >
                {notificationStatus[item]}
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
                      {tag.text}
                    </p>
                    <p>{formatDate(item?.date_created)}</p>
                  </div>
                  <div className="content2">
                    <p>notification dummy text will go here</p>
                    {item?.status === "unread" && (
                      <div style={{ display: "flex" }}>
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            allData?.splice(index, 1);
                            setReadData([
                              { ...item, status: "read" },
                              ...readData,
                            ]);
                            setUnreadData([...allData]);
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
        <div ref={ref}></div>
      </div>
    </div>
  );
};
export default Notification;
