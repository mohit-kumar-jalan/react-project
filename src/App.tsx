"use client";
import Activity from "../PBN/Activity";
import Banner from "../PBN/Banner";
import Table from "../PBN/Table";

export default function App() {
  return (
    <div style={{ backgroundColor: "#f6f7fa", minHeight: "100vh" }}>
      <Banner /> {/** rendering component banner for hero section */}
      <Activity />
      <Table />
    </div>
  );
}
