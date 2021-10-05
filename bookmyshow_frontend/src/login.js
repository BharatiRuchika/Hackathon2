import {Formik,Form,Field,ErrorMessage} from "formik";
import axios from "axios";
import React from "react";
const validateEmail = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

function appformik(props){

    return(
    <Formik initialValues={{
        email:"",
        password:""
    }}
    validate={(values)=>{
      console.log(values);
      const errors={};
      if(!validateEmail.test(values.email)){
        errors.email = "email is invalid";
      }
      return errors;
    }} 
    onSubmit={async(values)=>{
      console.log("form submitted");
      console.log("values",values);
      const { email,password} = values;
      const { data } = await axios.post("http://localhost:3002/users/login", { email,password })
      console.log("data",data.user.role);
       if(data.user.role=="admin"){
        props.history.push("/adminhome");
       }else{
        props.history.push("/loginhome");
       }
    }}>
    {
        ({values,errors}) =>{
            return(<>
         
           
             <p>My Form</p>
           <Form>
              <div>
                <label>Email</label>
               
              <Field type="email" name="email"></Field>
              </div>
             
              <ErrorMessage name="email"/>
              <div>
                  <label>Password</label>
                  <Field type="password" name="password"></Field>
              </div>
              <div>
                <button type="submit">Submit</button>
              </div>
              </Form>
              </>)
        }
    }
    </Formik>
    )
}
export default appformik;