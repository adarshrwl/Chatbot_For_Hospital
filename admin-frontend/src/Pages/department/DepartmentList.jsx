import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance"; // axiosInstance already handles the Authorization header

import { Table, Button } from "react-bootstrap";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = () => {
    setLoading(true);

    axios
      .get("/departments") // Token is added by axiosInstance
      .then((response) => {
        setDepartments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      axios
        .delete(`/departments/${id}`) // Token is added by axiosInstance
        .then(() => {
          setDepartments(departments.filter((dept) => dept._id !== id));
        })
        .catch((error) => {
          console.error("Error deleting department:", error);
        });
    }
  };

  if (loading) return <p>Loading departments...</p>;

  return (
    <div className="mt-4">
      <h3>Departments</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Contact</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department._id}>
              <td>{department.name}</td>
              <td>{department.location || "-"}</td>
              <td>{department.contact || "-"}</td>
              <td>{department.description || "-"}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(department._id)}
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

export default DepartmentList;
