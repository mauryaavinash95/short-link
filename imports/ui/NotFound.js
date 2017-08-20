import React from 'react';
import { Link } from 'react-router';

export default NotFound = () => {
    return (
        <div className="boxed-view">
            <div className="boxed-view__box">
                <h1>Page Not Found</h1>
                <p>Couldn't find this page</p>
                <Link to='/' className="button--link"> Head Home </Link>
            </div>
        </div>
    );

}