import React from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import reactDom from "react-dom";
class addfilms extends React.Component{
    constructor(props) {
        // console.log(this.props);
        super(props);
        this.state = {
            _id: "",
            films: [],
            movie_name: "",
            movie_lang: "",
            genere: "",
            cast:"",
            release_date:"",
            out_date:""
        };
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
    createFilm = async(e)=>{
        const paramId = this.props.match.params.id;
        console.log("paramId ",paramId );
        console.log("form submitted");
        console.log(this.state);
        console.log("form submitted");
        try {
            const {movie_name,movie_lang,genere,cast,release_date,out_date} = this.state;
            const { data: film } = await axios.post("http://localhost:3002/films/addfilms", { movie_name, movie_lang, genere,cast,release_date,out_date,paramId})
            console.log("film", film);
            let films = [...this.state.films];
            films.push(film);
            this.setState({ films, movie_name: "", movie_lang: "", genere: "",cast:"",release_date:"", out_date:""})
        } catch (err) {
            console.log("error creating data", err);
        }
    }
    handleSubmit = async(e) => {
        e.preventDefault();
        console.log("filmId",this.state._id)
          if(this.state._id){
            this.updateFilm();
          }else{
            this.createFilm();
        }
      
    }
    handleChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value });
    };
    selectFilmToUpdate = (film)=> {
        console.log("film",film);
        this.setState({...film});
    }
    updateFilm = async()=>{
        try{
          const {_id,movie_name,movie_lang,genere,cast,release_date,out_date} = this.state;
          console.log("id",_id);
         const {data:film} = await axios.put(`http://localhost:3002/films/update/${_id}`,{
            movie_name,
            movie_lang,
            genere,
            cast,
            release_date,
            out_date
          });
          console.log(film);
          const films = [...this.state.films];
          const index= films.findIndex((film)=>film._id===_id);
          films[index] = film;
          this.setState({films,movie_name:"",movie_lang:"",genere:"",cast:"",release_date:"",out_date:""});
          console.log(index);
        }catch(err){
          console.log("error in update",err);
        }
        }
    deleteFilm = async(id) => {
        console.log("filmId",id);
        try{
          
            await axios.delete(`http://localhost:3002/films/delete/${id}`)
            console.log(`${id} deleted`);
            let films=[...this.state.films];
            films = films.filter((film)=>film._id!==id)
            this.setState({films});
         }catch(err){
         console.log("error in deleteing the data",err);
        }
     }
    render(){
       return(<> <h1>Add Films</h1>
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>Movie Name</label>
                    <input type="text" name="movie_name" onChange={this.handleChange} value={this.state.movie_name}></input>
                </div>
                <br />
                <div>
                    <label>Movie Language</label>
                    <input type="text" name="movie_lang" onChange={this.handleChange} value={this.state.movie_lang}></input>
                </div>
                <br />
                <div>
                    <label>genere</label>
                    <select value={this.state.genere} onChange={this.handleChange} name="genere">
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
            <option value="Romantic">Romantic</option>
         </select>
                </div><br />

                <div>
                    <label>Cast</label>
                    <input type="text" name="cast" onChange={this.handleChange} value={this.state.cast}></input>
                </div><br/>

                <div>
                    <label>Release Date</label>
                    <input type="date" name="release_date" onChange={this.handleChange} value={this.release_date}></input>
                </div><br/>

                <div>
                    <label>Out Date</label>
                    <input type="date" name="out_date" onChange={this.handleChange} value={this.state.out_date}></input>
                </div><br/>

                <div>
                    <button type="submit">Submit</button>
                </div>

            </form>
            
            <br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {/* <th>Theater Id</th> */}
                        <th>Movie Name</th>
                        <th>Language</th>
                        <th>cast</th>
                        <th>genere</th>
                        <th>Release Date</th>
                        <th>Out Date</th>
                        <th>Action</th>
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
                            <td>
                                <button onClick={() => { this.selectFilmToUpdate(film)}}>Update</button>
                                
                                    <button onClick={() => { this.deleteFilm(film._id) }}>Delete</button>
                                </td>
                            {/* <td><button onClick={()=>{this.selectTheaterToUpdate(theater)}}>Update</button></td> */}
                            {/* <td><button onClick={()=>{this.deleteTheater(theater.id)}}>Delete</button></td> */}
                        </tr>)

                    })}
                </tbody>

            </Table></>)
    }
} 
export default addfilms;