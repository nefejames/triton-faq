import React, { useState } from 'react'
import { FormGroup, Label, Input } from 'reactstrap';
import styles from "./Email.module.css";

const e_regex = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;

function EmailField(props) {

    let { 
        onPasswordEntered,
        label,
        valid,
        minLength,
        onKeyUp,
        className:classes,
        type, 
        ...others 
    } = props;

    minLength = minLength|| 6;

    const [inputstate, set] = useState({
        valid: valid || true,
        validClass:"valid",
        errorText:"",
    })

    const handeleKeyUp = ({ target })=>{
        let { valid, validClass, errorText} = inputstate;
        let { value } = target;

        if(!value || !e_regex.test(value) ){
            valid = false;
            validClass = "not-valid";
            errorText = "Invalid email!"
        }else{
            valid = true;
            validClass = "valid";
        }

        set(state => ({ ...state, valid, validClass, errorText }));

        onKeyUp && onKeyUp({ target, valid:inputstate.valid })
    }

    return (
        <FormGroup className = { styles.formGroup }>
            <Label for="exampleEmail">{ label || "Email" }</Label>
            <Input 
                className = { (classes || "") +" "+ styles[inputstate.validClass] }
                {...others}
                onKeyUp = { handeleKeyUp }
                type = "email"
             />
            {
                inputstate.validClass === "valid" 
                ? null 
                :<span className = { styles.error }>{ inputstate.errorText }</span>  
            }
        </FormGroup>
    )
}

export default EmailField
