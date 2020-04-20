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

class ArticalEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artical: {
        title: '',
        slug: '',
        file_name: [],
        metaTitle: '',
        metaKeyword: '',
        metaDescription: '',
      },
      description: '',
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
    const { artical, description } = this.state;
    this.props.articalgetById(id);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { artical, description } = this.state;
    this.setState({
        artical: {
            ...artical,
            [name]: value
        },
        description: ''
    });
  }

  handleSubmit(event, files, allFiles) {
    event.preventDefault();
    const { name, value } = event.target;
    const { description } = this.state;
    var igmgg = event.target.file_name;
    const updateItem = {
      _id: event.target._id['value'],
      title: event.target.title['value'],
      slug: event.target.slug['value'],
      description: description,
      metaTitle: event.target.metaTitle['value'],
      metaKeyword: event.target.metaKeyword['value'],
      metaDescription: event.target.metaDescription['value'],
      order: event.target.order['value'],
    }
    
    // console.log(igmgg,'igmggigmgg');
    if(igmgg){
      if(igmgg.length > 1){
        var igmgg = event.target.file_name;
        var new_array = [];
        for(let i=0; i<igmgg.length;i++){
          new_array.push(igmgg[i]['defaultValue']);
        }
        const updateItem = {
          images: new_array,
        }
      }else{
        var new_array = [];
        new_array.push(event.target.file_name['value']);
        const updateItem = {
          images: new_array,
        }
      }
    }
    
    // return false;
    this.props.articalupdate(updateItem);
  }

  handleEditorChange(description, editor) {
    this.setState({ description });
  }

  render() {
    const { articals  } = this.props;
    const { submitted } = this.state;

    const getUploadParams = ({ file, meta }) => {
      const form = new FormData()
      $('.image_append').append('<input type="hidden" type="text" name="file_name" value="' + file.name + '">')
      return { url: 'http://localhost:4000/api/fileupload', form }
    }
    const handleChangeStatus = ({ file, meta }, status) => { 
      // console.log(meta, meta)
    }
    // const handleSubmit = (files, files) => {
    //   console.log(files.map(f => f.meta))
    //   allFiles.forEach(f => f.remove())
    // }

    if(articals.item){
      return (
        <div className="animated fadeIn">
            <Row>
              <Col xl={12}>
                <Card>
                  <CardBody>
                    <Form name="form" onSubmit={this.handleSubmit}>
                    <Input name="_id" type="hidden" onChange={this.handleChange} defaultValue={articals.item._id}/>
                      <p className="text-muted">Edit Artical</p>
                      {/* {articals.loading && <em>Loading artical...</em>} */}
                      <InputGroup className="mb-3">
                        <Input name="title" type="text" placeholder="Title" autoComplete="title" onChange={this.handleChange} defaultValue={articals.item.title}/>
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <Input name="slug" type="text" placeholder="slug" autoComplete="Slug" onChange={this.handleChange} defaultValue={articals.item.slug}/>
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
                        value={ articals.item.description }
                        onEditorChange={this.handleEditorChange}
                      />
                        {/* <Input name="description" type="text" placeholder="description" autoComplete="description" onChange={this.handleChange} defaultValue={articals.item.description}/> */}
                      </InputGroup>
                      <InputGroup className="mb-3">
                      <Dropzone getUploadParams={getUploadParams}
                        onChangeStatus={handleChangeStatus}
                        accept="image/*,audio/*,video/*"
                      />
                      </InputGroup>
                      <div className="image_append"></div>
                      <InputGroup className="mb-3">
                        <Input name="metaTitle" type="text" placeholder="metaTitle" autoComplete="metaTitle" onChange={this.handleChange} defaultValue={articals.item.metaTitle}/>
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <Input name="metaKeyword" type="text" placeholder="metaKeyword" autoComplete="metaKeyword" onChange={this.handleChange} defaultValue={articals.item.metaKeyword} />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <Input name="metaDescription" type="text" placeholder="metaDescription" autoComplete="metaDescription" onChange={this.handleChange} defaultValue={articals.item.metaDescription}/>
                      </InputGroup>
                      <InputGroup className="mb-3">
                      <Input name="order" type="text" placeholder="order" autoComplete="order" onChange={this.handleChange} defaultValue={articals.item.order}/>
                    </InputGroup>
                      <Button color="success">update</Button>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
        </div>
      );
    }else{
      return <></>;
    }
  }
}

function mapState(state) {
  const { articals, artical } = state;
  return { articals, artical };
}

const mapDispatchToProps = {
  articalgetById: articalActions.getById,
  articalupdate: articalActions.update
}


export default connect(mapState, mapDispatchToProps)(ArticalEdit);
