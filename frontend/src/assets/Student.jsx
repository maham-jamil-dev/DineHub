import "./Student.css";
import axios from "axios";
import {
  useState,
  useEffect,
  useCallback
} from "react";
import toast from "react-hot-toast";

function Student({ setPage }) {

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const getStudents = useCallback(async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:5000/api/student?search=${search}`,
        {
          headers: {
            Authorization: token
          }
        }
      );

      setStudents(response.data.data);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to Load Students"
      );

    }

  }, [search]);

  useEffect(() => {

    getStudents();

  }, [getStudents]);

  const handleStudent = async () => {

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      if (editingId) {

        const response = await axios.put(
          `http://localhost:5000/api/student/${editingId}`,
          {
            name,
            age,
            course,
            email
          },
          {
            headers: {
              Authorization: token
            }
          }
        );

        toast.success(response.data.message);

        setEditingId(null);

      } else {

        const response = await axios.post(
          "http://localhost:5000/api/student",
          {
            name,
            age,
            course,
            email
          },
          {
            headers: {
              Authorization: token
            }
          }
        );

        toast.success(response.data.message);

      }

      setName("");
      setAge("");
      setCourse("");
      setEmail("");

      getStudents();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Student Operation Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  const handleEdit = (student) => {

    setEditingId(student._id);

    setName(student.name);
    setAge(student.age);
    setCourse(student.course);
    setEmail(student.email);

  };

  const handleDelete = async (id) => {

    try {

      const token = localStorage.getItem("token");

      const confirmDelete = window.confirm(
        "Delete this student?"
      );

      if (!confirmDelete) return;

      const response = await axios.delete(
        `http://localhost:5000/api/student/${id}`,
        {
          headers: {
            Authorization: token
          }
        }
      );

      toast.success(response.data.message);

      getStudents();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Delete Failed"
      );

    }

  };

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("teacherId");

    toast.success("Logout Successful");

    setPage("login");

  };

  return (

    <div>

      <div className="dashboard-header">

        <h1>Teacher Dashboard</h1>

        <p>Manage your students efficiently</p>

      </div>

      <div className="stats">

        <div className="card">

          <h3>Total Students</h3>

          <h1>{students.length}</h1>

        </div>

      </div>

      <div className="dashboard">

        <div className="form-container">

          <div className="header">

            <h2>Student Form</h2>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

          <input
            type="text"
            placeholder="Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <input
            type="text"
            placeholder="Course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />

          <input
            type="email"
            placeholder="Student Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            onClick={handleStudent}
            disabled={loading}
          >
            {
              loading
                ? "Please Wait..."
                : editingId
                ? "Update Student"
                : "Add Student"
            }
          </button>

        </div>

        <div className="student-list">

          <h2>Student List</h2>

          <input
            type="text"
            placeholder="Search Student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <table>

            <thead>

              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Course</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>

            </thead>

            <tbody>

              {
                students.length > 0 ?

                  students.map((student) => (

                    <tr key={student._id}>

                      <td>{student.name}</td>
                      <td>{student.age}</td>
                      <td>{student.course}</td>
                      <td>{student.email}</td>

                      <td>

                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(student)}
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDelete(student._id)
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))

                  :

                  <tr>

                    <td
                      colSpan="5"
                      style={{ textAlign: "center" }}
                    >
                      No Students Found
                    </td>

                  </tr>
              }

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

export default Student;