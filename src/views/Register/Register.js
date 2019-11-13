import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, 
  InputGroupAddon, InputGroupText, Row } from 'reactstrap';

import { userActions } from '../../_actions'; 

class Register extends Component {
  constructor(props) {
      super(props);

      this.state = {
          user: {
              email: '',
              username: '',
              password: ''
          },
          submitted: false
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
      const { name, value } = event.target;
      const { user } = this.state;
      this.setState({
          user: {
              ...user,
              [name]: value
          }
      });
  }

  handleSubmit(event) {
      event.preventDefault();

      this.setState({ submitted: true });
      const { user } = this.state;
      if (user.email && user.username && user.password) {
          this.props.register(user);
      }
  }
  render() {
    const { registering  } = this.props;
    const { user, submitted } = this.state;
    return (
      <div className="animated fadeIn">
          <Row>
            <Col xl={12}>
              <Card>
                <CardBody>
                  <Form name="form" onSubmit={this.handleSubmit}>
                    <p className="text-muted">Register your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input name="username" type="text" placeholder="Username" autoComplete="username" value={user.username} onChange={this.handleChange}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input name="email" type="text" placeholder="Email" autoComplete="email" value={user.email} onChange={this.handleChange}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input name="password" type="password" placeholder="Password" autoComplete="new-password" value={user.password} onChange={this.handleChange}/>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Repeat password" autoComplete="new-password" />
                    </InputGroup>
                    <Button color="success">Create Account</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
      </div>
    );
  }
}

function mapState(state) {
  const { registering } = state.registration;
  return { registering };
}

const mapDispatchToProps = {
  register: userActions.register
}


export default connect(mapState, mapDispatchToProps)(Register);
