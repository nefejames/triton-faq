import React from 'react'
import { FormGroup, Label, Input } from 'reactstrap';
import styles from "./Input.module.css";


function InputField(props) {

    let { id, validInput, formGroupClass, label, errorText, required,className,  ...others } = props;
    
    validInput = typeof validInput === "undefined" ? true : validInput;

    errorText = required ? `${ (label ||"").toLowerCase() } is required!` : errorText;

    let inputClass = validInput ? "valid" : "not-valid";

    return (
        <FormGroup className = { styles.formGroup + " " + ( formGroupClass || "" ) }>
            <Label for= { `${id}` } >{ label }</Label>
            <Input 
                id = { id }
                {...others}
                className = { (className || "")+ " " + styles[inputClass]}
             />
            {
                validInput 
                ? null 
                :<span className = { styles.error }>{ errorText }</span>  
            }
        </FormGroup>
    )
}

export default InputField
