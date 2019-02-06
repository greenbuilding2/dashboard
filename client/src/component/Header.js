import React, { Component, Fragment, Suspense } from 'react';
import { Link, IndexLink } from 'react-router';
import { Nav, NavLink, NavItem } from 'reactstrap';
import _ from 'lodash';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Menu, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { Container } from 'reactstrap';
import DefaultHeader from '../pages/dashboard/DefaultHeader';
import DefaultAside from '../pages/dashboard/DefaultAside';
import DefaultFooter from '../pages/dashboard/DefaultFooter';
import navigation from '../_nav';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';

import Auth from '../modules/Auth';

class Header extends Component  {

  render() {
    const { children } = this.props;
    console.log("this.props is >>>", this.props);
    let props = _.omit(this.props, 'children');
    return (
      <div className="app">
        {Auth.isUserAuthenticated() &&
          <AppHeader fixed>
            <Suspense>
              <DefaultHeader onLogout={e=>this.signOut(e)}/>
            </Suspense>
          </AppHeader>
        }
        <div className="app-body">
          <ToastContainer autoClose={2000}/>
          { Auth.isUserAuthenticated() &&
          <AppSidebar fixed display="lg" style={{backgroundColor: '#88aae0'}}>
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
            <Nav>
              <NavItem>
                <NavLink tag={Link} to="/">MapView</NavLink>
              </NavItem>
              { Auth.getUser()!=='client' &&
                <NavItem>
                  <NavLink tag={Link} to="/">Infra Manager</NavLink>
                </NavItem>
              }
              { Auth.getUser()!=='client' &&
                <NavItem>
                  <NavLink tag={Link} to="/sensor-data-manager">Data Manager</NavLink>
                </NavItem>
              }
            </Nav>
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          }
          <main className="main">
            {/*<AppBreadcrumb appRoutes={routes}/> */}
            <Container fluid>
              <Suspense >
                {children}
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        {Auth.isUserAuthenticated() &&
        <AppFooter>
          <Suspense >
            <DefaultFooter />
          </Suspense>
        </AppFooter>
        }
        {/*
        <div style={{'height': '100vh'}}>
          {Auth.isUserAuthenticated() ?
            (<Menu>
              <Menu.Item position="left">
                <IndexLink to="/">Home</IndexLink>
              </Menu.Item>
              { Auth.getUser()==='client' ?
                (<Fragment>
                  <Menu.Item position="left">
                    <Link>Client</Link>
                  </Menu.Item>
                </Fragment>) :
                (<Fragment>
                  <Menu.Item position="left">
                    <Link to="/infra-manager">Infra Manager</Link>
                  </Menu.Item>
                  <Menu.Item position="left">
                    <Link to="/data-manager">Data Manager</Link>
                  </Menu.Item>
                </Fragment>)
              }
              <Menu.Item position="right">
                <Link to="/logout"><Button primary>Logout</Button></Link>
              </Menu.Item>
            </Menu>) : null
          }
          */}
      </div>
    );
  }
};

Header = withRouter(Header);

export default Header;
