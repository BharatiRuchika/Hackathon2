import React from "react";
import { BrowserRouter, Switch, Route, Redirect, NavLink, useHistory } from "react-router-dom";
import { Table } from "react-bootstrap";
// import histrory from 'history';
// import Login from "./login";
// import React from "react";
// import ReactDOM from "react-dom";
import axios from "axios";
const validateEmail = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
// function Counter(){
//     const [state,setState] = React.useState({
//         fullName:"",
//         email:"",
//         Role:"mern",
//         CoverLetter:"",
//         terms:true,
//         password:"",
//         errors:{
//           fullName:"",
//           email:"",
//           CoverLetter:"",
//           terms:""
//     }})
//     const increment = () => setState({...state,count:state.count+1});

// }

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: "",
            email: "",
            address: "",
            country: "",
            city: "",
            role:"",
            password: "",
            errors: {
                fullName: "",
                email: "",
                password: ""
            },
            backendenderrors:""
                
            
        }
    }
    registerSubmit = async (event) => {
        event.preventDefault();
        try {
            const { fullName, email, address, country, city, password,role } = this.state;
            console.log("state",this.state);
           const { data } = await axios.post("http://localhost:3002/users/register", { fullName, email, address, country, city, password,role })
            console.log(data);
            console.log("states",this.state);
           
            if (data.status == 1){
                this.props.history.push("/login");
                // if(this.state.role=="user"){
                //     this.props.history.push("/userlogin");
                // }else{
                //     this.props.history.push("/adminlogin");
                // }
            }
            this.setState({ fullName: "", email: "", address: "", country: "", city: "", password: "" ,role:""}); 
        }
        catch (err) {
            console.log("err", err);
        }
    }
    handleChange = ({ target: { name, value, type, checked } }) => {
    console.log("name",name);
    console.log("value",value);
        if (type === "checkbox") value = checked;
        this.setState({ [name]: value });
        const errors = this.state.errors;
        switch (name) {
            case "fullName": {
                if (value.length <= 5) {
                    errors.fullName = "please enter atleast 5 characters";
                } else {
                    errors.fullName = ""
                }
                break;
            }
            case "email": {
                if (value.length <= 5) {
                    errors.email = "please enter atleast 5 characters";
                } else if (!validateEmail.test(value)) {
                    errors.email = "please enter valid email"
                } else
                    errors.email = ""
                break;
            }
            case "password": {
                if (value.length <= 5) {
                    errors.password = "please enter atleast 5 characters"
                } else {
                    errors.password = ""
                }
            }
        }
    }
    render() {
        return (<>
  <span>{this.state.backendenderrors}</span>
            <p>MyForm</p>
            <form onSubmit={this.registerSubmit}>
                <div>
                    <label>FullName:</label>
                    <input type="text" value={this.state.fullName} name="fullName" onChange={this.handleChange}></input>
                </div>
                <span>{this.state.errors.fullName}</span>
                <br />
                <div>
                    <label>Address</label>
                    <input type="text" value={this.state.address} name="address" onChange={this.handleChange}></input>
                </div><br/>
               
                <div>
                    <label>Country</label>
                    <input value={this.state.country} type="text" onChange={this.handleChange} name="country"></input>
                </div>
                <br />

                <div>
                    <label>City</label>
                    <input type="text" onChange={this.handleChange} checked={this.state.city} name="city" />
                  
                </div>
                <br/>
                <div>
                    <label>Email</label>
                    <input type="text" value={this.state.email} name="email" onChange={this.handleChange}></input>
                </div>
                <span>{this.state.errors.email}</span>
                <br />
                
                <div>
                   <label>Password</label>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange}></input>
                    </div><br />
                    <div>
          <label>Role:</label>
          <select value={this.state.role} onChange={this.handleChange} name="role">
            <option value="admin">Admin</option>
            <option value="user">User</option>
         </select>
        </div><br/>
                    <div>
                    <button type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </>
        )
    }
}

export default Register;