import React, { useEffect, useState } from "react";
import { get } from "../../services/API";
import moment from "moment";
import { ThreeDots } from "react-loader-spinner";

const ShortlistCandidates = () => {
  const [shortlistedData, setShortlistedData] = useState([]);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true); 
      try {
        const response = await get("/get/candidates");
        const shortlistCandidate = response.data;
        console.log("shortlistedData", shortlistCandidate);
        setShortlistedData(shortlistCandidate.data);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      } finally {
        setLoading(false); 
      }
    };
    fetchCandidates();
  }, []);

  console.log("shortlisted candidated", shortlistedData);

  return (
    <>
      <div className="container-fluid table-format">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Requirement Name</th>
                <th>Candidate Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Interview Status</th>
                <th>View Details</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr
                >
                  <td colSpan="7" style={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}>
                    <ThreeDots
                      visible={true}
                      height="50"
                      width="50"
                      color="#89609e"
                      radius="9"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  </td>
                </tr>
              ) : shortlistedData &&
                shortlistedData?.map((shortlist, index) => (
                  <tr key={index}>
                    <td data-label="Project Name">{shortlist?.project_name}</td>
                    <td data-label="Requirement Name">
                      {shortlist?.current_designation}
                    </td>
                    <td data-label="Candidate Name">
                      {shortlist?.name?.first_name +
                        " " +
                        shortlist?.name?.last_name}
                    </td>
                    <td data-label="Date">
                      {shortlist?.interviews?.map((el, i) => (
                        <span key={i}>
                          {" "}
                          {moment(Number(el?.date)).isValid()
                            ? moment(Number(el?.date)).format("DD MMM YYYY")
                            : "Invalid Date"}
                        </span>
                      ))}
                    </td>
                    <td data-label="Time">
                      {shortlist?.interviews?.map((el, i) => (
                        <span key={i}>
                          {el?.time}
                        </span>
                      ))}

                    </td>
                    <td data-label="Interview Status">
                      {shortlist?.interviews?.map((el, i) => (
                        <span key={i}>
                          {el?.interview_status}
                        </span>
                      ))}
                    </td>
                    <td data-label="View Details">
                      <span className="view-details">Onboard</span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ShortlistCandidates;
