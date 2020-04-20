import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import $ from 'min-jquery';
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { Editor } from '@tinymce/tinymce-react';

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
          file_name: [],
          metaTitle: '',
          metaKeyword: '',
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
    const { artical, description } = this.state;
    const { name, value } = event.target;
    var igmgg = event.target.file_name;
    // console.log(igmgg,'igmggigmgg');
    if(igmgg.length > 1){
      var igmgg = event.target.file_name;
      var new_array = [];
      for(let i=0; i<igmgg.length;i++){
        new_array.push(igmgg[i]['defaultValue']);
        // console.log(igmgg[i]['defaultValue'],'defaultValuedefaultValue');
      }
    }else{
      var new_array = [];
      new_array.push(event.target.file_name['value']);
    }
    // console.log(new_array,'new_arraynew_array');
    const addItem = {
      title: event.target.title['value'],
      slug: event.target.slug['value'],
      images: new_array,
      description: description,
      metaTitle: event.target.metaTitle['value'],
      metaKeyword: event.target.metaKeyword['value'],
      metaDescription: event.target.metaDescription['value'],
      order: event.target.order['value'],
    }
    // return false;
    this.props.articalCreate(addItem);
  }

  handleEditorChange(description, editor) {
    this.setState({ description });
  }


  render() {
    const { artical  } = this.props;
    const { submitted } = this.state;
    const getUploadParams = ({ file, meta }) => {
      const form = new FormData()
      $('.image_append').append('<input type="hidden" type="text" name="file_name" value="' + file.name + '">')
      return { url: 'http://localhost:4000/api/fileupload', form }
    }
    const handleChangeStatus = ({ file, meta }, status) => { 
      // console.log(meta, meta)
    }
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
                    <Dropzone getUploadParams={getUploadParams}
                      onChangeStatus={handleChangeStatus}
                      accept="image/*,audio/*,video/*"
                    />
                    </InputGroup>
                    <div className="image_append"></div>
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
