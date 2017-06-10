/**
 * Created by natal on 05/06/17.
 */

import React, {Component} from 'react';
// import NavegationAPI from '../logics/NavegationAPI'
import MetisMenu from "react-metismenu";
import NavDrawer from "react-toolbox/lib/layout/NavDrawer";
import RouterLink from "react-metismenu-router-link";


class Drawer extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (

            <div></div>
        )
    }
}

const mapStateToProps = state => {
    return {drawerPinned: state.drawerPinned}
};

// const mapDispatchToProps = dispatch => {
//     return {
//         toggleDrawer3 : (drawerPin) => {
//             dispatch(NavegationAPI.toggleDrawer3(drawerPin));
//         }
//     }
// }

const DrawerContainer = connect(mapStateToProps)(Drawer);

export default DrawerContainer;