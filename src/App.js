import React, {Component} from "react";
import NavegationApi from './logics/NavigationApi'
import MetisMenu from "react-metismenu";
import NavDrawer from "react-toolbox/lib/layout/NavDrawer";
import RouterLink from "react-metismenu-router-link";
import Navigation from "react-toolbox/lib/navigation/Navigation";
import Link from "react-toolbox/lib/link/Link";
import AppBar from "react-toolbox/lib/app_bar/AppBar";
import Layout from "react-toolbox/lib/layout/Layout";
import Panel from "react-toolbox/lib/layout/Panel";
import FontIcon from "react-toolbox/lib/font_icon";
import Sidebar from 'react-toolbox/lib/layout/Sidebar';
import IconButton from 'react-toolbox/lib/button/IconButton';
import {connect} from 'react-redux';

class App extends Component {

    // componentDidMount(){
    //     this.props.toggleDrawer();
    // }

    render() {
        const menu = [
            {
                icon: 'dashboard',
                label: 'Sigtrans',
                to: '/home'
            },
            {
                icon: 'bell',
                label: 'Ocorrencias',
                content: [
                    {
                        label: 'Abertas',
                        to: '/ocorrencias/abertas'
                    },
                    {
                        label: 'Fechadas',
                        to: '/ocorrencias/fechadas'
                    },
                    {
                        label: 'Criar',
                        to: '/ocorrencias/criar',
                    }
                ]
            },
            {
                icon: 'ambulance',
                label: 'Ocorrencias fatais',
                to: '/obitos'
            },
            {
                icon: 'area-chart',
                label: 'Relatórios',
                content: [
                    {
                        label: 'Estatisticos',
                        to: '/relatorios/estatisticos'
                    },
                    {
                        label: 'Gerenciais',
                        to: '/relatorios/gerenciais'
                    },
                ]
            }
        ];
        return (
            <div id="root">
                <div className="main">
                    <Layout>
                        <NavDrawer pinned={this.props.menus.drawer}>
                            <MetisMenu content={menu}
                                       LinkComponent={RouterLink}
                                       useExternalReduxStore={this.props.useExternalReduxStore}
                            />
                            {console.log(JSON.stringify(this.store, null, 4))}
                            {console.log(JSON.stringify(this.props.store, null, 4))}
                        </NavDrawer>
                        <Panel>
                            <AppBar title=" "
                                    leftIcon={<FontIcon className="md-24 md-dark" value='menu'/>}
                                    rightIcon={<FontIcon className="md-24 md-dark" value='account_circle'/>}
                                    onLeftIconClick={this.props.toggleDrawer}
                                    onRightIconClick={this.props.toggleSidebar}
                                    className="app-bar">
                                <Navigation type="horizontal">
                                    <Link href="#" label="Mensagens" icon="inbox"/>
                                    <Link href="#" active label="Perfil" icon="person"/>
                                </Navigation>
                            </AppBar>
                            <div style={{flex: 1, overflowY: 'auto', padding: '1.8rem'}}>
                                <div className="content-interior">
                                    {this.props.children}
                                </div>
                            </div>
                        </Panel>
                        <Sidebar pinned={ this.props.menus.sidebar } width={ 5 }>
                            <div><IconButton icon='close' onClick={this.props.toggleSidebar}/></div>
                            <div style={{flex: 1}}>
                                <p>Supplemental content goes here.</p>
                            </div>
                        </Sidebar>
                    </Layout>
                </div>
            </div>
        );
    }
}

App.contextTypes = {
    store: React.PropTypes.object.isRequired,
    useExternalReduxStore: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        menus: state.menus
    }
};

const mapDispatchToProps = dispatch => {
    return {
        toggleDrawer: () => {
            dispatch(NavegationApi.toggleDrawer());
        },
        toggleSidebar: () => {
            dispatch(NavegationApi.toggleSidebar());
        }
    }
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;