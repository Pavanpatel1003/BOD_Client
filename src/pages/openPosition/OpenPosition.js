import React, { useEffect, useState } from "react";
import search from "../../assets/image/search.png";
import update from "../../assets/image/update.png";
import person from "../../assets/image/person.png";
import { useNavigate } from "react-router-dom";
import { get, updateByID } from "../../services/API";
import moment from "moment";

const OpenPosition = () => {
  const [positionOpen, setPositionOpen] = useState([]);
  const [addId, setAddID] = useState(null);
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [workType, setWorkType] = useState('');

  useEffect(() => {
    get("/get/open-position-requirements").then((response) => {
      const openPositionInfo = response.data;
      console.log("positionOpen", openPositionInfo);
      setPositionOpen(openPositionInfo.data);
    });
  }, []);

  const navigate = useNavigate();
  const handleCurrentProject = (path) => {
    console.log(`Navigating to: ${path}`);
    navigate(path);
  };

  const [positions, setPositions] = useState(1);
  const [experience, setExperience] = useState(1);
  const [informPartners, setInformPartners] = useState(false); // State to track checkbox

  const handleDecrement = () => {
    setPositions((prev) => Math.max(prev - 1, 1)); // Prevent going below 1
  };

  const handleIncrement = () => {
    setPositions((prev) => prev + 1);
  };

  const handleId = (id) => {
    setAddID(id);
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      name,
      // country,
      work_type: workType,
      headcount_required: positions,
    };
    console.log("reposnse here.", updatedData);
    try {
      let id = addId;
      const response = await updateByID('update/open-position-requirement?id=', id, updatedData);
      alert("Data updated successfully");
      console.log('Data updated successfully:', response.data);
    } catch (error) {
      alert("error in data update.");
      console.error('Error updating data:', error);
    }
  };

  console.log("id checking here.",addId);


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
                placeholder="Search"
                style={{
                  borderRadius: "30px",
                }}
              />
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Position Name</th>
                <th>Start Date</th>
                <th>Open Positions</th>
                <th>Location</th>
                <th>Primary Skill</th>
                <th>Secondary Skills</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {positionOpen.map((position, index) => (
                <tr key={index}>
                  <td data-label="Position Name">{position?.name}</td>
                  <td data-label="Start Date">
                    {moment(Number(position?.modified_on)).isValid()
                      ? moment(Number(position?.modified_on)).format(
                        "DD MMM YYYY"
                      )
                      : "Invalid Date"}
                  </td>
                  <td data-label="Open Positions">
                    {position?.headcount_required}
                  </td>
                  <td data-label="Location">
                    <span className="status-hiring">
                      {position?.location?.country}
                    </span>
                  </td>
                  <td data-label="Primary Skill">
                    {position?.primary_skills?.map((skill, index) => (
                      <span key={index}>{skill.skill}</span>
                    ))}
                  </td>
                  <td data-label="Secondary Skill">
                    {position?.secondary_skills?.map((skill, index) => (
                      <span key={index}>{skill.skill}</span>
                    ))}
                  </td>
                  <td data-label="">
                    <div className="table-dropdown dropdown">
                      <button
                        className="btn position-table-dot"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                      <ul
                        className="dropdown-menu position-table-drop"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li
                          onClick={() =>
                            handleCurrentProject("/EligibleBenchCandidates")
                          }
                        >
                          <img src={search} alt="search" /> Search Candidate
                          <i className="bi bi-chevron-right"></i>
                        </li>
                        <li
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => handleId(position?.id)}
                        >
                          <img src={update} alt="update" /> Update Position
                          <i className="bi bi-chevron-right"></i>
                        </li>
                        <li
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal2"
                        >
                          <img src={person} alt="person" /> Request a Partner
                          <i className="bi bi-chevron-right"></i>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <div>
              <div
                className="modal fade update"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel1"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel1">
                        Update Position
                      </h1>
                      <button
                        type="button"
                        className="btn-close closed"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <form onSubmit={handleSubmit}>
                        <div className="row row-cols-1 row-cols-lg-2 g-2 g-lg-3">
                          <div className="col label-set">
                            <label htmlFor="name" className="form-label">
                              Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                          <div className="col label-set">
                            <label htmlFor="salary" className="form-label">
                              Country List
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="salary"
                              value={country}
                              onChange={(e) => setCountry(e.target.value)}
                            />
                          </div>
                          <div className="col label-set">
                            <label htmlFor="workType" className="form-label">
                              Work Type
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="workType"
                              value={workType}
                              onChange={(e) => setWorkType(e.target.value)}
                            />
                          </div>
                          <div className="col label-set">
                            <div className="increment-decrement d-flex justify-content-between">
                              <div className="me-3">
                                <label
                                  htmlFor="numberPosition"
                                  className="form-label"
                                >
                                  Number of Positions
                                </label>
                                <div className="input-group addrequ">
                                  <button
                                    className="increment-decrement-wrap btn"
                                    type="button"
                                    onClick={handleDecrement}
                                  >
                                    -
                                  </button>
                                  <input
                                    type="text"
                                    className="form-control text-center increment-decrement-wrap"
                                    id="numberPosition"
                                    value={positions}
                                    readOnly
                                  />
                                  <button
                                    className="increment-decrement-wrap btn"
                                    type="button"
                                    onClick={handleIncrement}
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col requirenment-cancel-create-btn mb-4">
                          <div className="requirenment-cancel-create-btn d-flex justify-content-end">
                            <button type="submit" className="btn-cancel me-2">
                              Update
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="modal fade update"
                id="exampleModal2"
                tabindex="-1"
                aria-labelledby="exampleModalLabel2"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel2">
                        Update Partner
                      </h1>
                      <button
                        type="button"
                        className="btn-close closed"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="row row-cols-1 row-cols-lg-12 g-2 g-lg-3">
                          <div className="col label-set">
                            <label
                              htmlFor="selectPartners"
                              className="form-label"
                            >
                              Update Partner
                            </label>
                            <select
                              className="form-select select-name-btn"
                              id="selectPartners"
                            >
                              <option selected>BenchOnDemand LLP</option>
                              {/* <option>Vivek Test</option> */}
                            </select>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="col requirenment-cancel-create-btn mb-4">
                      <div className="requirenment-cancel-create-btn d-flex justify-content-end">
                        <button type="button" className="btn-cancel me-2">
                          Update Partner
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </table>
        </div>
      </div>
    </>
  );
};

export default OpenPosition;
