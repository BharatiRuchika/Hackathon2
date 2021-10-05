import axios from "axios";
import React from "react";
import {BrowserRouter,Switch,Route,Redirect,NavLink} from "react-router-dom";
import UserHome from "./userhome"
import AdminHome from "./adminhome";
import Register from "./register";
import Login from "./login";
import AddFilms from "./addfilms";
import Theaters from "./theater";
class App extends React.Component{
  constructor(props){
    super(props);
    this.states = {
    }
  }
  render(){
    return (<>
     <BrowserRouter>
     <Route path="/" exact component={Register}></Route>
     <Route path="/loginhome" exact component={UserHome}></Route>
     <Route path="/adminhome" exact component={AdminHome}></Route>
     <Route path="/login" exact component={Login}></Route>
     <Route path="/addfilms/:id" exact component={AddFilms}></Route>
     <Route path="/theater/:id" exact component={Theaters}></Route>
     </BrowserRouter>
   
   
    </>)
  }
}




export default App;
