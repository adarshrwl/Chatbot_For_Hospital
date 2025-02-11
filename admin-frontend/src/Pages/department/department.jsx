import React, { useState } from "react";
import DepartmentForm from "./DepartmentForm";
import DepartmentList from "./DepartmentList";

const Departments = () => {
  const [updateList, setUpdateList] = useState(false);

  const handleAddDepartment = () => {
    // Trigger a refresh of the department list
    setUpdateList(!updateList);
  };

  return (
    <div className="container mt-4">
      <h2>Manage Departments</h2>
      <DepartmentForm onAdd={handleAddDepartment} />
      <DepartmentList key={updateList} />
    </div>
  );
};

export default Departments;
