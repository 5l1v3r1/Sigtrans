import React, { Component } from 'react';
import MetisMenu from 'react-metismenu';
import RouterLink from 'react-metismenu-router-link';
import FontIcon from 'react-toolbox/lib/font_icon';

/*import AppBar from 'react-toolbox/lib/app_bar/AppBar';
import Checkbox from 'react-toolbox/lib/checkbox/Checkbox';
import Layout from 'react-toolbox/lib/layout/Layout';
import NavDrawer from 'react-toolbox/lib/layout/NavDrawer';
import Panel from 'react-toolbox/lib/layout/Panel';
import Sidebar from 'react-toolbox/lib/layout/Sidebar';
import IconButton from 'react-toolbox/lib/button/IconButton';*/

const menu=[
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
                to:'/ocorrencias/abertas'
            },         
            {
                icon: 'bolt',
                label: 'Fechadas',
                to: '/ocorrencias/fechadas',
            }       
        ]
    }
];

class App extends Component {
   constructor(){
        super();
        this.state={drawerActive: false,
            drawerPinned: false,
            sidebarPinned: false};
    }
/*
    toggleDrawerActive = () => {
        this.setState({ drawerActive: !this.state.drawerActive });
    };

    toggleDrawerPinned = () => {
        this.setState({ drawerPinned: !this.state.drawerPinned });
    }

    toggleSidebar = () => {
        this.setState({ sidebarPinned: !this.state.sidebarPinned });
    };*/

	render(){
		return(
			<div>
                <div className="navigation">
					<MetisMenu content={menu} LinkComponent={RouterLink} />
				</div>

				<input type="checkbox" id="nav-trigger" className="nav-trigger" />
				<label htmlFor="nav-trigger"><FontIcon className="md-24" value='menu'/></label>

				<div className="site-wrap">
					{this.props.children}
				</div>

                {/*
                <Layout>
                    <NavDrawer active={this.state.drawerActive}
                        pinned={this.state.drawerPinned} permanentAt='xxxl'
                        onOverlayClick={ this.toggleDrawerActive }>
                        <MetisMenu content={menu} LinkComponent={RouterLink} />
                    </NavDrawer>
                    <Panel>
                        <AppBar leftIcon='menu' onLeftIconClick={ this.toggleDrawerActive } />
                        <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
                            {this.props.children}
                            <Checkbox label='Pin drawer' checked={this.state.drawerPinned} onChange={this.toggleDrawerPinned} />
                            <Checkbox label='Show sidebar' checked={this.state.sidebarPinned} onChange={this.toggleSidebar} />
                        </div>
                    </Panel>
                    <Sidebar pinned={ this.state.sidebarPinned } width={ 5 }>
                        <div><IconButton icon='close' onClick={ this.toggleSidebar }/></div>
                        <div style={{ flex: 1 }}>
                            <p>Supplemental content goes here.</p>
                        </div>
                    </Sidebar>
                </Layout>*/}

			</div>
        );
	}
}

export default App;