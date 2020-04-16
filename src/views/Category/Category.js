import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PaginationComponent from "react-reactstrap-pagination";
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import { baseSettings } from '../../_services/config/base.setting';
import { categoryActions } from '../../_actions';

/**
* @author
* @class Category
**/
class Categorys extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPage: 1
    }
    this.handleSelected = this.handleSelected.bind(this);
  }
  componentDidMount(selectedPage) {
    this.props.getCategorys(this.state.selectedPage);
    this.props.getCategorysTotal();
  }

  handleSelected(selectedPage) {
    this.props.getCategorys(selectedPage);
    this.props.getCategorysTotal();
    this.setState({ selectedPage: selectedPage });
  }

  handleDeleteUser(id) {
    return (e) => this.props.deleteArtical(id);
  }

 render() {
  const { categorys } = this.props;
  const tottalItem = categorys && categorys.totalItems;
  console.log(tottalItem,'tottalItem');
  let pageSize = baseSettings().pazeSize;
  return (
    <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Category <small className="text-muted">List</small>
                <Link to="/category-add">
                  <i className="fa fa-plus pull-right"> <small className="text-muted">Add</small></i>
                </Link>
              </CardHeader>
              <CardBody>
              {/* {categorys.error && <span className="text-danger">ERROR: {categorys.error}</span>} */}
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
                  {categorys.items && 
                  <tbody>
                    {categorys.items['categorys'].map((category, index) =>
                    <tr key={category._id}>
                      <td scope="row">{category._id}</td>
                      <td>{category.title}</td>
                      <td>{category.slug}</td>
                      <td>{category.order}</td>
                      <td>
                        
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

 function mapState(state){
  const { categorys } = state;
  return { categorys };
}

const mapDispatchToProps = {
  getCategorys: categoryActions.getAll,
  getCategorysTotal: categoryActions.getTotal,
  deleteCategory: categoryActions.delete
}
export default connect(mapState, mapDispatchToProps)(Categorys)