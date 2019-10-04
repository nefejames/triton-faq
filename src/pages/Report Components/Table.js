import React from 'react';
import { Table } from 'reactstrap';
import style from '../../styles/Table.module.css';

export default function ReportTable({ data, loading }) {

    return (
        <>                
            <div className = { style.topCtrl }>
                <h6> Item List </h6>
            </div>
            <Table borderless>
            <thead>
                <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Amount</th>
                <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {
                    loading ?
                    <tr className="text-center">loading...</tr>
                    :data.length ?
                    data.map(({ Amount, Description, Name, Items }, i)=>(
                        <tr key={i} className={ style.row }>
                            <th scope="row">{i}</th>
                            <td>{ Name || Items }</td>
                            <td>₦{ Amount.toLocaleString() }</td>
                            <td>{ Description }</td>
                        </tr>
                    ))
                    :
                    <tr className="text-center"> No Expense Created </tr>
                }
            </tbody>
            </Table>
        </>
    );
}