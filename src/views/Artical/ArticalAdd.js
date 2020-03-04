import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Dropzone from "../../dropzone/Dropzone";
import DropzoneComponent from 'react-dropzone-component';
import "./Artical.css";

import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, 
  InputGroupAddon, InputGroupText, Row } from 'reactstrap';

import { articalActions } from '../../_actions'; 

var componentConfig = { 
    postUrl: 'no-url',
    showFiletypeIcon: true,
  };
var djsConfig = {
  addRemoveLinks: true,
  fileName:false,
  acceptedFiles: "image/jpeg,image/png,image/gif",
  autoProcessQueue: true
};
var eventHandlers = { addedfile: (file) => console.log(file) }

class ArticalAdd extends Component {
  constructor(props) {
      super(props);

      this.state = {
        artical: {
          title: '',
          slug: '',
          description: '',
          files: [],
          metaTitle: '',
          metaKeyword: '',
          order: '',
        },
          submitted: false
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
      const { name, value } = event.target;
      const { artical } = this.state;
      this.setState({
          artical: {
              ...artical,
              [name]: value
          }
      });
  }

  handleSubmit(event) {
      event.preventDefault();

      this.setState({ submitted: true });
      const { artical } = this.state;
      this.props.articalCreate(artical);
  }
  render() {
    const { artical  } = this.props;
    const { submitted } = this.state;
    return (
      <div className="animated fadeIn">
          <Row>
            <Col xl={12}>
              <Card>
                <CardBody>
                  <Form name="form" onSubmit={this.handleSubmit}>
                    <p className="text-muted">Add Artical</p>
                    <InputGroup className="mb-3">
                      <Input name="title" type="text" placeholder="Title" autoComplete="title" onChange={this.handleChange}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <Input name="slug" type="text" placeholder="slug" autoComplete="Slug" onChange={this.handleChange}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <Input name="description" type="text" placeholder="description" autoComplete="description" onChange={this.handleChange}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                    <DropzoneComponent config={componentConfig}
                       eventHandlers={eventHandlers}
                       djsConfig={djsConfig} />
                      {/* <Dropzone onFilesAdded={console.log} /> */}
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <Input name="metaTitle" type="text" placeholder="metaTitle" autoComplete="metaTitle" onChange={this.handleChange}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <Input name="metaKeyword" type="text" placeholder="metaKeyword" autoComplete="metaKeyword" onChange={this.handleChange} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <Input name="metaDescription" type="text" placeholder="metaDescription" autoComplete="metaDescription" onChange={this.handleChange}/>
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
  const { artical } = state;
  return { artical };
}

const mapDispatchToProps = {
  articalCreate: articalActions.create
}


export default connect(mapState, mapDispatchToProps)(ArticalAdd);
