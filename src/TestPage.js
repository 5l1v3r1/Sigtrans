/**
 * Created by natal on 26/05/17.
 */
import React, {Component} from 'react';
import $ from 'jquery';
import CustomSelect from './components/CustomSelect';

export default class TestPage extends Component {
    constructor() {
        super();
        this.state = {
            options: {
                AccidentClassification: []
            }
        };
        this.value = 0;
    }

    componentDidMount() {
        $.ajax({
            url: 'https://qtdl3zjjzi.execute-api.us-west-2.amazonaws.com/prod2/acidenttype',
            dataType: 'json',
            type: 'GET',
            crossDomain: true,
            success: function (res) {
                this.setState({options: res});
            }.bind(this)
        });
    }

    render() {
        return (
            <CustomSelect value={this.value} id="test"
                          name="test"
                          ref={(input) => {
                              this.value = input;
                          }}
                          options={this.state.options.AccidentClassification}
                          label="Test"/>
        )
    }
}