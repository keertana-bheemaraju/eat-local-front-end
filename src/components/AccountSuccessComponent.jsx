import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';


class AccountSuccessComponent extends Component {
    constructor(props) {
        super(props);

    }

    accountsuccess() {
        this.props.history.push('/account-success');
    }

    render() {
        return (

            <div className="wrapper">
                <div className="form-wrapper">
                    <h1> success </h1>

                </div>
            </div>

        );
    }
}


export default AccountSuccessComponent;