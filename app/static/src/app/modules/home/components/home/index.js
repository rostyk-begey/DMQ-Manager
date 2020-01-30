import React, { useState, useMemo, useEffect } from 'react';
import SiteWrapper from 'app/modules/app/containers/siteWrapper';

import {
  Page,
  Icon,
  Grid,
  Card,
  Text,
  Table,
  Alert,
  colors,
  Button,
  StampCard,
  StatsCard,
} from 'tabler-react';

import C3Chart from 'react-c3js';

export const Home = ({
  users,
  dataNodes,
  queues,
  isLoading,
  getUsers,
  getQueues,
  getDataNodes,
}) => {
  const producers = users.filter(({ permissions }) =>
    permissions.includes('send_message'),
  );
  const consumers = users.filter(({ permissions }) =>
    permissions.includes('get_message'),
  );

  const refreshData = () => {
    getUsers();
    getQueues();
    getDataNodes();
  };

  const defaultStatistics = queues.map(({ name }) => [
    name,
    Math.floor(Math.random() * 10),
  ]);

  const [statistics, setStatistics] = useState(defaultStatistics);

  const [{ address = '', port = '' } = {}, setDataNode] = useState(
    dataNodes[0],
  );

  const selectDataNode = _id => {
    setStatistics(defaultStatistics);
    const dataNode = dataNodes.filter(({ id }) => id === _id).pop();
    setDataNode(dataNode);
  };
  useEffect(() => {
    if (dataNodes[0]) {
      selectDataNode(dataNodes[0].id);
    }
  }, [dataNodes]);

  return (
    <SiteWrapper>
      <Page.Content
        title={
          <>
            Dashboard{' '}
            <Button
              size="sm"
              loading={isLoading}
              color="primary"
              onClick={refreshData}
            >
              Refresh
            </Button>
          </>
        }
      >
        <Grid.Row>
          <Grid.Col sm={6} lg={3}>
            <StampCard
              color="blue"
              icon="server"
              header={
                <>
                  {dataNodes.length}{' '}
                  <small>Data node{dataNodes.length > 1 ? 's' : ''}</small>
                </>
              }
              // footer="12 waiting payments"
            />
          </Grid.Col>
          <Grid.Col sm={6} lg={3}>
            <StampCard
              color="green"
              icon="database"
              header={
                <>
                  {queues.length}{' '}
                  <small>Queue{queues.length > 1 ? 's' : ''}</small>
                </>
              }
            />
          </Grid.Col>
          <Grid.Col sm={6} lg={3}>
            <StampCard
              color="red"
              icon="upload"
              header={
                <>
                  {producers.length}{' '}
                  <small>Producer{producers.length > 1 ? 's' : ''}</small>
                </>
              }
            />
          </Grid.Col>
          <Grid.Col sm={6} lg={3}>
            <StampCard
              color="yellow"
              icon="download"
              header={
                <>
                  {consumers.length}{' '}
                  <small>Consumer{consumers.length > 1 ? 's' : ''}</small>
                </>
              }
            />
          </Grid.Col>
        </Grid.Row>
        <Grid.Row cards>
          <Grid.Col lg={6}>
            <Card>
              <Card.Header>
                <Card.Title>
                  Statistics -{' '}
                  <span>
                    {address}:{port}
                  </span>
                </Card.Title>
              </Card.Header>
              <C3Chart
                style={{ height: '10rem' }}
                data={{
                  columns: statistics,
                  type: 'bar', // default type of chart
                }}
                legend={{
                  position: 'inset',
                  padding: 0,
                  inset: {
                    anchor: 'top-left',
                    x: 20,
                    y: 8,
                    step: 10,
                  },
                }}
                padding={{
                  bottom: 0,
                  left: -1,
                  right: -1,
                }}
                point={{
                  show: false,
                }}
              />
            </Card>
          </Grid.Col>
          <Grid.Col md={6}>
            <Card>
              <Card.Body>
                <Table
                  cards
                  responsive
                  highlightRowOnHover
                  className="table-vcenter"
                >
                  <Table.Header>
                    <Table.Row>
                      <Table.ColHeader>Host</Table.ColHeader>
                      <Table.ColHeader>Port</Table.ColHeader>
                      <Table.ColHeader />
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {dataNodes.map(({ id, address, port }) => (
                      <Table.Row key={id}>
                        <Table.Col className="w-1">{address}</Table.Col>
                        <Table.Col alignContent="left">{port}</Table.Col>
                        <Table.Col className="w-1">
                          <Button
                            pill
                            size="sm"
                            onClick={() => selectDataNode(id)}
                          >
                            View
                          </Button>
                        </Table.Col>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </Card.Body>
            </Card>
          </Grid.Col>
        </Grid.Row>
      </Page.Content>
    </SiteWrapper>
  );
};
