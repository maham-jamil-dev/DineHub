import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import API from "../api/api";

function RegisterPage() {

  const navigate = useNavigate();

  const [showPassword,setShowPassword]=useState(false);

  const [formData,setFormData]=useState({

    fullName:"",
    email:"",
    phone:"",
    address:"",
    password:"",
    confirmPassword:"",
    role:"customer"

  });

  const handleChange=(e)=>{

    setFormData({

      ...formData,
      [e.target.name]:e.target.value

    });

  };

  const handleSubmit=async(e)=>{

    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!strongPasswordRegex.test(formData.password)) {
      toast.error("Password must be at least 6 chars with uppercase, lowercase, number & special char (@$!%*?&)");
      return;
    }

    if (formData.phone) {
      const phoneRegex = /^[0-9+\-\s()]{7,15}$/;
      if (!phoneRegex.test(formData.phone.trim())) {
        toast.error("Please enter a valid phone number");
        return;
      }
    }

    try{

      const res=await API.post("/auth/signup",{

        fullName:formData.fullName.trim(),
        email:formData.email.trim().toLowerCase(),
        phone:formData.phone.trim(),
        address:formData.address.trim(),
        password:formData.password,
        role:formData.role

      });

      toast.success(res.data.message || "Registration successful!");

      navigate("/login");

    }

    catch(error){

      toast.error(error.response?.data?.message || "Registration Failed");

    }

  };

  return(

<div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-4 border border-gray-100">

<div className="text-center mb-8">

<img
src="/logo.png"
alt="logo"
className="h-20 w-20 mx-auto mb-4"
/>

<h2 className="text-2xl font-bold">
Create Account
</h2>

</div>

<form onSubmit={handleSubmit} className="space-y-4">

<input
type="text"
name="fullName"
placeholder="Full Name"
value={formData.fullName}
onChange={handleChange}
required
className="w-full border rounded-xl px-4 py-3"
/>

<input
type="email"
name="email"
placeholder="Email"
value={formData.email}
onChange={handleChange}
required
className="w-full border rounded-xl px-4 py-3"
/>

<input
type="text"
name="phone"
placeholder="Phone"
value={formData.phone}
onChange={handleChange}
required
className="w-full border rounded-xl px-4 py-3"
/>

<input
type="text"
name="address"
placeholder="Address"
value={formData.address}
onChange={handleChange}
className="w-full border rounded-xl px-4 py-3"
/>

<div className="relative">

<input

type={showPassword?"text":"password"}

name="password"

placeholder="Password"

value={formData.password}

onChange={handleChange}

required

className="w-full border rounded-xl px-4 py-3 pr-12"

/>

<button

type="button"

onClick={()=>setShowPassword(!showPassword)}

className="absolute right-3 top-1/2 -translate-y-1/2"

>

{showPassword?

<EyeOff className="h-5 w-5"/>:

<Eye className="h-5 w-5"/>

}

</button>

</div>

<input

type="password"

name="confirmPassword"

placeholder="Confirm Password"

value={formData.confirmPassword}

onChange={handleChange}

required

className="w-full border rounded-xl px-4 py-3"

/>

<div className="grid grid-cols-2 gap-2">

{["customer","owner"].map((role)=>(

<button

key={role}

type="button"

onClick={()=>setFormData({...formData,role})}

className={`py-3 rounded-xl ${
formData.role===role
?"bg-primary text-white"
:"bg-gray-100"
}`}

>

{role}

</button>

))}

</div>

<button

type="submit"

className="w-full bg-primary text-white py-3 rounded-xl"

>

Register

</button>

</form>

<p className="text-center mt-5">

Already have an account?{" "}

<Link to="/login" className="text-primary">

Login

</Link>

</p>

</div>

  );

}

export default RegisterPage;