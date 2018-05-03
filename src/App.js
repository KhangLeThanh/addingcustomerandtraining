import React,{ Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Home from './Home.js';
import AddCustomer from './AddCustomer.js'
import AddTraining from './AddTraining.js'
import logo from './logo.svg';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listCustomers: [],
      href:'',
      customer_name:'',
      search:''
    };
    this.removeName = this.removeName.bind(this);

  }
  componentDidMount() {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then((response) => response.json()) 
    .then((responseData) => { 
      this.setState({ 
        listCustomers: responseData.content,
      }); 
    })    
  }

  inputChanged = (event) => { 
    this.setState({search: event.target.value});
  };


  removeName(index){
    return fetch(this.state.listCustomers[index].links[0].href, {
      method: 'delete'
    }) 
   

  }
 
  render() {
    const fiteredItems = this.state.listCustomers.filter(
      (listCustomers) => {
        return listCustomers.firstname.toLowerCase().indexOf(this.state.search) !== -1;
      }
    );
    const customerRows = fiteredItems.map((listCustomers,index) => 
      <li  className="customer-list"  key={index} id={index+1}>
        <NavLink className="normal" activeStyle={{ color:'#000' }} to={`/home/${index+1}/${listCustomers.firstname}`}>{listCustomers.firstname} <button type="button" className="btn btn-danger" onClick={this.removeName(index)}>x</button> </NavLink>
      </li>
    )
    return (
      <div>
        <Router>
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-2">
                  <nav id="sidebar">
                  <NavLink className="wrapper-plus" to={'/addcustomer'}> 
                    <MuiThemeProvider>
                      <FloatingActionButton mini={true} >
                        <ContentAdd />
                      </FloatingActionButton>
                    </MuiThemeProvider>  
                  </NavLink>
                        <ul className="list-unstyled components">
                            {customerRows}
                        </ul>   
                  </nav> 
                </div>
                <div className="col-sm-10">    
                    <div className="form-group">
                      <input className="form-control"placeholder="Search Name" type="search" value={this.state.search} onChange={this.inputChanged.bind(this)} />
                    </div>  
                      <Switch>
                        <Route  path="/home/:id/:name" component={Home} />
                        <Route  path="/addcustomer" component={AddCustomer} />
                        <Route  path="/addtraining/:id" component={AddTraining} />

                      </Switch>
                </div>
              </div>  
            </div>  
        </Router>
      </div>
    );
  }
}

export default App;
