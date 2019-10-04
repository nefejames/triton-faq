import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import '../styles/ForgotPassword.css';


function ForgotPassword() {

    const [values, set] = useState({
        email:""
    })

    const handleInput = ({ target })=>{
        const { name, value } = target;
        set(values => ({ ...values, [name]:value }))
    }

    const handleSubmit = ()=>{
        console.log(values)
    }

    return (
    <>
        <div className="forgotpage-container">
            <div className="forgot-group form-area">
                <form>
                    <h3>Forgot your password</h3>
                    <h5>Please enter your email address</h5>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input 
                            className="ctrl md" 
                            type="email" 
                            name="email" 
                            id="exampleEmail"
                            onKeyUp = { handleInput }
                            autoComplete = "email"
                        />
                    </FormGroup>
                    <Button 
                        color="success" 
                        size="lg" 
                        block
                        onClick = { handleSubmit }
                    > 
                        Reset Password
                    </Button>
                    <div className="text-center mt-3">
                        <p>Already have an account? <Link to="/" className="text-signup">Log in</Link></p>
                    </div>
                </form>
            </div>
        </div>
    </>
    )
}

export default ForgotPassword
