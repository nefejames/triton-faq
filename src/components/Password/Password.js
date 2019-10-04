import React, { useState } from 'react'
import { FormGroup, Label, Input} from 'reactstrap';
import styles from "./Password.module.css";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

function Password(props) {

    let { 
        onPasswordEntered,
        visibilityControl,
        label,
        isInvalid, 
        minLength, 
        onKeyUp, 
        className:classes, 
        type, 
        ...others 
    } = props;

    minLength = minLength|| 8;
    visibilityControl = typeof visibilityControl === "undefined" ? true : visibilityControl;

    const [inputstate, set] = useState({
        isInvalid: isInvalid || false,
        valid:"valid",
        errorText:"",
        showpassword:false,
        type:"password"
    })

    const handleClickShowPassword = ()=>{
        set(state => ({ ...state, 
            showpassword:!inputstate.showpassword,
            type: inputstate.showpassword ? "password" : "text"
        }));
    }

    const handeleKeyUp = ({ target })=>{
        let { isInvalid, valid, errorText} = inputstate;
        let { value } = target;

        if(!value || (value.length < minLength)){
            isInvalid = true;
            valid = "not-valid";
            errorText = "password too short!"
        }else{
            isInvalid = false;
            valid = "valid";
        }

        set(state => ({ ...state, isInvalid, valid, errorText }));

        onKeyUp && onKeyUp({ target, valid:!isInvalid })
    }

    return (
        <FormGroup className = { styles.formGroup }>
            <Label for="exampleEmail">{ label || "Password" }</Label>
            <Input 
                className = { (classes || "") +" "+ styles[inputstate.valid] }
                {...others}
                onKeyUp = { handeleKeyUp }
                type={ inputstate.type } 
            />
           { 
               visibilityControl 
                ?   <div 
                        className = { styles.iconHolder }
                        aria-label="toggle password visibility"
                        onClick={ handleClickShowPassword }
                        >
                        { !inputstate.showpassword ? <Visibility /> : <VisibilityOff /> }
                    </div>
                :null
            }
            {
                inputstate.valid === "valid" 
                ? null 
                :<span className = { styles.error }>{ inputstate.errorText }</span>  
            }
        </FormGroup>
    )
}

export default Password
