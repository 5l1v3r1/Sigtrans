import React, {Component} from 'react';
import MetisMenu from 'react-metismenu';
import RouterLink from 'react-metismenu-router-link';
import FontIcon from 'react-toolbox/lib/font_icon';

import AppBar from 'react-toolbox/lib/app_bar/AppBar';
// import Checkbox from 'react-toolbox/lib/checkbox/Checkbox';
import Layout from 'react-toolbox/lib/layout/Layout';
import NavDrawer from 'react-toolbox/lib/layout/NavDrawer';
import Panel from 'react-toolbox/lib/layout/Panel';
// import Sidebar from 'react-toolbox/lib/layout/Sidebar';
// import IconButton from 'react-toolbox/lib/button/IconButton';

const menu = [
    {
        icon: 'dashboard',
        label: 'Sigtrans',
        to: '/',
    },
    {
        icon: 'bell',
        label: 'Ocorrencias',
        content: [
            {
                icon: 'bolt',
                label: 'Abertas',
                to: '/ocorrencias/abertas'
            },
            {
                icon: 'bolt',
                label: 'Criar',
                to: '/ocorrencias/fechadas',
            }
        ]
    }
];

class App extends Component {
    constructor() {
        super();
        this.state = {
            drawerPinned: true,
        };
    }

    toggleDrawerPinned = () => {
        this.setState({drawerPinned: !this.state.drawerPinned});
    };

    render() {
        return (
            <div>
                {/* <div className="navigation">
                 <MetisMenu content={menu} LinkComponent={RouterLink} />
                 </div>

                 <input type="checkbox" id="nav-trigger" className="nav-trigger" />
                 <label htmlFor="nav-trigger"><FontIcon className="md-24" value='menu'/></label>

                 <div className="site-wrap">
                 {this.props.children}
                 </div>*/}
                <Layout>
                    <NavDrawer pinned={this.state.drawerPinned} permanentAt='xxxl'>
                        <MetisMenu content={menu} LinkComponent={RouterLink}/>
                    </NavDrawer>
                    <Panel>
                        <AppBar leftIcon={<FontIcon className="md-24 md-dark" value='menu'/>}
                                onLeftIconClick={ this.toggleDrawerPinned } flat className="apb"/>
                        <div style={{flex: 1, overflowY: 'auto', padding: '1.8rem'}}>
                            <div className="content-interior">
                                {this.props.children}
                            </div>
                        </div>
                    </Panel>
                </Layout>
            </div>
        );
    }
}

export default App;