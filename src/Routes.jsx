import React from 'react'
import Home from './Components/Home'
import LogIn from  './Components/Log In'
import LandingPage from './Components/Landing Page'
import Register from './Components/Register'
import Nav from './Components/Nav'
import Profile from './Components/Profile'
import {BrowserRouter as Router, Route} from 'react-router-dom';

const Routes = ()=>{
    return(
        <Router>
            <div>
                <Nav />
                <Route path='/' exact component={LandingPage}/>
                <Route path='/home' component={Home}/>
                <Route path='/login' component={LogIn}/>
                <Route path='/register' component={Register}/>
                <Route path='/:username/profile' component={Profile}/>
            </div>
        </Router>
    )
}

export default Routes