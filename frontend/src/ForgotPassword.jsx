import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function ForgotPassword({ setPage, setResetToken }) {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleForgotPassword = async () => {

        try {

            setLoading(true);

            const response = await axios.post(
                "http://localhost:5000/api/forgot-password",
                {
                    email
                }
            );

            toast.success(response.data.message);

            setResetToken(response.data.resetToken);

            setPage("reset-password");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Forgot Password Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="form-container">

            <h1>Forgot Password</h1>

            <input
                type="email"
                placeholder="Enter Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <button
                onClick={handleForgotPassword}
                disabled={loading}
            >
                {
                    loading
                        ? "Please Wait..."
                        : "Continue"
                }
            </button>

            <button
                onClick={() => setPage("login")}
                style={{ marginTop: "10px" }}
            >
                Back to Login
            </button>

        </div>

    );

}

export default ForgotPassword;