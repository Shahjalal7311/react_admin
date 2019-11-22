import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import{ baseService } from '../../_services/config/base.service'
import { articalActions } from '../../_actions'; 

class Articals extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getArticals();
  }

  handleDeleteUser(id) {
    return (e) => this.props.deleteArtical(id);
  }
  
  render() {
    const { articals } = this.props;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Artical <small className="text-muted">List</small>
                <Link to="/atical-add">
                  <i className="fa fa-plus pull-right"> <small className="text-muted">Add</small></i>
                </Link>
              </CardHeader>
              <CardBody>
                {articals.loading && <em>Loading articals...</em>}
                {articals.error && <span className="text-danger">ERROR: {articals.error}</span>}
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">ID#</th>
                      <th scope="col">Title</th>
                      <th scope="col">Slug</th>
                      <th scope="col">Order</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  {articals.items &&
                    <tbody>
                        {articals.items.map((artical, index) =>
                          // const editLink = '/artical-edit/'+ artical.id;
                          <tr key={artical._id}>
                            <th scope="row">{artical._id}</th>
                            <td>{artical.title}</td>
                            <td>{artical.slug}</td>
                            <td>{artical.order}</td>
                            <td>
                              <Link href="#" to={`artical-edit/${artical._id}/`}><i className="cui-pencil icons"></i></Link>
                              <a onClick={this.handleDeleteUser(artical._id)} style={{ cursor: 'pointer', color:'#20a8d8' }}>
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
  const { articals } = state;
  return { articals };
}

const mapDispatchToProps = {
  getArticals: articalActions.getAll,
  deleteArtical: articalActions.delete
}

export default connect(mapState, mapDispatchToProps)(Articals);
