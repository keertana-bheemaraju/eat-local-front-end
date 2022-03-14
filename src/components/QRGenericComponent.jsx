import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QRCode from "react-qr-code";

class QRGenericComponent extends Component {
    constructor(props) {
        super(props);
        
    }


    render() {
        return (
            <div>
                <QRCode value={this.props.url} />
            </div>
        );
    }
}

QRGenericComponent.propTypes = {

};

export default QRGenericComponent;
