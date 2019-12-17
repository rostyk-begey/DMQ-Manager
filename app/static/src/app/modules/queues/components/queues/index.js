import React, { useState, useEffect } from 'react';
import SiteWrapper from 'app/modules/app/containers/siteWrapper';

import {
  Alert,
  Text,
  Progress,
  Dropdown,
  Avatar,
  Card,
  colors,
  Button,
  Grid,
  Icon,
  Page,
  StatsCard,
  Table,
  Form,
} from 'tabler-react';
import C3Chart from 'react-c3js';

const Queues = ({ isLoading, queues, createQueue, deleteQueue }) => {
  const [name, setName] = useState('');

  const addQueue = () => createQueue({ name });

  return (
    <SiteWrapper>
      <Page.Content title="Queues">
        <Grid.Row cards>
          <Grid.Col lg={3}>
            <Card>
              <Card.Header>
                <Card.Title>Create new queue</Card.Title>
              </Card.Header>

              <Card.Body>
                <Form.Group label="Name">
                  <Form.InputGroup>
                    <Form.Input
                      placeholder="Queue name"
                      type="text"
                      onChange={({ target: { value } }) => {
                        setName(value);
                      }}
                    />
                  </Form.InputGroup>
                </Form.Group>
                <Button
                  color="primary"
                  RootComponent="button"
                  loading={isLoading}
                  onClick={addQueue}
                >
                  Add
                </Button>
              </Card.Body>
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
                      <i className="icon-settings" />
                    </Table.ColHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {queues.map(({ id, name }) => (
                    <Table.Row key={id}>
                      <Table.Col>
                        <div>{name}</div>
                      </Table.Col>
                      <Table.Col className="w-1" alignContent="center">
                        <Icon
                          link
                          name="trash"
                          onClick={() => deleteQueue(id)}
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

export default Queues;
