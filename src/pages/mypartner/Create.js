import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import axios from "axios"; // Make sure to install axios if you haven't already
import { postPartner } from "../../services/API";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";

const Create = () => {
  const { logData } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  // Validation Schema using Yup
  const validationSchema = Yup.object({
    partnerName: Yup.string().required("Partner Name is required!"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required!"),
    phoneNo: Yup.string().required("Phone Number is required!"),
    altEmail: Yup.string().email("Invalid email address"),
    altPhone: Yup.string(),
    pointOfContact: Yup.string(),
  });

  console.log("partner details:", logData);

  const formik = useFormik({
    initialValues: {
      partnerName: "",
      email: "",
      phoneNo: "",
      altEmail: "",
      altPhone: "",
      pointOfContact: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("form submit values:", values);
      setLoading(true);
      const data = {
        name: values.partnerName,
        alternate_email: values.altEmail,
        alternate_phone: { phone: values.altPhone, country_code: "+91" },
        phone: { phone: values.phoneNo, country_code: "+91" },
        email: values.email,
        point_of_contact: values.pointOfContact,
      };
      try {
        const response = await postPartner(
          "create/partner?client_id=",
          logData?.id,
          data
        );
        if (response?.data) {
          toast.success("Partner Created Successful.");
        }
        console.log("Response:::::::::::::;", response.data);
      } catch (error) {
        toast.warn(error.response?.data?.message)
        console.error("Error submitting the form:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="container-fluid table-format">
      <div className="table-heading">
        <h5>Partner Details</h5>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-2 g-lg-4">
          <div className="col label-set">
            <label htmlFor="email" className="form-label">
              Email*
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter an email address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-danger">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="col label-set">
            <label htmlFor="partnerName" className="form-label">
              Partner Name*
            </label>
            <input
              type="text"
              className="form-control"
              id="partnerName"
              name="partnerName"
              placeholder="Enter a partner name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.partnerName}
            />
            {formik.touched.partnerName && formik.errors.partnerName ? (
              <div className="text-danger">{formik.errors.partnerName}</div>
            ) : null}
          </div>
          <div className="col label-set">
            <label htmlFor="phoneNo" className="form-label">
              Phone*
            </label>
            <input
              type="tel"
              className="form-control"
              id="phoneNo"
              name="phoneNo"
              placeholder="+91 (IND) Enter a phone number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNo}
            />
            {formik.touched.phoneNo && formik.errors.phoneNo ? (
              <div className="text-danger">{formik.errors.phoneNo}</div>
            ) : null}
          </div>
          <div className="col label-set">
            <label htmlFor="altEmail" className="form-label">
              Alternative Email
            </label>
            <input
              type="email"
              className="form-control"
              id="altEmail"
              name="altEmail"
              placeholder="Enter an alternative email address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.altEmail}
            />
            {formik.touched.altEmail && formik.errors.altEmail ? (
              <div className="text-danger">{formik.errors.altEmail}</div>
            ) : null}
          </div>
          <div className="col label-set">
            <label htmlFor="altPhone" className="form-label">
              Alternate Phone
            </label>
            <input
              type="tel"
              className="form-control"
              id="altPhone"
              name="altPhone"
              placeholder="+91 (IND) Enter an alternate number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.altPhone}
            />
            {formik.touched.altPhone && formik.errors.altPhone ? (
              <div className="text-danger">{formik.errors.altPhone}</div>
            ) : null}
          </div>
          <div className="col label-set">
            <label htmlFor="pointOfContact" className="form-label">
              Point Of Contact
            </label>
            <input
              type="text"
              className="form-control"
              id="pointOfContact"
              name="pointOfContact"
              placeholder="Enter a point of contact"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.pointOfContact}
            />
            {formik.touched.pointOfContact && formik.errors.pointOfContact ? (
              <div className="text-danger">{formik.errors.pointOfContact}</div>
            ) : null}
          </div>
        </div>
        <div className="partner-details-create-btn">
          <button type="submit" className="partner-details-create-btn-wrap">
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
              "Create a Partner"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
