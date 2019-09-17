import React from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Booking from './Booking';
import Createbooking from './createbooking';
import Updatebooking from './updatebooking';
import Deletebooking from './deletebooking';
import logoutapp from './logoutapp';
import Error from './Error';
class App extends React.Component{

/*constructor(props){
super(props);

}*/
  render() {
    return (
      <BrowserRouter>
        <Switch>
        <Route path="/" exact component={Home} />
          <Route path="/login"  component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/booking/:id" component={Booking} />
          <Route path="/Createbooking" component={Createbooking} />
          <Route path="/Updatebooking/:id" component={Updatebooking} />
          <Route path="/Deletebooking/:id" component={Deletebooking} />
          <Route path="/logoutapp" component={logoutapp} />
          <Route path="/error" component={Error} />
           </Switch>
      </BrowserRouter>

    )
  }
}

export default App;