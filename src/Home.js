import React,{ Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './home.css';

export default class Home extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
          listTrainings: [],
          listCustomers: [],
          searchTraining:''
        };
     
      }
      // componentDidMount() {
      //   const {id, name} = this.props.match.params

      //   fetch('https://customerrest.herokuapp.com/gettrainings')
      //   .then((response) => response.json()) 
      //   .then((responseData) => { 
      //     this.setState({ 
      //       listTrainings: responseData,
      //     }); 
      //   })  
 
      //   console.log(this.state.listTrainings)


      // }
      removeTraining(index){
         const num = parseInt(index) + 1
        return fetch('https://customerrest.herokuapp.com/api/trainings/'+num, {
          method: 'delete'
        }) 
       console.log(index)
    
      }
    render(){
      const {id, name} = this.props.match.params
      fetch('https://customerrest.herokuapp.com/api/customers/'+id+'/trainings')
      .then((response) => response.json()) 
      .then((responseData) => { 
        this.setState({ 
          listTrainings: responseData.content,
        }); 
      })  
      const trainingRows = this.state.listTrainings.map((listTrainings,index) => 
      <td  className="customer-list removeborder" key={index}>
          {listTrainings.activity}<button type="button" className="btn btn-danger" onClick={this.removeTraining(id)}>x</button>
      </td>
    )
        
        return (
            <div>
              <table className="table">
                <thead>
                <tr>
                  <th>Name</th>
                  <th>Trainings
                  <NavLink className="add-new-training" to={'/addtraining/'+this.props.match.params.id}> 
                    <MuiThemeProvider>
                      <FloatingActionButton mini={true} >
                        <ContentAdd />
                      </FloatingActionButton>
                    </MuiThemeProvider>  
                  </NavLink>
                  </th>
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
