import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginContextObj } from "../contexts/LoginContext";
import CreateTask from "./CreateTask";
import TasksList from "./TasksList";

function UserProfile() {
  const { loginStatus } = useContext(loginContextObj);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginStatus) {
      navigate("/login");
    }
  }, [loginStatus, navigate]);

  return (
    <div className="container py-4">
      <div className="row g-4 justify-content-center">
        <div className="col-12 col-lg-4">
          <CreateTask />
        </div>
        <div className="col-12 col-lg-8">
          <TasksList />
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
