import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Delete, getBYID, updateByID } from "../../services/API";
import { useParams } from "react-router-dom";
import moment from "moment";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

const ProjectDetails = () => {
  const navigate = useNavigate();
  const [showBtn, setShowBtn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    start_date: "",
    end_date: "",
    total_candidates: "",
    description: "",
  });
  const { id } = useParams();

  const handleRequirement = (path) => {
    console.log(`Navigating to: ${path}`);
    navigate(path);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "start_date" || name === "end_date") {
      const dateValue = moment(value).isValid() ? moment(value).valueOf() : "";
      setData((prevData) => ({
        ...prevData,
        [name]: dateValue,
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    getBYID(`get/project?id=`, id).then((response) => {
      const projectDetails = response.data;
      if (projectDetails?.data) {
        setData({
          ...projectDetails.data,
          start_date: moment(Number(projectDetails.data.start_date)).format(
            "YYYY-MM-DD"
          ),
          end_date: moment(Number(projectDetails.data.end_date)).format(
            "YYYY-MM-DD"
          ),
        });
      }
      console.log("cProject", projectDetails);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("data", data);

    try {
      const response = await updateByID(`/update/project?id=`, id, {
        name: data?.name,
        start_date: data?.start_date,
        end_date: data?.end_date,
        total_candidates: data?.total_candidates,
        description: data?.description,
      });
      const projectDetails = response.data;
      if (projectDetails?.status === "success") {
        toast.success("Project Details Updated.")
        setShowBtn(false);
      }
      console.log("updated Project", projectDetails);
    } catch (err) {
      console.error("Error updating project:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (Id) => {
    Delete(`delete/project?id=`, Id).then((response) => {
      console.log("delete id response here.", response);
      const result = response.data;
      if (result?.status === "success") {
        console.log("cProject", result);
        navigate("/CurrentProject");
      }
    });
    console.log("delete id here.", Id);
  };

  const handleBtn = () => {
    setShowBtn(true);
  };

  const closedPosition = data?.open_positions?.filter((el) => el.position_closed);
  const openPosition = data?.open_positions?.filter((el) => !el.position_closed);

  console.log("open closed position.", closedPosition, openPosition);

  return (
    <>
      <div className="container-fluid table-format">
        <div
          className="table-heading"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h5>Project Details</h5>
          <div onClick={handleBtn} style={{ cursor: "pointer" }}>
            <i
              className="fa-regular fa-pen-to-square"
              style={{ fontSize: "25px" }}
            ></i>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-3 g-2 g-lg-4">
            <div className="col label-set">
              <label for="projectName">Name</label>
              <input
                type="text"
                className="form-control"
                id="projectName"
                placeholder="Ui/UX Project"
                name="name"
                value={data.name}
                onChange={handleChange}
              />
            </div>
            <div className="col label-set">
              <label for="startDate">Start Date</label>
              <input
                type="date"
                className="form-control"
                id="startDate"
                name="start_date"
                placeholder="DD-MM-YY"
                value={
                  moment(data.start_date).isValid()
                    ? moment(data.start_date).format("YYYY-MM-DD")
                    : ""
                }
                onChange={handleChange}
              />
            </div>
            <div className="col label-set">
              <label for="endDate">End Date</label>
              <input
                type="date"
                className="form-control"
                id="endDate"
                name="end_date"
                placeholder="DD-MM-YY"
                value={
                  moment(data.end_date).isValid()
                    ? moment(data.end_date).format("YYYY-MM-DD")
                    : ""
                }
                onChange={handleChange}
              />
            </div>
            <div className="col label-set">
              <label for="totalHeadcount">Total Headcount</label>
              <input
                type="number"
                className="form-control"
                id="totalHeadcount"
                name="total_candidates"
                placeholder="0"
                value={data.total_candidates}
                onChange={handleChange}
              />
            </div>
            <div className="col label-set">
              <label for="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                placeholder="UI/UX or the web portal"
                value={data.description}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="project-details-button-set">
            <div>
              <button
                type="button"
                className="btn btn-requirement btn-block"
                onClick={() => handleRequirement("/AddRequirement")}
              >
                Add Requirement
              </button>
            </div>
            {showBtn && (
              <div className="top-space" 
              style={{ display: "flex", gap: "30px" }}
              >
                <button
                  type="button"
                  // onClick={() => handleDelete(data?.id)}
                  onClick={() => setShowBtn(!showBtn)}
                  className="btn-cancel me-3"
                >
                  <span className="me-2">
                    <i className="fa-solid fa-xmark"></i>
                  </span>
                  <span>Cancel</span>
                </button>
                <button type="submit" className="btn-cancel"
                  style={{ display: "flex", gap: "2px" }}>
                  {loading ? (
                    <ThreeDots
                      visible={true}
                      height="50"
                      width="50"
                      color="#FFFFFF"
                      radius="9"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  ) : (
                    <>
                      <span className="me-2">
                        <i className="fa-solid fa-arrows-rotate"></i>
                      </span>
                      <span>
                        Update
                      </span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </form>
      </div>

      <div className="container-fluid table-formatss">
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button accordian-text"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                <div className="table-headings">
                  <h5>Open Position</h5>
                </div>
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Position Name</th>
                        <th>Open Position</th>
                        <th>Closed Position</th>
                        <th>Primary Skills</th>
                        <th>Location</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data && openPosition?.length > 0 ?
                        openPosition?.map((position, i) => (
                          <tr key={i}>
                            <td data-label="Position Name">{position?.name}</td>
                            <td data-label="Open Position">
                              {position?.open_position_count
                                ? position?.open_position_count
                                : 0}
                            </td>
                            <td data-label="Closed Position">
                              {position?.closed_position_count}
                            </td>
                            <td data-label="Primary Skills">
                              {position?.primary_skills &&
                                position.primary_skills.length > 0
                                ? position.primary_skills
                                  .map((skill) => skill?.skill)
                                  .join(", ")
                                : "No Skills"}
                            </td>
                            <td data-label="Location">
                              {position?.location?.city}
                            </td>
                          </tr>
                        )) :
                        <tr>
                          <td colSpan={5}>
                            Open Position Not Found.
                          </td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid table-formatss">
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button accordian-text"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                <div className="table-headings">
                  <h5>Closed Position</h5>
                </div>
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Position Name</th>
                        <th>Open Position</th>
                        <th>Closed Position</th>
                        <th>Primary Skills</th>
                        <th>Location</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data && closedPosition?.length > 0 ?
                        closedPosition?.map((position, i) => (
                          <tr key={i}>
                            <td data-label="Position Name">{position?.name}</td>
                            <td data-label="Open Position">
                              {position?.open_position_count
                                ? position?.open_position_count
                                : 0}
                            </td>
                            <td data-label="Closed Position">
                              {position?.closed_position_count}
                            </td>
                            <td data-label="Primary Skills">
                              {position?.primary_skills &&
                                position.primary_skills.length > 0
                                ? position.primary_skills
                                  .map((skill) => skill?.skill)
                                  .join(", ")
                                : "No Skills"}
                            </td>
                            <td data-label="Location">
                              {position?.location?.city}
                            </td>
                          </tr>
                        )) :
                        <tr>
                          <td colSpan={5}>
                            Closed Position Not Found.
                          </td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
