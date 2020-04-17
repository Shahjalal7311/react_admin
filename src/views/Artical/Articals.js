import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PaginationComponent from "react-reactstrap-pagination";
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import { baseSettings } from '../../_services/config/base.setting';

import{ imagePathService } from '../../_services/config/image.path.service'
import { articalActions } from '../../_actions'; 

class Articals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPage: 1
    }
    this.handleSelected = this.handleSelected.bind(this);
  }
  componentDidMount(selectedPage) {
    this.props.getArticals(this.state.selectedPage);
    this.props.getArticalsTotal();
  }

  handleSelected(selectedPage) {
    this.props.getArticals(selectedPage);
    this.props.getArticalsTotal();
    this.setState({ selectedPage: selectedPage });
  }

  handleDeleteArtical(id) {
    console.log(id,'deleteArticaldeleteArticaldeleteArtical');
    return (e) => this.props.deleteArtical(id);
  }

  firstImage(images){
    const imgPath = imagePathService();
    if(images[0]){
      return imgPath+'/uploads/'+images[0][0];
    }else{
      return imgPath+'/admin/assets/img/avatars/1.jpg';
    }
  }
  
  render() {
    const { articals } = this.props;
    const tottalItem = articals && articals.totalItems;
    let pageSize = baseSettings().pazeSize;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Artical <small className="text-muted">List</small>
                <Link to="/admin/atical-add">
                  <i className="fa fa-plus pull-right"> <small className="text-muted">Add</small></i>
                </Link>
              </CardHeader>
              <CardBody>
                {articals.error && <span className="text-danger">ERROR: {articals.error}</span>}
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">ID#</th>
                      <th scope="col">Image</th>
                      <th scope="col">Title</th>
                      <th scope="col">Slug</th>
                      <th scope="col">Order</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  {articals.items && articals.items['articals'] &&
                  
                    <tbody>
                        {articals.items['articals'].map((artical, index) =>
                          <tr key={artical._id}>
                            <th scope="row">{artical._id}</th>
                            <td><img if={artical.images} height="50" width="50" src={`${this.firstImage(artical.images)}`} /> </td>
                            <td>{artical.title}</td>
                            <td>{artical.slug}</td>
                            <td>{artical.order}</td>
                            <td>
                              <Link href="#" to={`/admin/artical-edit/${artical._id}/`}><i className="cui-pencil icons"></i></Link>
                              <a onClick={this.handleDeleteArtical(artical._id)} style={{ cursor: 'pointer', color:'#20a8d8' }}>
                                <i className="cui-trash icons"></i>
                              </a>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    }  
                </Table>
                {tottalItem && <PaginationComponent
                  totalItems={tottalItem}
                  pageSize={pageSize}
                  onSelect={this.handleSelected}
                  maxPaginationNumbers={9}
                  defaultActivePage={this.selectedPage}
                />}
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
  getArticalsTotal: articalActions.getTotal,
  deleteArtical: articalActions.delete
}

export default connect(mapState, mapDispatchToProps)(Articals);
