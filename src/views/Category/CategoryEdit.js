import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import $ from 'min-jquery';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, 
  InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Editor } from '@tinymce/tinymce-react';

import { categoryActions } from '../../_actions'; 
import "./Category.css";

/**
* @author
* @class CategoryAdd
**/
class CategoryEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: {
        title: '',
        slug: '',
        order: ''
      },
      content: '',
      submitted: false,
      selectedPage: 1
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  componentDidMount(){
    const id = this.props.history.location.pathname.split('/')[3];
    this.setState({ submitted: true });
    const { category, content } = this.state;
    this.props.categorygetById(id);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { category, content } = this.state;
    this.setState({
      category: {
            ...category,
            [name]: value
        },
        description: '',
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, value } = event.target;
    const { category, description } = this.state;
    const updateItem = {
      _id: event.target._id['value'],
      title: event.target.title['value'],
      slug: event.target.slug['value'],
      description: description,
      order: event.target.order['value'],
    }
    // return false;
    this.props.categoryupdate(updateItem);
  }
  
  handleEditorChange(description, editor) {
    this.setState({ description });
  }

 render() {
  const { categorys  } = this.props;
  const { submitted } = this.state;
  return (
    <div className="animated fadeIn">
      {categorys.item &&
      <Row>
        <Col xl={12}>
          <Card>
            <CardBody>
              <Form name="form" onSubmit={this.handleSubmit}>
                <p className="text-muted">Add Category</p>
                <Input name="_id" type="hidden" onChange={this.handleChange} defaultValue={ categorys.item._id }/>
                <InputGroup className="mb-3">
                  <Input name="title" type="text" placeholder="Title" autoComplete="title" defaultValue={ categorys.item.title } onChange={this.handleChange}/>
                </InputGroup>
                <InputGroup className="mb-3">
                  <Input name="slug" type="text" placeholder="slug" autoComplete="Slug" defaultValue={ categorys.item.slug } onChange={this.handleChange}/>
                </InputGroup>
                <InputGroup className="mb-3">
                <Editor
                  initialValue=''
                  init={{
                    height: 250,
                    menubar: true,
                    plugins: [
                      'advlist autolink lists link image charmap print preview anchor',
                      'searchreplace visualblocks code fullscreen',
                      'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | help'
                  }}
                  value={ categorys.item.description }
                  defaultValue={ categorys.item.description }
                  onEditorChange={this.handleEditorChange}
                />
                  {/* <Input name="description" type="text" placeholder="description" autoComplete="description" onChange={this.handleChange}/> */}
                </InputGroup>
                <InputGroup className="mb-3">
                  <Input name="order" type="text" placeholder="order" autoComplete="order" defaultValue={ categorys.item.order } onChange={this.handleChange}/>
                </InputGroup>
                <Button color="success">Submit</Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    }
    </div>
   )
  }
 }

 function mapState(state) {
  const { categorys, category } = state;
  return { categorys, category };
}

const mapDispatchToProps = {
  categorygetById: categoryActions.getById,
  categoryupdate: categoryActions.update
}

export default connect(mapState, mapDispatchToProps)(CategoryEdit)