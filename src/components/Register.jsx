import React, { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const handleSubmit = async(e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:8080/api/v1/register",{name, email, password});
    console.log("__________sas", res)
    if(res.data.status === "Success"){
      localStorage.setItem("userData", JSON.stringify(res.data.userData));
      navigate(`/dashboard/${res.data.userData._id}`)
    }
  }

  const navigateToLogin = async(path) => {
    navigate(path)
  }
    
  return (
   
    <div style={styles.formContainer}>
      <h2 style={styles.formTitle}>TASK MANAGEMENT </h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.formContent}>
          <h3>Register </h3>

          <div className="form-group mt-3">
            <label>Name</label>
            <input
              type="name"
              className="form-control mt-1"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group mt-3">
            <label>Email</label>
            <input
              type="email"
              value={email}
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}

            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="text"
              value={password}
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              

            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button className="link-btn"onClick={() => navigateToLogin("/")}>
            Already have an account? Login here.
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Register


//________________CSSS


const styles = {
    formTitle : {
        fontSize:"30px",
        fontWeight: "bold",
        color:"blue",
        textAlign:"center",
        marginTop:"25px",
        textDecoration:"underline"
    },
    formContainer :{
        justifycontent: "center",
        alignitems: "center",
        width: "400px",
        height: "400px",
        marginTop:"150px",
        margin: "auto"
    },

    form:{
        width: "420px",
        height: "400px",

        boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px",
        paddingTop: "30px",
        paddingBottom: "20px",
        borderRadius: "8px",
        backgroundColor: "white",
    },

    formContent:{
        paddingLeft: "12%",
        paddingRight: "12%"
    },

}

