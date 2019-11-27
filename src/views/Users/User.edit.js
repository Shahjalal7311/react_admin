import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, 
  InputGroupAddon, InputGroupText, Row } from 'reactstrap';

import { userActions } from '../../_actions'; 

class UserEdit extends Component {
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

  componentDidMount(){
    const id = this.props.history.location.pathname.split('/')[2];
    this.setState({ submitted: true });
    const { user } = this.state;
    this.props.usergetById(id);
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
      const { name, value } = event.target;
      if (event.target.email['value'] && event.target.email['value']) {
        const updateItem = {
          _id: event.target._id['value'],
          username: event.target.username['value'],
          email: event.target.email['value'],
          password: event.target.password['value'],
        }
        this.props.userUpdate(updateItem);
      }
  }
  render() {
    const { users  } = this.props;
    const { submitted } = this.state;
    if(users.item){
    return (
      <div className="animated fadeIn">
        
          <Row>
            <Col xl={12}>
              <Card>
                <CardBody>
                  <Form name="form" onSubmit={this.handleSubmit}>
                  <Input name="_id" type="hidden" onChange={this.handleChange} defaultValue={users.item._id}/>
                  <Input name="password" type="hidden" onChange={this.handleChange} defaultValue={users.item.password}/>
                    <p className="text-muted">Update your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input name="username" type="text" placeholder="Username" autoComplete="username" onChange={this.handleChange} defaultValue={users.item.username}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input name="email" type="text" placeholder="Email" autoComplete="email" onChange={this.handleChange} defaultValue={users.item.email}/>
                    </InputGroup>
                    <Button color="success">Update Account</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
      </div>
    );}else{
      return <></>;
    }
  }
}

function mapState(state) {
  const { user, users } = state;
  return { user, users };
}

const mapDispatchToProps = {
  usergetById: userActions.getById,
  userUpdate: userActions.updateUser
}


export default connect(mapState, mapDispatchToProps)(UserEdit);
