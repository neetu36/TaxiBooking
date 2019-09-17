import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

class logoutapp extends React.Component {

    render() {
        return (<div className="wrapper">
            <div className="form-wrapper">
                <h1>User logged out</h1>
                <Link to="/">Login Back</Link>
            </div>
        </div>
        )

    }
}
export default logoutapp;