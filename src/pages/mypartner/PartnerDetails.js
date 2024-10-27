import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { Delete, getBYID, updateByID } from "../../services/API";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";


const PartnerDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showBtn, setShowBtn] = useState(false);
    const [loading, setLoading] = useState(false);

    const validationSchema = Yup.object({
        partnerName: Yup.string().required("Partner Name is required !"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required !"),
        phoneNo: Yup.string().required("Phone Number is required !"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            alternate_email: "",
            point_of_contact: "",
            phone: "",
            alternate_phone: "",
        },
        // validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log("form submit values here.", values);
            setLoading(true)
            try {
                const response = await updateByID(`/update/partner?id=`, id, {
                    name: values.name,
                    email: values.email,
                    alternate_email: values.alternate_email,
                    point_of_contact: values.point_of_contact,
                    phone: {
                        phone: values.phone,
                        country_code: values.country_code ? values.country_code : "+91",
                    },
                    alternate_phone: {
                        phone: values.alternate_phone,
                        country_code: values.country_code ? values.country_code : "+91",
                    },
                });

                const projectDetails = response.data;

                if (projectDetails?.status === "success") {
                    setShowBtn(false);
                    toast.success("Partner Detail Updated.");
                }
                console.log("partner updated", projectDetails);
            } catch (error) {
                console.error("Error updating partner details:", error);
            } finally {
                setLoading(false);
            }
        },
    });

    useEffect(() => {
        getBYID(`get/partner?id=`, id).then((response) => {
            const projectDetails = response.data;
            if (projectDetails?.data) {
                formik.setFieldValue("name", projectDetails?.data?.name);
                formik.setFieldValue("email", projectDetails?.data?.email);
                formik.setFieldValue(
                    "alternate_email",
                    projectDetails?.data?.alternate_email
                );
                formik.setFieldValue(
                    "point_of_contact",
                    projectDetails?.data?.point_of_contact
                );
                formik.setFieldValue("phone", projectDetails?.data?.phone?.phone);
                formik.setFieldValue(
                    "alternate_phone",
                    projectDetails?.data?.alternate_phone?.phone
                );
            }
        });
    }, [id]);

    const handleDelete = () => {
        Delete(`delete/partner?id=`, id).then((response) => {
            console.log("delete id response here.", response);
            const result = response.data;
            if (result?.status === "success") {
                console.log("cProject", result);
                navigate("/MyPartner");
            }
        });
    };

    const handleBtn = () => {
        setShowBtn(true);
    };

    return (
        <>
            <div className="container-fluid table-format">
                <div className="table-heading">

                    <div
                        className="table-heading"
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <h5>Partner Details</h5>
                        <div onClick={handleBtn} style={{ cursor: "pointer" }}>
                            <i
                                className="fa-regular fa-pen-to-square"
                                style={{ fontSize: "25px" }}
                            ></i>
                        </div>
                    </div>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-2 g-lg-4">
                        {[
                            { label: "Partner Name", name: "name", type: "text" },
                            { label: "Email", name: "email", type: "email" },
                            {
                                label: "Alternative Email",
                                name: "alternate_email",
                                type: "email",
                            },
                            {
                                label: "Point Of Contact",
                                name: "point_of_contact",
                                type: "text",
                            },
                            { label: "Phone*", name: "phone", type: "tel" },
                            {
                                label: "Alternate Phone",
                                name: "alternate_phone",
                                type: "tel",
                            },
                        ].map(({ label, name, type }) => (
                            <div key={name} className="col label-set">
                                <label htmlFor={name} className="form-label">
                                    {label}
                                </label>
                                <input
                                    type={type}
                                    className="form-control"
                                    id={name}
                                    name={name}
                                    placeholder={`Enter ${label.toLowerCase()}`}
                                    value={formik.values[name]}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched[name] && formik.errors[name] ? (
                                    <div className="text-danger">{formik.errors[name]}</div>
                                ) : null}
                            </div>
                        ))}
                    </div>
                    <div className="partner-details-create-btn">
                        <div className="top-space">
                            {showBtn && (
                                <div className="top-space" style={{ display: "flex", gap: "30px" }}>
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
                    </div>
                </form>
            </div>
        </>
    );
};

export default PartnerDetails;
