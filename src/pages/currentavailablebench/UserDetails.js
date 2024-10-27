import React from "react";
import beg from "../../assets/image/beg.png";
import outline from "../../assets/image/outline.png";
import phone from "../../assets/image/phone.png";

const UserDetails = () => {
  return (
    <>
      <div className="container-fluid person-details-data table-format">
        <div className="person-details-data-set">
          <div>
            <div className="person-avatar">RN</div>
          </div>
          <div className="person-details-data-wrap">
            <h4>Renu Kumar</h4>
            <div className="person-details">
              <p className="mb-0">
                <span className="me-2">
                  <img src={beg} alt="beg" />
                </span>
                <span>Sr. Consultant Data bricks</span>
              </p>
              <p>
                <span className="me-2">
                  <img src={phone} alt="beg" />
                </span>
                <span>6758453423</span>
              </p>
              <p>
                <span className="me-2">
                  <img src={outline} alt="beg" />
                </span>
                <span className="mail">renukumar@gmail.com</span>
              </p>
              <p className="mb-3">
                <span className="view-details">View Resume</span>
              </p>
            </div>
            <p className="mb-0 mt-2">
              <span className="person-title">Gender : </span>Male
            </p>
          </div>
        </div>
      </div>

      <div className="container-fluid table-format">
          <div className="table-heading">
            <h5>Summary</h5>
          </div>
        <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-4 g-2 g-lg-3">
          <div className="col">
            <div className="summary-card">
              <h6>Status</h6>
              <p>Lorem Ipsum</p>
            </div>
          </div>
          <div className="col">
            <div className="summary-card">
              <h6>Primary Skills</h6>
              <p>Big Data</p>
            </div>
          </div>
          <div className="col">
            <div className="summary-card">
              <h6>Secondary Skills</h6>
              <p>AI ML</p>
            </div>
          </div>
          <div className="col">
            <div className="summary-card">
              <h6>Client Name</h6>
              <p>India</p>
            </div>
          </div>
          <div className="col">
            <div className="summary-card">
              <h6>Project Name</h6>
              <p>Lorem Ipsum</p>
            </div>
          </div>
          <div className="col">
            <div className="summary-card">
              <h6>Start Date</h6>
              <p>22 July 2024</p>
            </div>
          </div>
          <div className="col">
            <div className="summary-card">
              <h6>Locations</h6>
              <p>India</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
