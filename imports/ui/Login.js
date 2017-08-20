import React from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor'
// import { Accounts } from 'meteor/accounts-base';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
        }
    }

    onLogin(e) {
        e.preventDefault();
        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();
        Meteor.loginWithPassword({ email }, password, (error) => {
            // console.log('Login callback ', error);
            if (error) {
                this.setState({ error: error.reason });
            }
            else {
                this.setState({ error: '' });
            }
        })
    }

    render() {
        return (
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1>Short Link</h1>

                    {this.state.error ? <p>{this.state.error}</p> : undefined}

                    <form onSubmit={this.onLogin.bind(this)} className="boxed-view__form">
                        <input type="email" name="email" ref="email" placeholder="Email" />
                        <input type="password" name="password" ref="password" placeholder="Password" />
                        <button className="button">Login</button>
                    </form>

                    <Link to='/signup'>Create account</Link>
                </div>
            </div>
        );
    }
}