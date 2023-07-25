import React from "react";
import "./BreadcrumbSection.css";
import { AiOutlineHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const BreadcrumbSection = ({ tittle }) => {
  const navigate = useNavigate();
  return (
    <>
      <div class="wrapper">
        <ul class="breadcrumbs">
          <li class="first" style={{ cursor: "pointer" }}>
            <a onClick={() => navigate("/")}>
              <AiOutlineHome />
            </a>
          </li>
          {/* <li>
            <a href="#">First Level Interior Page</a>
          </li>
          <li>
            <a href="#">Second Level Interior Page</a>
          </li> */}
          {/* <li>
            <a href="#">Third Level Interior Page</a>
          </li> */}
          <li class="last active">
            <a>{tittle}</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default BreadcrumbSection;
