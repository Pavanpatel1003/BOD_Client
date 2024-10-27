import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import search from "../assets/image/search.svg";
import peopleCommunity from "../assets/image/peopleCommunity.svg";
import folderplus from "../assets/image/folderplus.svg";
import timebeg from "../assets/image/timebeg.svg";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  LineChart,
  Line,
} from "recharts";
import { get } from "../services/API";
import moment from "moment";


const Dashboard = () => {
  const navigate = useNavigate();
  const [project, setProject] = useState({});
  const [partnerInfo, setPartnerInfo] = useState([]);
  const handleNavigation = (path) => {
    navigate(path);
  };

  const cardItems = [
    {
      title: "Open Positions",
      number: "02",
      icon: search,
      path: "/OpenPosition",
      newTitle: "Open Positions",
    },
    {
      title: "Current Available Bench",
      number: "04",
      icon: peopleCommunity,
      path: "/CurrentBenchinfo",
      newTitle: "Current Available Bench",
    },
    {
      title: "Current Projects",
      number: "01",
      icon: folderplus,
      path: "/CurrentProject",
      newTitle: "Current Projects",
    },
    {
      title: "Upcoming Projects",
      number: "03",
      icon: timebeg,
      path: "/UpcomingProject",
      newTitle: "Upcoming Projects",
    },
  ];

  const secoundchart = [
    { name: "React", value: 1.8, fill: "#ffcc80" },
    { name: "Node.js", value: 2.0, fill: "#cfd8dc" },
    { name: "Node.js", value: 1.1, fill: "#f8bbd0" },
    { name: "Node.js", value: 1.5, fill: "#b3e5fc" },
    { name: "UI/UX", value: 1.8, fill: "#fff9c4" },
    { name: "Node.js", value: 1.5, fill: "#e1bee7" }
  ];

  const firstchart = [
    { name: '1', React: 0, Node: 0, BigData: 0, ASAPNET: 0 },
    { name: '2', React: 2, Node: 0, BigData: 0, ASAPNET: 0 },
    { name: '3', React: 0, Node: 2, BigData: 0, ASAPNET: 0 },
    { name: '4', React: 0, Node: 0, BigData: 1, ASAPNET: 0 },
    { name: '5', React: 0, Node: 0, BigData: 0, ASAPNET: 1 },
    { name: '6', React: 0, Node: 0, BigData: 0, ASAPNET: 0 },
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await get("/get/projects");
        const projectList = response.data;
        console.log("data here", projectList);
        if (projectList.status === "success") {
          setProject(projectList?.data[0]);
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchPartner = async () => {
      try {
        const response = await get("/get/partners");
        const partnerInfo = response.data;
        console.log("data here", partnerInfo);
        if (partnerInfo.status === "success") {
          setPartnerInfo(partnerInfo?.data);
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    fetchPartner();
  }, []);

  const handleCreate = (path) => {
    console.log(`Navigating to: ${path}`);
    navigate(path);
  };


  return (
    <>
      {/* cards */}
      <div className="container-fluid common-top">
        <div className="row card-box g-4">
          {cardItems.map(({ title, number, icon, path }) => (
            <div key={title} className="col-12 col-md-6 col-lg-3">
              <div
                className="card-item"
                onClick={() => handleNavigation(path)}
              >
                <div className="card-content">
                  <h3 className="number">{number}</h3>
                  <p className="text">{title}</p>
                </div>
                <div className="icon">
                  <img src={icon} alt={`${title} Icon`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts and Tables */}
      <div className="container-fluid">
        <div className="row">
          {/* First Chart: Top Available Skills */}
          <div className="col-12 col-sm-12 col-md-12 col-lg-6 mb-4">
            <div className="card">
              <div className="card-body">
                <div className="chart-dropdown">
                  <h5 className="card-title mt-2">Top Available Skills</h5>
                </div>
                <ResponsiveContainer width="100%" height={window.innerWidth < 576 ? 250 : 400}>
                  <LineChart
                    data={firstchart}
                    margin={{ top: 20, right: 20, left: window.innerWidth < 576 ? 0 : -25, bottom: 5 }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 2]} />
                    <CartesianGrid stroke="#ccc" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="React"
                      stroke="#9052ff"
                      strokeWidth={2}
                      dot={{ fill: "#9052ff", r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="Node"
                      stroke="#329bff"
                      strokeWidth={2}
                      dot={{ fill: "#329bff", r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="BigData"
                      stroke="#f5c200"
                      strokeWidth={2}
                      dot={{ fill: "#f5c200", r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="ASAPNET"
                      stroke="#777777"
                      strokeWidth={2}
                      dot={{ fill: "#777777", r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Second Chart: Total Utilized Skills */}
          <div className="col-12 col-sm-12 col-md-12 col-lg-6 mb-4">
            <div className="card">
              <div className="card-body">
                <div className="chart-dropdown d-flex justify-content-between align-items-center">
                  <h5 className="card-title">Total Utilized Skills</h5>
                  <div className="chart-drop">
                    <select className="form-select chart-box-set">
                      <option>Last Year</option>
                      <option>This Year</option>
                    </select>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={window.innerWidth < 576 ? 250 : 400}>
                  <BarChart
                    data={secoundchart}
                    margin={{ top: 20, right: 20, left: window.innerWidth < 576 ? 0 : -25, bottom: 5 }}
                    barCategoryGap="30%" // Adds more space between the bars on smaller screens
                  >
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" tick={false} /> {/* Hides the bottom text */}
                    <YAxis domain={[0, 2]} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" radius={[20, 20, 20, 20]}>
                      <LabelList
                        dataKey="name"
                        position="center"
                        fill="#000"
                        angle={-90}
                        style={{ textAnchor: "middle" }}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Current Projects Table */}
      <div className="container-fluid table-formats">
        <div className="row">
          <div className="table-heading-set">
            <h5 className="table-heading">Current Projects</h5>
            <div
              className="view-all"
              onClick={() => handleNavigation("/CurrentProject")}
            >
              View all
            </div>
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Total Contractual Employees</th>
                  <th>Project Start Date</th>
                  <th>Project End Date</th>
                  <th>Shift Timings</th>
                  <th>Hiring Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Project Name">{project?.name}</td>
                  <td data-label="Total Contractual Employees">{project?.total_candidates}</td>
                  <td data-label="Project Start Date">
                    {moment(Number(project?.start_date)).isValid()
                      ? moment(Number(project?.start_date)).format(
                        "DD MMM YYYY"
                      )
                      : "Invalid Date"}</td>
                  <td data-label="Project End Date">{moment(Number(project?.end_date)).isValid()
                    ? moment(Number(project?.end_date)).format(
                      "DD MMM YYYY"
                    )
                    : "Invalid Date"}</td>
                  <td data-label="Shift Timings">{project?.shift_timings}</td>
                  <td data-label="Hiring Status">
                    <span className="status-hiring">● Hiring</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* My Partners Table */}
      <div className="container-fluid table-formats">
        <div className="row">
          <div className="table-heading-set">
            <h5 className="table-heading">My Partners</h5>
            <div
              className="view-all"
              onClick={() => handleNavigation("/MyPartner")}
            >
              View all
            </div>
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Partner Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Point of Contact</th>
                  <th>Address</th>
                </tr>
              </thead>
              {/* <tbody>
                <tr>
                  <td data-label="Partner Name">
                    <div className="d-flex align-items-center">
                      <span className="avatar RN">BOD</span>
                      <span className="ml-2 ms-3">BenchOnDemand LLP</span>
                    </div>
                  </td>
                  <td data-label="Email">akash@benchondemand.com</td>
                  <td data-label="Phone Number">5657484934</td>
                  <td data-label="Point of Contact">Akash Paliwal</td>
                  <td data-label="Address">
                    <span className="view-details">View Details</span>
                  </td>
                </tr>
              </tbody> */}
              <tbody>
                {partnerInfo && partnerInfo?.slice(0, 3)?.map(partner => (
                  <tr key={partner.id}>
                    <td data-label="Name">{partner.name}</td>
                    <td data-label="Email">{partner.email}</td>
                    <td data-label="Phone Number">
                      {partner.phone.country_code}-{partner.phone.phone}
                    </td>
                    <td data-label="Point of Contact">{partner?.point_of_contact}</td>
                    <td data-label="Action">
                      <span className="view-details" onClick={() => handleCreate(`/PartnerDetails/${partner?.id}`)}>View Details</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
