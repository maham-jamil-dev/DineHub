import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function ResetPassword({ setPage, resetToken }) {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async () => {

        if (password !== confirmPassword) {

            toast.error("Passwords do not match");
            return;

        }

        try {

            setLoading(true);

            const response = await axios.post(
                `http://localhost:5000/api/reset-password/${resetToken}`,
                {
                    password
                }
            );

            toast.success(response.data.message);

            setPage("login");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Password Reset Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="form-container">

            <h1>Reset Password</h1>

            <input
                type="password"
                placeholder="Enter New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
                onClick={handleResetPassword}
                disabled={loading}
            >
                {
                    loading
                        ? "Please Wait..."
                        : "Reset Password"
                }
            </button>

        </div>

    );

}

export default ResetPassword;