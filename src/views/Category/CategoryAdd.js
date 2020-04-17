import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import $ from 'min-jquery';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, 
  InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Editor } from '@tinymce/tinymce-react';

import { categoryActions } from '../../_actions'; 
import "./Category.css";

class CategoryAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: {
        title: '',
        slug: '',
        order: '',
      },
      description: '',
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  handleChange(event) {
      const { name, value } = event.target;
      const { category } = this.state;
      this.setState({
        category: {
              ...category,
              [name]: value
          }
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ submitted: true });
    const { category, description } = this.state;
    const { name, value } = event.target;
    const addItem = {
      title: event.target.title['value'],
      slug: event.target.slug['value'],
      description: description,
      order: event.target.order['value'],
    }
    this.props.categoryCreate(addItem);
  }
  handleEditorChange(description, editor) {
    this.setState({ description });
  }
  render() {
    const { category  } = this.props;
    const { submitted } = this.state;
    return (
      <div className="animated fadeIn">
          <Row>
            <Col xl={12}>
              <Card>
                <CardBody>
                  <Form name="form" onSubmit={this.handleSubmit}>
                    <p className="text-muted">Add Category</p>
                    <InputGroup className="mb-3">
                      <Input name="title" type="text" placeholder="Title" autoComplete="title" onChange={this.handleChange}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <Input name="slug" type="text" placeholder="slug" autoComplete="Slug" onChange={this.handleChange}/>
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
                      value={this.state.description}
                      onEditorChange={this.handleEditorChange}
                    />
                      {/* <Input name="description" type="text" placeholder="description" autoComplete="description" onChange={this.handleChange}/> */}
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <Input name="order" type="text" placeholder="order" autoComplete="order" onChange={this.handleChange}/>
                    </InputGroup>
                    <Button color="success">Submit</Button>
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
  const { category } = state;
  return { category };
}

const mapDispatchToProps = {
  categoryCreate: categoryActions.create
}


export default connect(mapState, mapDispatchToProps)(CategoryAdd);
