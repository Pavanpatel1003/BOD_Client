import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../../services/API";
import moment from "moment";
import { ThreeDots } from "react-loader-spinner";

const MyInterview = () => {
  const navigate = useNavigate();
  const [interviewData, setInterviewData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInterviewDetails = (id) => {
    console.log(`Navigating to: ${id}`);
    navigate(`/interviewdetails/${id}`);
  };


  useEffect(() => {
    const fetchInterviewData = async () => {
      setLoading(true);
      try {
        const response = await get("/get/Interviews");
        const interviews = response.data;
        console.log("shortlistedData", interviews);
        setInterviewData(interviews.data);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInterviewData();
  }, []);


  console.log("interview data", interviewData);
  return (
    <>
      <div className="container-fluid table-format">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Candidate Name</th>
                <th>Project Name</th>
                <th>Requirement Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Primary Skills</th>
                <th>View Details</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr
                >
                  <td colSpan="7"
                    style={{
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
                </tr>) : interviewData &&
              interviewData?.map((interview, index) => (
                <tr key={index}>
                  <td data-label="Candidate Name">{interview?.candidate?.name?.first_name}{" "}{interview?.candidate?.name?.last_name}</td>
                  <td data-label="Project Name">
                    {interview?.project?.name}
                  </td>
                  <td data-label="Requirement Name">{interview?.candidate?.current_designation}</td>
                  <td data-label="Date">
                    {moment(
                      Number(interview?.project?.requirement_start_date)
                    ).isValid()
                      ? moment(
                        Number(interview?.project?.requirement_start_date)
                      ).format("DD MMM YYYY")
                      : "Invalid Date"}
                  </td>
                  <td data-label="Time">{interview?.time}</td>
                  <td data-label="Status">
                    <span className="Status">
                      {interview?.project?.hiring_status
                        ? "● Hiring"
                        : "Closed"}{" "}
                    </span>
                  </td>
                  <td data-label="Primary Skills">
                    <span className="Primary Skills">
                      {" "}
                      {interview?.candidate?.skills?.primary_skills &&
                        interview?.candidate?.skills?.primary_skills?.length > 0
                        ? interview?.candidate?.skills?.primary_skills
                          ?.map((skill) => skill?.skill)
                          .join(", ")
                        : "No Skills"}
                    </span>
                  </td>
                  <td data-label="Action">
                    <span
                      className="view-details"
                      onClick={() => handleInterviewDetails(interview.id)}
                    >
                      View Details
                    </span>
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

export default MyInterview;
