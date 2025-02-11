import React, { useState } from "react";
import DoctorForm from "./DoctorForm";
import DoctorList from "./DoctorList";
import "./Doctors.css";

const Doctors = () => {
  const [refreshList, setRefreshList] = useState(false);

  const handleRefresh = () => {
    setRefreshList(!refreshList);
  };

  return (
    <div className="container mt-4">
      <h2>Manage Doctors</h2>
      <DoctorForm onAdd={handleRefresh} />
      <DoctorList refresh={refreshList} />
    </div>
  );
};

export default Doctors;
