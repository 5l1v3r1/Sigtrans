/**
 * Created by natal on 09/03/17.
 */
import React from 'react';

export default class CustomSubmit extends React.Component{
    render() {
        return (
            <div className="pure-control-group">
                <label></label>
                <button type="submit" className="pure-button pure-button-primary">{this.props.label}</button>
            </div>
        );
    }
}