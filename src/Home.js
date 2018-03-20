import React, { Component } from 'react';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
          listTrainings: [],
          searchTraining:''
        };
      }
    render(){
        const {id,name} = this.props.match.params
        fetch('https://customerrest.herokuapp.com/api/customers/'+id+'/trainings')
        .then((response) => response.json()) 
        .then((responseData) => { 
          this.setState({ 
            listTrainings: responseData.content,
          }); 
        })  
          const trainingRows = this.state.listTrainings.map((listTrainings,index) => 
            <td  className="customer-list removeborder" key={index}>
                {listTrainings.activity}
            </td>
          )
        return (
            
            <div>
              <table className="table">
                <thead>
                <tr>
                  <th>Name</th>
                  <th>Trainings</th>
                </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{name}</td>
                      {trainingRows}
                  </tr>    
                </tbody>
              </table>
            </div>
        )
    }
}
