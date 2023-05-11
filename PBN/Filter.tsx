import { useState } from "react";
import { filterActivityOptions } from "../src/constants";
import "./Filter.css";
import { TiFilter } from "react-icons/ti";
const Filter = ({ selectFilter }: any) => {
  const [selected, setSelected] = useState<any>();
  const [selectall, setSelectall] = useState(false);
  return (
    <div>
      <div
        style={{
          textAlign: "center",
          display: "flex",
          gap: "6px",
          paddingLeft: "15px",
          paddingBottom: "6px",
        }}
      >
        <div>
          <TiFilter />
        </div>
        Filter Activity
      </div>
      <div
        className="selectAll"
        onClick={() => {
          setSelectall(!selectall);
          selectFilter && selectFilter("all"); // props calling to update the state in parent component
        }}
      >
        Select All
      </div>
      <ul className="list">
        {filterActivityOptions?.map((item: any, index: number) => {
          return (
            <>
              <li
                className={
                  "filter " +
                  (selected === index || selectall ? "selected" : "")
                }
                onClick={() => {
                  setSelected(index);
                  setSelectall(false);
                  selectFilter && selectFilter(item?.label);
                }}
              >
                <div className="dot" style={{ background: item?.color }}></div>
                {item?.label}
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default Filter;
