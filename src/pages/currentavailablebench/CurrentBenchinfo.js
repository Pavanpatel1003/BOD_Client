import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CurrentBenchinfo = () => {
  const navigate = useNavigate();

  const handlePersonDetails = (path) => {
    console.log(`Navigating to: ${path}`);
    navigate(path);
  };

  const [searchTerm, setSearchTerm] = useState(""); // Search term state

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  return (
    <>
      <div className="container-fluid table-format">
        <div className="row">
          <div className="col-12 col-md-3">
            <div className="position-relative">
              <i className="fas fa-search position-absolute search-btn"></i>
              <input
                type="text"
                className="form-control ps-5"
                placeholder="search"
                style={{
                  borderRadius: "30px",
                }}
                value={searchTerm}
                onChange={handleSearchChange} // Trigger search function on input change
              />
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Resource Name</th>
                <th>Designation</th>
                <th>Primary Skills</th>
                <th>Secondary Skills</th>
                <th>YOE</th>
                <th>Availability</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="Resource Name">
                  <div className="currentbench-person">
                    <span className="avatar RN">RN</span>
                    <span className="ml-2 ms-3">Renu</span>
                  </div>
                </td>
                <td data-label="Designation">Sr. Consultant Data bricks</td>
                <td data-label="Primary Skills">React</td>
                <td data-label="Secondary Skills">AI, Machine Learning</td>
                <td data-label="YOE">11</td>
                <td data-label="Availability">Immediate</td>
                <td data-label="Action">
                  <span
                    className="view-details"
                    onClick={() => handlePersonDetails("/UserDetails")}
                  >
                    View Details
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CurrentBenchinfo;
