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

const DataNodes = ({
  isLoading,
  dataNodes,
  createDataNode,
  deleteDataNode,
}) => {
  const [ip, setIp] = useState('');
  const [port, setPort] = useState('');

  const [isIpValid, setIsIpValid] = useState(false);
  const [isPortValid, setIsPortValid] = useState(false);
  const isDataNodeValid = isIpValid && isPortValid;

  const addDataNode = () => {
    if (isDataNodeValid) {
      createDataNode({ address: ip, port });
    }
  };

  const cpuLoadColor = cpu => {
    let color = 'red';
    if (cpu < 0.25) color = 'green';
    else if (cpu < 0.5) color = 'yellow';
    else if (cpu < 0.75) color = 'orange';
    return color;
  };

  return (
    <SiteWrapper>
      <Page.Content title="Data Nodes">
        <Grid.Row cards>
          <Grid.Col lg={3}>
            <Card>
              <Card.Header>
                <Card.Title>Connect a new data node</Card.Title>
              </Card.Header>

              <Card.Body>
                <Form.Group label="Address">
                  <Form.InputGroup>
                    <Form.InputGroupPrepend>
                      <Form.InputGroupText>http://</Form.InputGroupText>
                    </Form.InputGroupPrepend>
                    <Form.Input
                      placeholder="127.0.0.1"
                      invalid={!isIpValid && ip}
                      // ensures that every subsection of the ip address is greater than 0 and lower than 256
                      onChange={({ target: { value } }) => {
                        const re = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
                        setIsIpValid(re.test(value));
                        setIp(value);
                      }}
                    />
                  </Form.InputGroup>
                </Form.Group>

                <Form.Group label="Port">
                  <Form.InputGroup>
                    <Form.Input
                      placeholder="5000"
                      type="number"
                      invalid={!isPortValid && port}
                      max={99999}
                      min={1}
                      maxLength="5"
                      onChange={({ target: { value } }) => {
                        setIsPortValid(value.length < 6 && value > 0);
                        setPort(value);
                      }}
                    />
                  </Form.InputGroup>
                </Form.Group>
                <Button
                  color="primary"
                  RootComponent="button"
                  loading={isLoading}
                  onClick={addDataNode}
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
                    <Table.ColHeader>Url</Table.ColHeader>
                    <Table.ColHeader>CPU Usage</Table.ColHeader>
                    <Table.ColHeader alignContent="center">
                      <i className="icon-settings" />
                    </Table.ColHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {dataNodes.map(({ id, host, port, cpu }) => (
                    <Table.Row key={id}>
                      <Table.Col>
                        <div>
                          {host}:{port}
                        </div>
                      </Table.Col>
                      <Table.Col>
                        <div className="clearfix">
                          <div className="float-left">
                            <strong>{(cpu * 100).toPrecision(4)} %</strong>
                          </div>
                          <div className="float-right">
                            <Text.Small muted>
                              Jun 11, 2015 - Jul 10, 2015
                            </Text.Small>
                          </div>
                        </div>
                        <Progress size="xs">
                          <Progress.Bar
                            color={cpuLoadColor(cpu)}
                            width={cpu * 100}
                          />
                        </Progress>
                      </Table.Col>
                      <Table.Col className="w-1" alignContent="center">
                        <Icon
                          link
                          name="trash"
                          onClick={() => deleteDataNode(id)}
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

export default DataNodes;
