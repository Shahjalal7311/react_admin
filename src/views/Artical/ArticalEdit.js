import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

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
          description: '',
          metaTitle: '',
          metaKeyword: '',
          metaDescription: '',
        },
        submitted: false
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    const id = this.props.history.location.pathname.split('/')[2];
    this.setState({ submitted: true });
    const { artical } = this.state;
    this.props.articalgetById(id);
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
    const { name, value } = event.target;
    const updateItem = {
      _id: event.target._id['value'],
      title: event.target.title['value'],
      slug: event.target.slug['value'],
      description: event.target.description['value'],
      metaTitle: event.target.metaTitle['value'],
      metaKeyword: event.target.metaKeyword['value'],
      metaDescription: event.target.metaDescription['value'],
      order: event.target.order['value'],
    }
    this.props.articalupdate(updateItem);
  }
  render() {
    const { articals  } = this.props;
    const { submitted } = this.state;

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
                      {articals.loading && <em>Loading artical...</em>}
                      <InputGroup className="mb-3">
                        <Input name="title" type="text" placeholder="Title" autoComplete="title" onChange={this.handleChange} defaultValue={articals.item.title}/>
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <Input name="slug" type="text" placeholder="slug" autoComplete="Slug" onChange={this.handleChange} defaultValue={articals.item.slug}/>
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <Input name="description" type="text" placeholder="description" autoComplete="description" onChange={this.handleChange} defaultValue={articals.item.description}/>
                      </InputGroup>
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
