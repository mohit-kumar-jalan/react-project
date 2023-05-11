/* eslint-disable react/no-unescaped-entities */
import "./Banner.css";
import heroImage from "../public/hero-img.png";
import Image from "next/legacy/image";
const Banner = () => {
  return (
    <>
      <div className="container">
        <div className="intro">
          <h1>Welcome</h1>
          <br />
          <h1>
            Project details and all functionality is present in README.md file.
            Please refer that once.
          </h1>
        </div>
        <Image src={heroImage} alt="" width={400} height={270} />
      </div>
    </>
  );
};
export default Banner;
