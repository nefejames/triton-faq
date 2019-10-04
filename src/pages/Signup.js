import React, { useState, useContext } from 'react'
import { Button, Row, Col, Container, Alert } from 'reactstrap';
import { InputField, EmailField, Password  } from "../components";
import { signIn } from '../utils/APIRequest';
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';
import Loader from "../components/Loader";
import "../styles/Sigup.css";

function Signup(props) {

    const [ state, set ] = useState({
        fullname:"",
        username:"",
        email:"",
        phonenumber:"",
        password1:"",
        password2:"",
        emailIsValid:false,
        password1IsValid:false,
        loading:false,
        alert:false,
        alertText:"",
        alertColor:""
    })

    const { updateUser } = useContext(UserContext);


    const handleInput = ({ target, valid })=>{
        const { name, value } = target;
        if(name === "password1" || name === "email"){
            set(values=> ({...values, [name]:value, [`${name}IsValid`]: valid }));
        }else{
            set(values=> ({...values, [name]:value }));
        }
    }

     const validateForm = ()=>{
        let {
            fullname,
            username,
            phonenumber,
            emailIsValid,
            password1IsValid,
            password1,
            password2
        } = state
        
        return !fullname || !username ||!phonenumber ||!emailIsValid || !password1IsValid || !(password1 === password2);
    }

    const handleSubmit = async ()=>{
        if(validateForm()) return;

        let { fullname,username,email,phonenumber,password1,password2 } = state;

        try {
            set(values => ({ ...values, loading:true }));
            const response = await fetch("https://team-trion.herokuapp.com/register/",{
                method: 'POST', 
                mode: 'cors', 
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    first_name: fullname.split(" ")[0],
                    last_name: fullname.split(" ")[1] || "o",
                    username,
                    email,
                    phonenumber,
                    password1,
                    password2
                })
            });

            let { status } = response;
            const data = await response.json();

            if(status === 201 || status === 200 ){
                let payload = await signIn({ username,password:password1 })
                updateUser(payload);
                localStorage["_authuser"] = JSON.stringify(payload);
                props.history.push("/report");
            }else{
                console.log(Object.keys(data)[0], data, data[Object.keys(data)[0]]);
                let message = Array.isArray(data) 
                    ?
                    data[0]
                    :
                    data[Object.keys(data)[0]][0];
                set(state=>({
                    ...state,
                    loading:false,
                    alert:true,
                    alertColor:"danger",
                    alertText: message || "An Error Occured"
                }))
            } 
        } catch (error) {
            
        }

    }

    return (
        <div className="gContainer" >
            <Container className="form-wrap">
                <div className="sform-text">
                    <h5>Sign Up To Have An Account</h5>
                    <h6>just fill the form below and you are perfect!</h6>
                </div>
            <Alert 
                isOpen={ state.alert } 
                toggle={ ()=> set(state=>({...state, alert:false })) }
                color = { state.alertColor }
            > 
                { state.alertText }
            </Alert>
            <form>
                <Row>
                    <Col md="6" xs="12">
                        <InputField 
                            id="fullname"
                            label="Full Name"
                            required = { true }
                            className="ctrl md"
                            type = "text"
                            name  = "fullname"
                            onKeyUp = { handleInput }
                        />
                    </Col>
                    <Col md="6" xs="12">
                        <InputField 
                            id="usernanme"
                            label="User Name"
                            required = { true }
                            className="ctrl md"
                            type = "text"
                            name  = "username"
                            onKeyUp = { handleInput }
                            autoComplete = "username"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md="6" xs="12">
                        <EmailField 
                            className="ctrl md" 
                            type="email" 
                            name="email" 
                            id="user-email"
                            onKeyUp = { handleInput }
                        />
                    </Col>
                    <Col md="6" xs="12">
                        <InputField 
                            id="phone-number"
                            label="Phone Number"
                            required = { true }
                            className="ctrl md"
                            type = "number"
                            name  = "phonenumber"
                            onKeyUp = { handleInput }
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md="6" xs="12">
                        <Password 
                            id="password1"
                            label="Password"
                            required = { true }
                            className="ctrl md"
                            type = "text"
                            name  = "password1"
                            visibilityControl = { false }
                            onKeyUp = { handleInput }
                        />
                    </Col>
                    <Col md="6" xs="12">
                        <InputField 
                            id="password2"
                            label="Confirm Password"
                            className="ctrl md"
                            type = "password"
                            name  = "password2"
                            onKeyUp = { handleInput }
                            validInput = { state.password2 >= 1 ? state.password1 === state.password2 : true }
                            errorText = { "password does not match!" }
                        />
                    </Col>
                </Row>
                <Row>
                    <Col className="space-top-25" md="12">
                        <Button 
                            color="success"
                            block
                            onClick = { handleSubmit }
                            disabled = { state.loading || validateForm() }
                            >
                            Sign Up
                            { state.loading && <Loader width="30px" />}
                        </Button>
                    </Col>
                    <Col md="12">
                        <p className="mt-1 text-center">Already have an Account ? <Link to="/" className="text-signup">Sign In</Link></p>
                    </Col>
                </Row>
            </form>
            </Container>
        </div>
    )
}

export default Signup
