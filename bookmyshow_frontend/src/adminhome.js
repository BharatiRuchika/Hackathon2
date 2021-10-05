import React, { Component } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import reactDom from "react-dom";
import AddFilms from "./addfilms";
// import { theater } from "../../bookmyshow_backend/mongo";
class adminHome extends Component {
    constructor(props) {
        // console.log(this.props);
        super(props);
        this.state = {
            _id: "",
            theaters: [],
            theater_name: "",
            owner_name: "",
            location: ""
        };
    }
    getTheatres = async () => {
        try {
            const data = await axios.get("http://localhost:3002/admin/get");

            console.log("data", data);
            this.setState({ theaters: data.data })
        } catch (error) {
            console.error("Error fetching data from server", error);
        }
    }
    createTheater = async () => {
        console.log(this.state);
        console.log("form submitted");
        try {
            const { theater_name, owner_name, location } = this.state;
            const { data: theater } = await axios.post("http://localhost:3002/admin/add", { theater_name, owner_name, location })
            console.log("theater", theater);
            let theaters = [...this.state.theaters];
            theaters.push(theater);
            this.setState({ theaters, theater_name: "", owner_name: "", location: "" })
        } catch (err) {
            console.log("creating data", err);
        }
    }
    updateTheater = async()=>{
    try{
      const {_id,theater_name,owner_name,location} = this.state;
      console.log("id",_id);
     const {data:theater} = await axios.put(`http://localhost:3002/admin/update/${_id}`,{
          theater_name,
          owner_name,
          location
      });
      console.log(theater);
      const theaters = [...this.state.theaters];
      const index= theaters.findIndex((theater)=>theater._id===_id);
      theaters[index] = theater;
      this.setState({theaters,theater_name:"",owner_name:"",location:""});
      console.log(index);
    }catch(err){
      console.log("error in update",err);
    }
    }
    selectTheaterToUpdate = (theater)=> {
        console.log("theater",theater);
        this.setState({...theater});
    }
    AddFilms = (id)=>{
        console.log("im here");
       this.props.history.push(`/addfilms/${id}`);
    }

    deleteTheater = async(id) => {
       console.log("theaterId",id);
       try{
           await axios.delete(`http://localhost:3002/admin/delete/${id}`)
           console.log(`${id} deleted`);
           let theaters=[...this.state.theaters];
           theaters = theaters.filter((theater)=>theater._id!==id)
           this.setState({theaters});
        }catch(err){
        console.log("error in deleteing the data",err);
       }
    }
    componentDidMount() {
        this.getTheatres();
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log("thaterId",this.state._id)
          if(this.state._id){
            this.updateTheater();
          }else{
            this.createTheater();
        }
    }
    handleChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value });
    };
    render() {
        return (<>
        <h1>My Theaters</h1>
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>Theater Name</label>
                    <input type="text" name="theater_name" onChange={this.handleChange} value={this.state.theater_name}></input>
                </div>
                <br />
                <div>
                    <label>Owner Name</label>
                    <input type="text" name="owner_name" onChange={this.handleChange} value={this.state.owner_name}></input>
                </div>
                <br />
                <div>
                    <label>Location</label>
                    <input type="text" name="location" onChange={this.handleChange} value={this.state.location}></input>
                </div>
                <br />

                <div>
                    <button type="submit">Submit</button>
                </div>

            </form>
            <br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {/* <th>Theater Id</th> */}
                        <th>Theater Name</th>
                        <th>Owner Name</th>
                        <th>Location</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.theaters.map((theater) => {

                        return (<tr key={theater._id} >
                            {/* <td>{theater._id}</td> */}
                            <td>{theater.theater_name}</td>
                            <td>{theater.owner_name}</td>
                            <td>{theater.location}</td>
                            <td>
                                <button onClick={() => { this.selectTheaterToUpdate(theater)}}>Update</button>
                                
                                    <button onClick={() => { this.deleteTheater(theater._id) }}>Delete</button>

                                    <button onClick={() => { this.AddFilms(theater._id) }}>View Films</button>
                            
                            </td>
                            {/* <td><button onClick={()=>{this.selectTheaterToUpdate(theater)}}>Update</button></td> */}
                            {/* <td><button onClick={()=>{this.deleteTheater(theater.id)}}>Delete</button></td> */}
                        </tr>)

                    })}
                </tbody>

            </Table></>);
    }
}
export default adminHome;

// import { Formik, Form, Field, ErrorMessage } from "formik";

// import axios from "axios";
// import React from "react";
// // import { update } from "../../bookmyshow_backend/services/posts.service";
// const validateEmail = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

// function adminformik(props) {
//     const [state, setState] = React.useState({
//         theater_name: "",
//         owner_name: "",
//         location: ""
//     });
//     return (
//         <Formik initialValues={{
//             theater_name: "",
//             owner_name: "",
//             location: ""
//         }}
//         setState ={
//             {
//                 theater_name,
//                 owner_name,
//                 location
//             }
//         }
//             validate={(values) => {
//                 console.log(values);
//                 const errors = {};
//                 if(values.theater_name.length<=5){
//                     errors.theater_name = "theater name should be atleast 5 characters";
//                   }else
//                   if(values.owner_name.length<=5){
//                     errors.owner_name = "owner name should be atleast 5 characters";
//                   }
//                 return errors;
//             }}
//             onSubmit={async(values) => {
//                 console.log("form submitted");
//                 console.log("values", values);
//                 const { theater_name,owner_name,location} = values;
//                 const { data } = await axios.post("http://localhost:3002/admin/add", {theater_name,owner_name,location })
//                 console.log(data);

//             }}

//             >
//             {
//                 ({ values, errors }) => {
//                     return (<>
//                         <p>Add Theater</p>
//                         <Form>
//                             <div>
//                                 <label>Theater Name</label>
//                                 <Field type="text" name="theater_name" />
//                             </div>
//                             <ErrorMessage name="theater_name" />
//                             <br />

//                             <div>
//                                 <label>Owner Name</label>
//                                 <Field type="text" name="owner_name"/>
//                             </div>
//                             <ErrorMessage name="owner_name" />
// <br/>
//                             <div>
//                                 <label>Location</label>
//                                 <Field type="text" name="location"/>
//                             </div><br/>

//                             <div>
//                                 <button type="submit">Create</button>
//                             </div>

//                             <div>
//                                 <button type="button" onClick={setState}>Update</button>
//                             </div>
//                         </Form>
//                     </>)
//                 }
//             }
//         </Formik>
//     )
// }
// export default adminformik;