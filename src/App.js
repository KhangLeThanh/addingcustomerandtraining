import React,{ Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Home from './Home.js';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listCustomers: [],
      search:''
    };
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
  
  render() {
    const fiteredItems = this.state.listCustomers.filter(
      (listCustomers) => {
        return listCustomers.lastname.toLowerCase().indexOf(this.state.search) !== -1;
      }
    );
    const customerRows = fiteredItems.map((listCustomers,index) => 
      <li  className="customer-list"  key={index} id={index+1}>
        <NavLink className="normal" activeStyle={{ color:'#000' }} to={`/home/${index+1}/${listCustomers.lastname}`}>{listCustomers.lastname}</NavLink>
      </li>
    )
    return (
      <div>
        <Router>
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-2">
                  <nav id="sidebar">
                        <ul className="list-unstyled components">
                            {customerRows}
                        </ul>   
                  </nav> 
                </div>
                <div className="col-sm-10">    
                    <div className="form-group">
                      <input className="form-control"placeholder="Name..." type="search" value={this.state.search} onChange={this.inputChanged.bind(this)} />
                    </div>  
                      <Switch>
                        <Route  path="/home/:id/:name" component={Home} />
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
