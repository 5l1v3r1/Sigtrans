/**
 * Created by natal on 09/03/17.
 */
import React from 'react';
import {Button} from 'react-bootstrap';

export default class CustomSubmit extends React.Component{
    render() {
        return (
            <div className="pure-control-group">
                <label></label>
                <Button type="submit">{this.props.label}</Button>
            </div>
        );
    }
}