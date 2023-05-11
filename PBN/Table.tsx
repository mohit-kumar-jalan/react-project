/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import "./Table.css";
const Table = () => {
  const [selected, setSelected] = useState("paytype ID");
  const [column, setColumn] = useState(["DATE", "PAYTYPE ID", "VALUE"]);
  const [data, setData] = useState<any>();
  useEffect(() => {
    // to change the column data on change of filter
    if (selected === "paytype ID") {
      setColumn(["DATE", "PAYTYPE ID", "VALUE"]);
    } else if (selected === "provider ID") {
      setColumn(["DATE", "PROVIDER ID", "VALUE"]);
    } else if (selected === "employee type ID") {
      setColumn(["DATE", "EMPLOYEE TYPE ID", "VALUE"]);
    }
  }, [selected]);

  const prepareData = () => {
    // grouping data based on the selected filter
    let tableData = require("../data/table.json");
    const groupedData = tableData?.values?.reduce((result: any, item: any) => {
      const key = `${item.date}-${
        selected === "paytype ID"
          ? item.paytype_id
          : selected === "provider ID"
          ? item?.provider_id
          : item?.employee_type_id
      }`;
      if (!result[key]) {
        if (selected === "paytype ID") {
          result[key] = {
            date: item.date,
            paytype_id: tableData?.categories?.paytype_id[item?.paytype_id],
            total_amount: 0,
          };
        } else if (selected === "provider ID") {
          result[key] = {
            date: item.date,
            provider_id: tableData?.categories?.provider_id[item?.provider_id],
            total_amount: 0,
          };
        } else {
          result[key] = {
            date: item.date,
            employee_type_id:
              tableData?.categories?.employee_type_id[item?.employee_type_id],
            total_amount: 0,
          };
        }
      }
      result[key].total_amount += item.amount;
      return result;
    }, {});
    const groupedDataArray = Object.values(groupedData);
    setData(groupedDataArray);
  };

  useEffect(() => {
    prepareData();
  }, [selected]);

  return (
    <div className="container2">
      <h1 style={{ color: "#172a58" }}>Data Table</h1>
      <div className="activity1">
        <ul className="nav nav-pills tabs">
          <li
            className={
              "nav-link " + (selected === "paytype ID" ? "selected" : "")
            }
            onClick={() => {
              setSelected("paytype ID");
            }}
          >
            paytype ID
          </li>
          <li
            className={
              "nav-link " + (selected === "provider ID" ? "selected" : "")
            }
            onClick={() => {
              setSelected("provider ID");
            }}
          >
            provider ID
          </li>
          <li
            className={
              "nav-link " + (selected === "employee type ID" ? "selected" : "")
            }
            onClick={() => {
              setSelected("employee type ID");
            }}
          >
            employee type ID
          </li>
        </ul>
        <div style={{ backgroundColor: "lightgray" }}>
          <table>
            <tbody>
              <tr>
                {column?.map((item) => {
                  return <th>{item}</th>;
                })}
              </tr>
            </tbody>
            {data?.map((item: any) => {
              return (
                <>
                  <tbody>
                    <tr>
                      <td>{item?.date}</td>
                      <td>
                        {selected == "paytype ID"
                          ? item.paytype_id
                          : selected == "provider ID"
                          ? item?.provider_id
                          : item?.employee_type_id}
                      </td>
                      <td>{item?.total_amount?.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
};
export default Table;
