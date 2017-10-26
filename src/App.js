import React, {Component} from "react";
import NavegationApi from './logics/NavigationApi'
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
import MetisMenu from "react-metismenu";
import {connect} from 'react-redux';

class App extends Component {
    render() {

        const menu = [
            {
                icon: 'dashboard',
                label: 'Inicio',
                to: '/'
            },
            {
                icon: 'bell',
                label: 'Ocorrencias',
                content: [
                    {
                        label: 'Abertas',
                        to: 'abertas'
                    },
                    {
                        label: 'Fechadas',
                        to: 'fechadas'
                    },
                    {
                        label: 'Criar',
                        to: 'criar',
                    }
                ]
            },
            {
                icon: 'ambulance',
                label: 'Análise de Óbitos',
                to: 'obitos'
            },
            {
                icon: 'area-chart',
                label: 'Relatórios',
                content: [
                    {
                        label: 'Estatisticos',
                        to: 'estatisticos'
                    },
                    {
                        label: 'Gerenciais',
                        to: 'gerenciais'
                    },
                ]
            }
        ];
        return (
            <div id="root">
                <div className="main">
                    <Layout>
                        <NavDrawer pinned={this.props.menus.drawer} permanentAt='xxxl'>
                            <MetisMenu content={menu} LinkComponent={RouterLink}
                                       className='mainMenu'
                                       reduxStoreName={"metisMenuReducer"}
                                       useExternalReduxStore={this.context.store}
                                       activeLinkFromLocation
                            />
                        </NavDrawer>
                        <Panel>

                            <AppBar className="app-bar" title=" " flat
                                    leftIcon={<FontIcon className="md-24 md-light" value='menu'/>}
                                    rightIcon={<FontIcon className="md-24 md-light" value='account_circle'/>}
                                    onLeftIconClick={this.props.toggleDrawer}
                                    onRightIconClick={this.props.toggleSidebar}
                            >
                                <Navigation type="horizontal">
                                    <Link href="#" className='app-bar' label="Mensagens" icon="inbox"/>
                                    <Link href="#" className='app-bar' active label="Perfil" icon="person"/>
                                </Navigation>
                            </AppBar>
                            <div style={{flex: 1, overflowY: 'auto', padding: '1.8rem'}}>
                                <div className="content-interior">
                                    {this.props.children}
                                </div>
                            </div>
                        </Panel>
                        <Sidebar pinned={this.props.menus.sidebar} width={5}>
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
    store: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        menus: state.menus,
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