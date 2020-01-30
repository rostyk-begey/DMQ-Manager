import React, { useState, useCallback } from 'react';
import SiteWrapper from 'app/modules/app/containers/siteWrapper';

import {
  Tag,
  Card,
  Button,
  Grid,
  Icon,
  Page,
  Table,
  Dimmer,
  Form,
} from 'tabler-react';

const useUsers = (users, createUser, updateUser, deleteUser) => {
  const [user, setCurrentUser] = useState({ permissions: [] });

  const selectUser = useCallback(
    _id => {
      setCurrentUser(users.filter(({ id }) => id === _id).pop());
    },
    [users],
  );

  const isNewUser = user.id === undefined;

  const cancelUpdate = () => setCurrentUser({});

  const addUser = useCallback(() => {
    if (user.username.length && user.password.length) {
      createUser(user);
      cancelUpdate();
    }
  }, [user]);

  const modifyCurrentUser = useCallback(
    data => {
      setCurrentUser({ ...user, ...data });
    },
    [user],
  );

  const removeUser = useCallback(
    id => {
      deleteUser(id);
      if (id === user.id) {
        cancelUpdate();
      }
    },
    [user],
  );

  const updateUsersPermissions = useCallback(
    ({ target: { value, checked } }) => {
      let permissions = new Set([...users.permissions]);
      if (checked) {
        permissions.add(value);
      } else {
        permissions.delete(value);
      }
      permissions = [...permissions];
      modifyCurrentUser({ permissions });
    },
    [user],
  );

  return {
    user,
    isNewUser,
    addUser,
    updateUser,
    removeUser,
    selectUser,
    cancelUpdate,
    updateUsersPermissions,
  };
};

const Users = ({ isLoading, users, createUser, updateUser, deleteUser }) => {
  const defaultPermissions = [
    'create_queues',
    'delete_queues',
    'connect_nodes',
    'disconnect_nodes',
    'send_message',
    'get_message',
  ];

  const {
    user,
    isNewUser,
    addUser,
    removeUser,
    cancelUpdate,
    selectUser,
    updateUsersPermissions,
    modifyCurrentUser,
  } = useUsers(users, createUser, updateUser, deleteUser);

  const passwordInput = (
    <Form.Group label="Password">
      <Form.InputGroup>
        <Form.Input
          placeholder="Password"
          type="password"
          icon="lock"
          value={user.password}
          onChange={({ target: { value: password } }) => {
            modifyCurrentUser({ password });
          }}
        />
      </Form.InputGroup>
    </Form.Group>
  );
  const addBtn = (
    <Button
      color="primary"
      RootComponent="button"
      disabled={isLoading}
      onClick={addUser}
    >
      Add
    </Button>
  );
  const updateBtn = (
    <Button
      color="primary"
      RootComponent="button"
      disabled={isLoading}
      onClick={() => updateUser(user)}
    >
      Update
    </Button>
  );

  const cancelBtn = (
    <Button color="secondary" RootComponent="button" onClick={cancelUpdate}>
      Cancel
    </Button>
  );

  return (
    <SiteWrapper>
      <Page.Content title="Users">
        <Grid.Row cards>
          <Grid.Col lg={3}>
            <Card>
              <Card.Header>
                <Card.Title>Create new user</Card.Title>
              </Card.Header>
              <Card.Body>
                <Dimmer active={isLoading} loader>
                  <Form.Group label="User name">
                    <Form.InputGroup>
                      <Form.Input
                        placeholder="User name"
                        type="text"
                        icon="user"
                        onChange={({ target: { value: username } }) => {
                          modifyCurrentUser({ username });
                        }}
                      />
                    </Form.InputGroup>
                  </Form.Group>
                  {isNewUser ? passwordInput : ''}
                  <Form.Group label="Permissions">
                    {defaultPermissions.map(permission => (
                      <Form.Checkbox
                        key={permission}
                        label={permission}
                        name={permission}
                        value={permission}
                        checked={
                          user.permissions &&
                          user.permissions.includes(permission)
                        }
                        onChange={updateUsersPermissions}
                        onClick={updateUsersPermissions}
                      />
                    ))}
                  </Form.Group>
                </Dimmer>
              </Card.Body>
              <Card.Footer>
                <Button.List align="right">
                  {isNewUser ? addBtn : ''}
                  {isNewUser ? '' : updateBtn}
                  {isNewUser ? '' : cancelBtn}
                </Button.List>
              </Card.Footer>
            </Card>
          </Grid.Col>
          <Grid.Col width={9}>
            <Card>
              <Table
                responsive
                highlightRowOnHover
                hasOutline
                verticalAlign="center"
                cards
                className="text-nowrap"
              >
                <Table.Header>
                  <Table.Row>
                    <Table.ColHeader>Name</Table.ColHeader>
                    <Table.ColHeader alignContent="center">
                      Permissions
                    </Table.ColHeader>
                    <Table.ColHeader alignContent="center">
                      <i className="icon-settings" />
                    </Table.ColHeader>
                    <Table.ColHeader alignContent="center">
                      <i className="icon-settings" />
                    </Table.ColHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {users.map(({ id, username, permissions }) => (
                    <Table.Row key={id}>
                      <Table.Col>
                        <div>{username}</div>
                      </Table.Col>
                      <Table.Col alignContent="left">
                        <Tag.List align="left">
                          {permissions.map(permission => (
                            <Tag rounded key={permission}>
                              {permission}
                            </Tag>
                          ))}
                        </Tag.List>
                      </Table.Col>
                      <Table.Col className="w-1" alignContent="center">
                        <Icon link name="edit" onClick={() => selectUser(id)} />
                      </Table.Col>
                      <Table.Col className="w-1" alignContent="center">
                        <Icon
                          link
                          name="trash"
                          onClick={() => removeUser(id)}
                        />
                      </Table.Col>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Card>
          </Grid.Col>
        </Grid.Row>
      </Page.Content>
    </SiteWrapper>
  );
};

export default Users;
