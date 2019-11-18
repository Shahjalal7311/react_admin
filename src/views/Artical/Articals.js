import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import{ baseService } from '../../_services/config/base.service'
import { articalActions } from '../../_actions'; 

class Articals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articals: []
    };
  }
  componentDidMount() {
    this.props.getArticals();
    const url = baseService() + '/articalsget';
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.setState({
          articals: response.articals,
        })
      })
      .catch((error) => {
        this.setState({
          error: true
        })
      });
  }
  
  render() {
    const { articals } = this.state;
    const currentarticals = articals;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Artical <small className="text-muted">List</small>
                <Link to="">
                  <i className="fa fa-plus pull-right"> <small className="text-muted">Add</small></i>
                </Link>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">ID#</th>
                      <th scope="col">Title</th>
                      <th scope="col">Slug</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  {currentarticals &&
                    <tbody>
                        {currentarticals.map((artical, index) =>
                        // const link = '/user/'user.id;
                          <tr key={artical._id}>
                            <th scope="row">{artical._id}</th>
                            <td>{artical.title}</td>
                            <td>{artical.slug}</td>
                            <td><Link to="">Edit</Link></td>
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
  getArticals: articalActions.getAll
}

export default connect(mapState, mapDispatchToProps)(Articals);
