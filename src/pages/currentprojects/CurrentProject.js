import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { get } from "../../services/API";
import { ThreeDots } from "react-loader-spinner";

const CurrentProject = () => {
  const navigate = useNavigate();

  const [cProject, setCProject] = useState([]);
  const [currentTime, setCurrentTime] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await get("/get/projects");
        const projectList = response.data;
        console.log("data here", projectList);
        if (projectList.status === "success") {
          setCProject(projectList?.data);
        } else {
          setError("Failed to fetch projects.");
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Error fetching projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleCurrentProject = async (id) => {
    navigate(`/CurrentProjectDetails/${id}`);
  };

  return (
    <>
      <div className="container-fluid table-format">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Resource Name</th>
                <th>Total Contractual Employees</th>
                <th>Project Start Date</th>
                <th>Project End Date</th>
                <th>Shift Timings</th>
                <th>Status</th>
                <th>Action</th>
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
              ) : error ? (
                <td colSpan="7" style={{ textAlign: "center" }}>
                  {error}
                </td>
              ) : cProject.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No projects found.
                  </td>
                </tr>
              ) : (
                cProject &&
                cProject?.map((project, index) => (
                  <tr key={index}>
                    <td data-label="Resource Name">{project.name}</td>
                    <td data-label="Total Contractual Employees">
                      {project.total_candidates}
                    </td>
                    <td data-label="Project Start Date">
                      {moment(Number(project?.start_date)).isValid()
                        ? moment(Number(project?.start_date)).format(
                          "DD MMM YYYY"
                        )
                        : "Invalid Date"}
                    </td>
                    <td data-label="Project End Date">
                      {moment(Number(project?.end_date)).isValid()
                        ? moment(Number(project?.end_date)).format(
                          "DD MMM YYYY"
                        )
                        : "Invalid Date"}
                    </td>
                    <td data-label="Shift Timings">{project.shift_timings}</td>
                    <td data-label="Status">
                      <span className="status-hiring">● Hiring</span>
                    </td>
                    <td data-label="Action">
                      <span
                        className="view-details"
                        onClick={() => handleCurrentProject(project.id)}
                      >
                        View Details
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CurrentProject;
