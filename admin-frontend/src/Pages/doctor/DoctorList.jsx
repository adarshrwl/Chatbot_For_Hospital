import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";

const DoctorList = ({ refresh }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, [refresh]);

  const fetchDoctors = () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/doctors`)
      .then((response) => {
        setDoctors(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/doctors/${id}`)
        .then(() => {
          setDoctors(doctors.filter((doctor) => doctor._id !== id));
        })
        .catch((error) => {
          console.error("Error deleting doctor:", error);
        });
    }
  };

  if (loading) return <p>Loading doctors...</p>;

  return (
    <div className="mt-4">
      <h3>Doctor List</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialization</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor._id}>
              <td>{doctor.name}</td>
              <td>{doctor.specialization}</td>
              <td>{doctor.department?.name || "-"}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(doctor._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DoctorList;
