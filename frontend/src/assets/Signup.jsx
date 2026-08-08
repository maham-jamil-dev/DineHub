import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

function Signup({ setPage }) {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [city, setCity] = useState("");
    const [userState, setUserState] = useState("");
    const [country, setCountry] = useState("");
    const [phoneNo, setPhoneNo] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {

        try {

            setLoading(true);

            const data = {
                firstName,
                lastName,
                email,
                password,
                dob,
                gender,
                city,
                state: userState,
                country,
                phoneNo
            };

            const response = await axios.post(
                "http://localhost:5000/api/signup",
                data
            );

            toast.success(response.data.message);

            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setDob("");
            setGender("");
            setCity("");
            setUserState("");
            setCountry("");
            setPhoneNo("");

            setPage("login");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Signup Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="form-container">

            <h1>Teacher Signup</h1>

            <input
                type="text"
                placeholder="Enter First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />

            <input
                type="text"
                placeholder="Enter Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />

            <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
            />

            <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
            >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>

            <input
                type="text"
                placeholder="Enter City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />

            <input
                type="text"
                placeholder="Enter State"
                value={userState}
                onChange={(e) => setUserState(e.target.value)}
            />

            <input
                type="text"
                placeholder="Enter Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
            />

            <input
                type="text"
                placeholder="Enter Phone Number"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
            />

            <button
                onClick={handleSignup}
                disabled={loading}
            >
                {loading ? "Creating Account..." : "Register"}
            </button>

        </div>

    );

}

export default Signup;