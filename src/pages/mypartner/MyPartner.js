import React, { useEffect, useState } from "react";
import noteped from "../../assets/image/noteped.png";
import { useNavigate } from "react-router-dom";
import { get } from "../../services/API";
import { ThreeDots } from "react-loader-spinner";

const MyPartner = () => {
  const navigate = useNavigate();

  const handleCreate = (path) => {
    console.log(`Navigating to: ${path}`);
    navigate(path);
  };

  const [partnerInfo, setPartnerInfo] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPartnerData = async () => {
      setLoading(true);
      try {
        const response = await get("/get/partners");
        const partners = response.data;
        console.log("shortlistedData", partners);
        setPartnerInfo(partners.data);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPartnerData();
  }, []);

  return (
    <>
      <div className="container-fluid table-format">
        <div className="create-btn-set">
          <button
            className="create-btn"
            onClick={() => handleCreate("/Create")}
          >
            <span className="me-3">
              <img src={noteped} alt="noteped" />
            </span>
            <span>Create</span>
          </button>
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Point of Contact</th>
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
              ) : partnerInfo && partnerInfo?.map((partner) => (
                <tr key={partner.id}>
                  <td data-label="Name">{partner.name}</td>
                  <td data-label="Email">{partner.email}</td>
                  <td data-label="Phone Number">
                    {partner.phone.country_code}-{partner.phone.phone}
                  </td>
                  <td data-label="Point of Contact">
                    {partner.point_of_contact}
                  </td>
                  <td data-label="Action">
                    <span
                      className="view-details"
                      onClick={() =>
                        handleCreate(`/PartnerDetails/${partner?.id}`)
                      }
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

export default MyPartner;
