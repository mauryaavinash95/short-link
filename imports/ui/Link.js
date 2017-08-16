import React from 'react';
import { Accounts } from 'meteor/accounts-base';

export default class Link extends React.Component {
    onLogout() {
        Accounts.logout();
        console.log("Logging out");
    }
    render() {
        return (
            <div>
                <h1>This is the link page.</h1>
                <button onClick={this.onLogout.bind(this)}>Logout</button>
            </div>
        )
    }
}