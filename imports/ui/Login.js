import React from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
        }
    }

    onLogin() {

    }

    render() {
        return (
            <div>
                <h1>Short Link login page.</h1>

                {this.state.error ? <p>{this.state.error}</p> : undefined}

                <form onSubmit='onLogin'>
                    <input type="email" name="email" ref="email" placeholder="Email" />
                    <input type="password" name="password" ref="password" placeholder="Password" />
                    <button>Login</button>
                </form>

                <Link to='/signup'>Create account</Link>
            </div>
        );
    }
}