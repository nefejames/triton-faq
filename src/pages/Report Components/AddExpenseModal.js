import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup,Label, Input, Alert } from 'reactstrap';
import Loader from '../../components/Loader';
import { PostWithAuth } from "../../utils/APIRequest";

function AddExpenseModal(props) {

    const { isOpen, open, refreshDasboard } = props;
  
    const initialState = {
        purchase_date : new Date().toISOString().substr(0,10),
        amount:0,
        item:'',
        description:'',
        loading:false,
        alert:false,
        alertColor:"danger",
        alertText: "An Error Occured"
    }

    const [form,  set] = useState(initialState);

    const handleInput = ({target})=>{
        set(form=>({...form, [target.name]:target.value }))
    }

    const handleDateChange = ({ target })=>{
        set(form=>({...form, purchase_date:target.value }))
    }

    const handleClose = ()=>{
        set(initialState);
        open(false);
    }

    const validateForm = ()=>{
        const { amount, item, description, purchase_date } = form;
        return !amount || !item || !description || !purchase_date;
    }

    const handleSubmit = async ()=>{
        const { amount, item, description, purchase_date } = form;
        if(validateForm()) return;

        try {
            set(form => ({ ...form, loading:true }));
            const response = await PostWithAuth("/items/", { amount, item, description, purchase_date });
            const { status } = response;
            const data = await response.json();

            if(status === 201 || status === 200 ){
                await refreshDasboard();
                set(initialState);
            }else{
                let message = Array.isArray(data) ? data[0] : data[Object.keys(data)[0]];
                set(form=>({
                    ...form,
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
    <div>
        <Modal isOpen={isOpen} className={props.className}>
            <ModalHeader>Add Expense</ModalHeader>
            <ModalBody>
                <Alert 
                    isOpen={ form.alert } 
                    toggle={ ()=> set(v=>({...v, alert:false})) }
                    color = { form.alertColor }
                > 
                    { form.alertText }
                </Alert> 
                <form>
                    <FormGroup>
                        <Label for="purchase_date">Date (MM/DD/YYYY)</Label>
                        <Input 
                            className="ctrl md" 
                            type="date" 
                            name="purchase_date" 
                            autoComplete = "date"
                            defaultValue = { form.purchase_date }
                            onChange = { handleDateChange }
                            id = "purchase_date"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="item">Item</Label>
                        <Input 
                            className="ctrl md" 
                            type="text" 
                            name="item" 
                            onKeyUp = { handleInput }
                            autoComplete = "expense"
                            id = "item"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="amount">Amount</Label>
                        <Input 
                            className="ctrl md" 
                            type="number" 
                            name="amount" 
                            onKeyUp = { handleInput }
                            autoComplete = "amount"
                            id = "amount"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input 
                            id = "description"
                            className="ctrl md" 
                            type="text" 
                            name="description" 
                            onKeyUp = { handleInput }
                            autoComplete = "description"
                        />
                    </FormGroup>
                </form>
            </ModalBody>
            <ModalFooter>
                <Button color="success"
                    disabled = { validateForm() }
                    onClick = { handleSubmit }
                >Save
                { form.loading && <Loader width="30px" /> }
                </Button>
                <Button 
                    color="secondary"
                    onClick = { handleClose }
                >Cancel</Button>
            </ModalFooter>
        </Modal>
    </div>
    )
}

export default AddExpenseModal
