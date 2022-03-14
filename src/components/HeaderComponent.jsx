import React, { Component } from 'react'

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div>
                <header>
                    <nav  className=" justify-content-end navbar navbar-expand-md navbar-dark bg-dark">
                    <div className="navbar-brand welcome-message">
                        Hi {this.props.name}!
                    </div>
                    <div>
                        <a href={this.props.homeUrl} className="navbar-brand">Home</a>
                    </div>
                    </nav>
                </header>
            </div>
        )
    }
}

export default HeaderComponent