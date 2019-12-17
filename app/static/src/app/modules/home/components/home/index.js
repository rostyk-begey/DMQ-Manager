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

export const Home = ({ dataNodes, queues, isLoading }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    setUsers([
      { id: '0001', role: 'producer' },
      { id: '0002', role: 'consumer' },
      { id: '0003', role: 'producer' },
    ]);
  }, []);

  const producers = useMemo(
    () => users.filter(({ role }) => role === 'producer'),
    users,
  );
  const consumers = useMemo(
    () => users.filter(({ role }) => role === 'consumer'),
    users,
  );

  return (
    <SiteWrapper>
      <Page.Content
        title={
          <>
            Dashboard{' '}
            <Button size="sm" loading={isLoading} color="primary">
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
                <Card.Title>Development Activity</Card.Title>
              </Card.Header>
              <C3Chart
                style={{ height: '10rem' }}
                data={{
                  columns: [
                    // each columns data
                    [
                      'data1',
                      0,
                      5,
                      1,
                      2,
                      7,
                      5,
                      6,
                      8,
                      24,
                      7,
                      12,
                      5,
                      6,
                      3,
                      2,
                      2,
                      6,
                      30,
                      10,
                      10,
                      15,
                      14,
                      47,
                      65,
                      55,
                    ],
                  ],
                  type: 'area-spline', // default type of chart
                  groups: [['data1']],
                  colors: {
                    data1: colors['blue'],
                  },
                  names: {
                    // name of each serie
                    data1: 'Purchases',
                  },
                }}
                axis={{
                  y: {
                    padding: {
                      bottom: 0,
                    },
                    show: false,
                    tick: {
                      outer: false,
                    },
                  },
                  x: {
                    padding: {
                      left: 0,
                      right: 0,
                    },
                    show: false,
                  },
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
                tooltip={{
                  format: {
                    title(x) {
                      return '';
                    },
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
                  {dataNodes.map(({ host, port }) => (
                    <Table.Row>
                      <Table.Col className="w-1">{host}</Table.Col>
                      <Table.Col alignContent="left">{port}</Table.Col>
                      <Table.Col className="w-1">
                        <Icon link name="trash" />
                      </Table.Col>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Card>
          </Grid.Col>
          <Grid.Col md={6}>
            <Alert type="primary">
              <Alert.Link href="/documentation">
                Read our documentation
              </Alert.Link>{' '}
              with code samples.
            </Alert>
            <Grid.Row>
              <Grid.Col sm={6}>
                <Card>
                  <Card.Header>
                    <Card.Title>Chart title</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <C3Chart
                      style={{ height: '12rem' }}
                      data={{
                        columns: [
                          // each columns data
                          ['data1', 63],
                          ['data2', 37],
                        ],
                        type: 'donut', // default type of chart
                        colors: {
                          data1: colors['green'],
                          data2: colors['green-light'],
                        },
                        names: {
                          // name of each serie
                          data1: 'Maximum',
                          data2: 'Minimum',
                        },
                      }}
                      legend={{
                        show: false, //hide legend
                      }}
                      padding={{
                        bottom: 0,
                        top: 0,
                      }}
                    />
                  </Card.Body>
                </Card>
              </Grid.Col>
              <Grid.Col sm={6}>
                <Card>
                  <Card.Header>
                    <Card.Title>Chart title</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <C3Chart
                      style={{ height: '12rem' }}
                      data={{
                        columns: [
                          // each columns data
                          ['data1', 63],
                          ['data2', 44],
                          ['data3', 12],
                          ['data4', 14],
                        ],
                        type: 'pie', // default type of chart
                        colors: {
                          data1: colors['blue-darker'],
                          data2: colors['blue'],
                          data3: colors['blue-light'],
                          data4: colors['blue-lighter'],
                        },
                        names: {
                          // name of each serie
                          data1: 'A',
                          data2: 'B',
                          data3: 'C',
                          data4: 'D',
                        },
                      }}
                      legend={{
                        show: false, //hide legend
                      }}
                      padding={{
                        bottom: 0,
                        top: 0,
                      }}
                    />
                  </Card.Body>
                </Card>
              </Grid.Col>
            </Grid.Row>
            <Grid.Row>
              <Grid.Col width={6} sm={4} lg={4}>
                <StatsCard
                  layout={1}
                  movement={3}
                  total="27.3k"
                  label="Followers"
                />
              </Grid.Col>
              <Grid.Col width={6} sm={4} lg={4}>
                <StatsCard
                  layout={1}
                  movement={-2}
                  total="$95"
                  label="Daily earnings"
                />
              </Grid.Col>
              <Grid.Col width={6} sm={4} lg={4}>
                <StatsCard
                  layout={1}
                  movement={-1}
                  total="621"
                  label="Products"
                />
              </Grid.Col>
            </Grid.Row>
          </Grid.Col>
        </Grid.Row>
      </Page.Content>
    </SiteWrapper>
  );
};
