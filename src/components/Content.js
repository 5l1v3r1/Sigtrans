/**
 * Created by natal on 05/06/17.
 */
import React, {Component} from 'react';
import Navigation from "react-toolbox/lib/navigation/Navigation";
import Link from "react-toolbox/lib/link/Link";
import AppBar from "react-toolbox/lib/app_bar/AppBar";
import Panel from "react-toolbox/lib/layout/Panel";
import FontIcon from "react-toolbox/lib/font_icon";
import {connect} from 'react-redux';
import NavegationAPI from '../logics/NavegationApi'

class Content extends Component {
    render() {
        return (
            <Panel>
                <AppBar title=" "
                        leftIcon={<FontIcon className="md-24 md-dark" value='menu'/>}
                        rightIcon={<FontIcon className="md-24 md-dark" value='account_circle'/>}
                        onLeftIconClick={this.toggleDrawer}
                        flat
                        className="app-bar">
                    <Navigation type="horizontal">
                        <Link href="#" label="Inbox" icon="inbox"/>
                        <Link href="#" active label="Profile" icon="person"/>
                    </Navigation>
                </AppBar>
                <div style={{flex: 1, overflowY: 'auto', padding: '1.8rem'}}>
                    <div className="content-interior">
                        {/*{this.props.children}*/}
                    </div>
                </div>
            </Panel>
        )
    }
}

const mapStateToProps = state => {
    return {drawerPinned: state.drawerPinned}
};

const mapDispatchToProps = dispatch => {
    return {
        toggleDrawer: (drawerPinned) => {
            console.log(drawerPinned);
            dispatch(NavegationAPI.toggleDrawer(drawerPinned));
        }
    }
}

const ContentContainer = connect(mapStateToProps, mapDispatchToProps)(Content);

export default ContentContainer;