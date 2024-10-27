import React, { useState } from "react";
import notepedblack from "../../assets/image/notepedblack.png";

const AddRequirement = () => {
  const [positions, setPositions] = useState(1);
  const [experience, setExperience] = useState(1);
  const [informPartners, setInformPartners] = useState(false); // State to track checkbox

  const handleIncrement = (setter, value) => {
    setter(value + 1);
  };

  const handleDecrement = (setter, value) => {
    if (value > 1) {
      setter(value - 1);
    }
  };

  return (
    <div className="container-fluid table-format">
      <div className="table-heading">
        <h5>Add a New Requirement</h5>
      </div>
      <form>
        <div className="row row-cols-1 row-cols-lg-3 g-2 g-lg-3">
          <div className="col label-set">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value="Ui/UX Project"
            />
          </div>
          <div className="col label-set">
            <label htmlFor="startDate" className="form-label">
              Start Date
            </label>
            <input
              type="text"
              className="form-control"
              id="startDate"
              placeholder="DD-MM-YY"
            />
          </div>
          <div className="col label-set">
            <label htmlFor="countryList" className="form-label">
              Country List
            </label>
            <input
              type="text"
              className="form-control"
              id="countryList"
              value="Afghanistan"
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
              value="Remote"
            />
          </div>
          <div className="col label-set">
            <div className="increment-decrement d-flex justify-content-between">
              <div className="me-3">
                <label htmlFor="numberPosition" className="form-label">
                  Number of Positions
                </label>
                <div className="input-group addrequ">
                  <button
                    className="increment-decrement-wrap btn"
                    type="button"
                    onClick={() => handleDecrement(setPositions, positions)}
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
                    onClick={() => handleIncrement(setPositions, positions)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="experienceRequired" className="form-label">
                  Experience Required
                </label>
                <div className="input-group addrequ">
                  <button
                    className="increment-decrement-wrap btn"
                    type="button"
                    onClick={() => handleDecrement(setExperience, experience)}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    className="form-control text-center increment-decrement-wrap"
                    id="experienceRequired"
                    value={experience}
                    readOnly
                  />
                  <button
                    className="increment-decrement-wrap btn"
                    type="button"
                    onClick={() => handleIncrement(setExperience, experience)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-lg-3 g-2 g-lg-3 mt-3">
          <div className="col label-set">
            <label htmlFor="primarySkills" className="form-label">
              Primary skill(s) with experience
            </label>
            <div className="input-icon">
              <input
                type="text"
                className="form-control"
                id="primarySkills"
                placeholder="Type to search"
              />
              <i className="fa-solid fa-trash"></i>{" "}
            </div>
          </div>
          <div className="col label-set">
            <label htmlFor="secondarySkills" className="form-label">
              Secondary skill(s) with experience
            </label>
            <div className="input-icon">
              <input
                type="text"
                className="form-control"
                id="secondarySkills"
                placeholder="Type to search"
              />
              <i className="fa-solid fa-trash"></i>{" "}
            </div>
          </div>
          <div className="col label-set">
            <label htmlFor="uploadJobDescription" className="form-label">
              Upload Job Description
            </label>
            <div className="input-icon">
              <input
                type="file"
                className="form-control"
                id="uploadJobDescription"
              />
              <i className="fa-solid fa-upload"></i>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col label-set">
            <label htmlFor="informPartners" className="form-label">
              Inform Partners
            </label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="sendUpdates"
                checked={informPartners}
                onChange={() => setInformPartners(!informPartners)}
              />
              <label className="form-check-label" htmlFor="sendUpdates">
                {/* {informPartners ? "Yes" : "No"} */}
              </label>
            </div>
          </div>
        </div>

        {/* Conditionally show "Select Partners" section based on checkbox */}
        {informPartners && (
          <div className="row mt-3">
            <div className="col label-set">
              <label htmlFor="selectPartners" className="form-label">
                Select Partners
              </label>
              <select className="form-select select-name-btn" id="selectPartners">
                <option selected>Akash Test</option>
                <option>Vivek Test</option>
              </select>
              <div className="select-name">
                Akash Test <i className="fas fa-times"></i>
              </div>
            </div>
            <div className="col label-set"></div>
            <div className="col requirenment-cancel-create-btn">
              <div className="requirenment-cancel-create-btn d-flex justify-content-end">
                <button type="button" className="btn-cancel me-2">
                  <i className="fas fa-times"></i> Cancel
                </button>
                <button type="submit" className="btn-create">
                  <span className="me-2">
                    <img src={notepedblack} alt="" />
                  </span>
                  <span>Create</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddRequirement;
