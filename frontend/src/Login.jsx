import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Login({ setPage }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {

        try {

            setLoading(true);

            const response = await axios.post(
                "http://localhost:5000/api/login",
                {
                    email,
                    password
                }
            );

            toast.success(response.data.message);

            localStorage.setItem(
                "teacherId",
                response.data.data._id
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            setPage("student");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Login Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="form-container">

            <h1>Teacher Login</h1>

            <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button
                onClick={handleLogin}
                disabled={loading}
            >
                {
                    loading
                        ? "Please Wait..."
                        : "Login"
                }
            </button>

            <p
                onClick={() => setPage("forgot-password")}
                style={{
                    textAlign: "center",
                    marginTop: "15px",
                    color: "#2563eb",
                    cursor: "pointer"
                }}
            >
                Forgot Password?
            </p>

        </div>

    );

}

export default Login;