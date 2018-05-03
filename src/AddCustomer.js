import React, { Component } from 'react';
import './addcustomer.css';

export default class AddCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          customer_name:'',
        };
        this.inputName = this.inputName.bind(this);
        this.addCustomer = this.addCustomer.bind(this);
    }
    inputName(event) {
        event.preventDefault();
        this.setState({
          [event.target.name]: event.target.value
        })
    
      } 
    addCustomer(event)  {
        event.preventDefault();
        fetch('https://customerrest.herokuapp.com/api/customers', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            lastname: this.state.customer_name,
          })
        })
      }
    render(){
        return(
            <div className="adding-customer-page">
                <div className="page-title">
                    <h1>Adding Customer</h1>
                </div>
                <div className="form-group">
                    <form onSubmit={this.addCustomer}>
                        <lable>Name:</lable>
                        <input className="form-control" type="text" onChange={this.inputName} name="customer_name"  value={this.state.customer_name}/>
                        <div className="wrapper-button">
                            <button type="submit" value="Add" className="btn btn-primary">Add</button>
                        </div>    
                    </form>
                </div> 
            </div>
        )
    }
}
