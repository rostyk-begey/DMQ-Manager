import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import {
  Site,
  Nav,
  Grid,
  List,
  Button,
  RouterContextProvider,
} from 'tabler-react';

const navBarItems = [
  {
    value: 'Home',
    to: '/',
    icon: 'home',
    LinkComponent: withRouter(NavLink),
    useExact: true,
  },
  {
    value: 'Data nodes',
    icon: 'server',
    to: '/data-nodes',
    LinkComponent: withRouter(NavLink),
  },
  {
    value: 'Queues',
    icon: 'database',
    to: '/queues',
    LinkComponent: withRouter(NavLink),
  },
  {
    value: 'Users',
    icon: 'users',
    to: '/users',
    LinkComponent: withRouter(NavLink),
  },
  {
    icon: 'file-text',
    value: 'Documentation',
    to: '/documentation',
    LinkComponent: withRouter(NavLink),
  },
];

const accountDropdownProps = logoutFn => ({
  avatarURL: '/',
  name: 'Jane Pearson',
  description: 'Administrator',
  options: [
    { icon: 'user', value: 'Profile' },
    { icon: 'settings', value: 'Settings' },
    { icon: 'mail', value: 'Inbox', badge: '6' },
    { icon: 'send', value: 'Message' },
    { isDivider: true },
    { icon: 'help-circle', value: 'Need help?' },
    { icon: 'log-out', value: 'Sign out', onClick: logoutFn },
  ],
});

export const SiteWrapper = ({ children, authLogout }) => {
  return (
    <Site.Wrapper
      headerProps={{
        href: '/',
        alt: 'Python DMQ',
        imageURL: './demo/brand/tabler.svg',
        navItems: (
          <Nav.Item type="div" className="d-none d-md-flex">
            <Button
              href="https://github.com/rostyk-begey/DMQ-Manager"
              target="_blank"
              outline
              size="sm"
              RootComponent="a"
              color="primary"
            >
              Source code
            </Button>
          </Nav.Item>
        ),
        accountDropdown: accountDropdownProps(authLogout),
      }}
      navProps={{ itemsObjects: navBarItems }}
      routerContextComponentType={withRouter(RouterContextProvider)}
      footerProps={{
        links: [
          <NavLink to="/login">First Link</NavLink>,
          <NavLink to="/">Second Link</NavLink>,
          <NavLink to="/">Third Link</NavLink>,
          <NavLink to="/">Fourth Link</NavLink>,
          <NavLink to="/">Five Link</NavLink>,
          <NavLink to="/">Sixth Link</NavLink>,
          <NavLink to="/">Seventh Link</NavLink>,
          <NavLink to="/">Eigth Link</NavLink>,
        ],
        note: 'Distributed message queue',
        copyright: (
          <>
            Copyright © 2019
            <a href="."> Python DMQ</a>. All rights reserved.
          </>
        ),
        nav: (
          <>
            <Grid.Col auto>
              <List className="list-inline list-inline-dots mb-0">
                <List.Item className="list-inline-item">
                  <NavLink to="/documentation">Documentation</NavLink>
                </List.Item>
              </List>
            </Grid.Col>
            <Grid.Col auto>
              <Button
                href="https://github.com/rostyk-begey/DMQ-Manager"
                size="sm"
                outline
                color="primary"
                RootComponent="a"
              >
                Source code
              </Button>
            </Grid.Col>
          </>
        ),
      }}
    >
      {children}
    </Site.Wrapper>
  );
};
