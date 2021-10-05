import React from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import reactDom from "react-dom";
class theater extends React.Component{
    constructor(props) {
        // console.log(this.props);
        super(props);
        this.state = {
           
            theaters: [],
           
        };
    }
    componentDidMount() {
        this.getTheaters();
    }
    getTheaters = async () => {
        try {
            const data = await axios.get("http://localhost:3002/users/get");

            console.log("data", data);
            this.setState({theaters : data.data })
        } catch (error) {
            console.error("Error fetching data from server", error);
        }
    }
   render(){
       return(<>
        <Table striped bordered hover>
                <thead>
                    <tr>
                        {/* <th>Theater Id</th> */}
                        <th>Theater Name</th>
                        <th>Owner Name</th>
                        <th>Location</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {this.state.theaters.map((theater) => {

                        return (<tr key={theater._id} >
                            {/* <td>{theater._id}</td> */}
                            <td>{theater.theater_name}</td>
                            <td>{theater.theater_owner}</td>
                            <td>{theater.location}</td>
                           
                           
                            {/* <td><button onClick={()=>{this.selectTheaterToUpdate(theater)}}>Update</button></td> */}
                            {/* <td><button onClick={()=>{this.deleteTheater(theater.id)}}>Delete</button></td> */}
                        </tr>)

                    })}
                </tbody>

            </Table>
       </>)
   }
}
export default theater;