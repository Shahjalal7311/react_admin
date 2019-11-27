import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import { userActions } from '../../_actions'; 

class Users extends Component {

  componentDidMount() {
      this.props.getUsers();
  }
  handleDeleteUser(id) {
      return (e) => this.props.deleteUser(id);
  }
  
  render() {
    const { users } = this.props;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Users <small className="text-muted">List</small>
                <Link to="/user-add">
                  <i className="fa fa-plus pull-right"> <small className="text-muted">Add</small></i>
                </Link>
              </CardHeader>
              <CardBody>
                {users.loading && <em>Loading Users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">name</th>
                      <th scope="col">User Name</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                    {users.items &&
                    <tbody>
                        {users.items.map((user, index) =>
                        // const link = '/user/'user.id;
                          <tr key={user._id.toString()}>
                            <th scope="row">{user._id}</th>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                              Active
                            </td>
                            <td>
                              <Link href="#" to={`users-edit/${user._id}/`}><i className="cui-pencil icons"></i></Link>
                              <a onClick={this.handleDeleteUser(user._id)} style={{ cursor: 'pointer', color:'#20a8d8' }}>
                                <i className="cui-trash icons"></i>
                              </a>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    }  
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

function mapState(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return { user, users };
}

const mapDispatchToProps = {
  getUsers: userActions.getAll,
  deleteUser: userActions.delete
}

export default connect(mapState, mapDispatchToProps)(Users);
