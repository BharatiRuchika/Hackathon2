import React from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import reactDom from "react-dom";
class userHome extends React.Component{
    constructor(props) {
        // console.log(this.props);
        super(props);
        this.state = {
           
            films: [],
            movie_name: "",
            movie_lang: "",
            genere: "",
            cast:"",
            release_date:"",
            out_date:""
        };
    }
    view = async(id)=>{
        console.log("id",id);
        this.props.history.push("/thetaers");
    }
    componentDidMount() {
        this.getFilms();
    }
    getFilms = async () => {
        try {
            const data = await axios.get("http://localhost:3002/films/getfilms");
           console.log("data", data);
            this.setState({ films: data.data })
        } catch (error) {
            console.error("Error fetching data from server", error);
        }
    }
  
    render() {
        return (<>
        <h1>Movies</h1>
          
           
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {/* <th>Theater Id</th> */}
                        <th>Movie Name</th>
                        <th>Movie Language</th>
                        <th>genere</th>
                        <th>Cast</th>
                        <th>Release Date</th>
                        <th>Out Date</th>
                       
                    </tr>
                </thead>
                <tbody>
                
                {this.state.films.map((film) => {

return (<tr key={film._id} >
    {/* <td>{theater._id}</td> */}
    <td>{film.movie_name}</td>
    <td>{film.movie_lang}</td>
    <td>{film.cast}</td>
    <td>{film.genere}</td>
    <td>{film.release_date}</td>
    <td>{film.out_date}</td>
    
   
    {/* <td><button onClick={()=>{this.selectTheaterToUpdate(theater)}}>Update</button></td> */}
    {/* <td><button onClick={()=>{this.deleteTheater(theater.id)}}>Delete</button></td> */}
</tr>)

})}
                </tbody>

            </Table></>);
    }

}
export default userHome;