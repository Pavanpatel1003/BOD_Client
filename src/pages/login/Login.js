import React, { useState, useEffect } from "react";
import logo from "../../assets/image/logo.svg";
import login from "../../assets/image/login.png";
import { FaEnvelope, FaClock } from "react-icons/fa";
import { post } from "../../services/API";
import { useDispatch } from "react-redux";
import { setAuthLogin } from "../../redux/reducers/isAuth";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [timer, setTimer] = useState(40); // Resend timer countdown
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let countdown;
        if (otpSent && timer > 0) {
            countdown = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            clearInterval(countdown);
        }
        return () => clearInterval(countdown);
    }, [otpSent, timer]);

    // API call to send OTP
    const sendOtpToEmail = async (email) => {
        try {
            const response = await post("/create/send-otp", { email });
            console.log("OTP sent to:", email);
            return { success: true };
        } catch (err) {
            console.error("Failed to send OTP:", err);
            return { success: false, message: "Failed to send OTP" };
        }
    };

    // Handle sending OTP for the first time
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setError("Please enter a valid email.");
            return;
        }

        setLoading(true);
        try {
            const response = await sendOtpToEmail(email);
            console.log("OTP response here:", response);

            if (response.success) {
                setOtpSent(true);
                toast.success("OTP sent successfully.");
                setTimer(40); // Reset timer for OTP validity
                setError("");
            } else {
                setError(response.message || "Failed to send OTP");
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
            setError("An error occurred while sending the OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Handle OTP resend
    const handleResendOtp = async () => {
        if (timer === 0) {
            const response = await sendOtpToEmail(email);
            if (response.success) {
                alert("Otp sent successfully.");
                setTimer(40); // Reset the resend timer
                setError("");
            } else {
                setError(response.message || "Failed to resend OTP");
            }
        }
    };

    const handleSubmitotp = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const res = await post("create/login", { email: email, otp: otp });

            if (res.data.code === 200) {
                dispatch(setAuthLogin({ login: true, data: res.data.data }));
                toast.success("Login successful.");
                navigate("/dashboard");
            } else {
                console.log("Error in response:", res);
                toast.error("OTP verification failed.");
            }
        } catch (error) {
            console.error("Error during OTP verification:", error);
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 g-0 mobilescreen">
                    <div className="login-image">
                        <img src={login} alt="login" />
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 loginbg">
                    <div className="login-form">
                        <div className="loginlogo">
                            <img src={logo} alt="Logo" className="logo" />
                        </div>

                        <h2>Welcome</h2>
                        <div className="container">
                            <div className="d-flex justify-content-center row">
                                <div className="col-lg-6">
                                    {!otpSent ? (
                                        <form onSubmit={handleSubmit}>
                                            <label>Login to your account</label>
                                            <div className="input-container">
                                                <span className="icon">
                                                    <FaEnvelope />
                                                </span>
                                                <input
                                                    className="email-input"
                                                    type="email"
                                                    placeholder="Email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            {error && <div className="error-message">{error}</div>}
                                            <div className="button-row">
                                                <button className="otp-button" style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center"
                                                }} type="submit">
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
                                                    ) : "Send OTP"}

                                                </button>
                                            </div>
                                        </form>
                                    ) : (
                                        <form onSubmit={handleSubmitotp}>
                                            <label>Enter the OTP sent to your email</label>
                                            <div className="input-container">
                                                <span className="icon">
                                                    <FaEnvelope />
                                                </span>
                                                <input
                                                    className="email-input"
                                                    type="text"
                                                    placeholder="OTP"
                                                    value={otp}
                                                    onChange={(e) => setOtp(e.target.value)}
                                                    required
                                                />
                                            </div>

                                            {error && <div className="error-message">{error}</div>}
                                            <div className="otp-message">
                                                An OTP has been sent to the email address and is valid
                                                for 1 minute.
                                            </div>
                                            <div className="resend-message">
                                                <FaClock /> {timer > 0 && `Re-send in ${timer} sec`}
                                            </div>
                                            <div className="button-row">
                                                <button
                                                    onClick={handleResendOtp}
                                                    disabled={timer > 0 ? true : false}
                                                    className="otp-button"
                                                    type="button"
                                                >
                                                    Resend OTP
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="otp-button"
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center"
                                                    }}
                                                    onClick={handleSubmitotp}
                                                >
                                                    {isLoading ? (
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
                                                        "Submit"
                                                    )}
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
