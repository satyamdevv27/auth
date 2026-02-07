import React from "react";
import { useState } from "react";

function Signup() {
  const [Formdata, setformdata] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    setformdata({
      ...Formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/user/signup", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Formdata),
      });
      const data = await res.json();
      alert(data.message || "signup sucess !!");
      setformdata({
        name: "",
        email: "",
        password: "",
      });
    } catch (err) {
      console.log(err);
      alert("signup failed");
    }
  };

  return (
    <>
      <form onSubmit={handlesubmit}>
        Name
        <input
          type="text"
          name="name"
          value={Formdata.name}
          placeholder="enter your name"
          onChange={handlechange}
        />
        <br />
        Email
        <input
          type="email"
          name="email"
          value={Formdata.email}
          placeholder="enter your email"
          onChange={handlechange}
        />
        <br />
        Password
        <input
          type="password"
          name="password"
          value={Formdata.password}
          placeholder="enter password"
         onChange={handlechange}
        />
        <br />
        <button type="submit">submit</button>
      </form>
    </>
  );
}

export default Signup;
