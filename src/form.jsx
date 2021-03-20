import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function BasicTextFields() {
  const classes = useStyles();
  const initialFormData = Object.freeze({
    name:"",
    email: "",
    password: "",
    role: ""
  });
  const initialLoginFormData = Object.freeze({
    email: "",
    password: ""
  });

  const [formData, updateFormData] = React.useState(initialFormData);
  const [formLoginData, updateLoginFormData] = React.useState(
    initialLoginFormData
  );

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleLoginChange = (e) => {
    updateLoginFormData({
      ...formLoginData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    axios.post("http://localhost:5000/api/v1/auth/register", formData).then(alert('Registration success'));
    // ... submit to API or something
  };
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(formLoginData);
    axios
      .post("http://localhost:5000/api/v1/auth/login", formLoginData)
      .then((e) => {
        localStorage.setItem("_jid", e.token);
        alert("Login success");
      });
  };

  return (
    <>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="standard-basic"
          label="name"
          name="name"
          onChange={handleChange}
        />
        <TextField
          id="standard-basic"
          label="email"
          name="email"
          onChange={handleChange}
        />
        <TextField
          id="filled-basic"
          type="password"
          label="password"
          variant="filled"
          name="password"
          onChange={handleChange}
        />
        <TextField
          id="outlined-basic"
          label="role"
          variant="outlined"
          name="role"
          onChange={handleChange}
        />
        <Button onClick={handleSubmit} variant="contained">
          Register
        </Button>
      </form>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="standard-basic"
          label="email"
          name="email"
          onChange={handleLoginChange}
        />
        <TextField
          id="filled-basic"
          type="password"
          label="password"
          variant="filled"
          name="password"
          onChange={handleLoginChange}
        />
        <Button onClick={handleLogin} variant="contained">
          Login
        </Button>
      </form>
    </>
  );
}
