import React, { Component } from 'react';


export default class AddTraining extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activity:'',
            date:'',
            duration:'',
            customer:'',
            listCustomers: [],
            id:null
        };

        this.inputActivity = this.inputActivity.bind(this);
        this.addActivity = this.addActivity.bind(this);
        this.getId = this.getId.bind(this);

    }
    componentDidMount() {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then((response) => response.json()) 
        .then((responseData) => { 
          this.setState({ 
            listCustomers: responseData.content,
          }); 
        })  
         this.getId
    }
  
    inputActivity(event) {
        event.preventDefault();
        this.setState({
          [event.target.name]: event.target.value
        })
        
    } 
    getId(id){
        this.setState({
            id:id
        })

    }
    addActivity(event)  {
        // const num = parseInt(this.state.id) + 1
        // console.log(num)
        event.preventDefault();
        fetch('https://customerrest.herokuapp.com/api/trainings', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            date:this.state.date,
            activity: this.state.activity,
            duration:this.state.duration,
            customer:"https://localhost:3000/api/customers/"+this.state.id,
          })
        })
        console.log(this.state.id)

      }
    render(){
        const {id} = this.props.match.params
        // console.log(this.state.listCustomers[id].links[0].href)

        return(
            <div className="adding-customer-page">
                <div className="page-title">
                    <h1>Adding Training</h1>
                </div>
                <div className="form-group">
                    <form onSubmit={this.addActivity}>
                        <lable>Date:</lable>
                        <input className="form-control" type="text" onChange={this.inputActivity} name="date"  value={this.state.date}/>
                        <lable>Activity:</lable>
                        <input className="form-control" type="text" onChange={this.inputActivity} name="activity"  value={this.state.activity}/>
                        <lable>Duration:</lable>
                        <input className="form-control" type="text" onChange={this.inputActivity} name="duration"  value={this.state.duration}/>
                        <div className="wrapper-button">
                        <button type="submit" value="Add" className="btn btn-primary" onClick={() => this.getId(id)}>Add</button>
                        </div>    
                    </form>
                </div> 
            </div>
        )
    }
}