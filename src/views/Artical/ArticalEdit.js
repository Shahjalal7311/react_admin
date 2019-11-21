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
        artical: {},
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

      this.setState({ submitted: true });
      const { artical } = this.state;
      console.log(artical);
      // this.props.articalgetById(artical);
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
                      <p className="text-muted">Add Edit</p>
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
  return { articals };
}

const mapDispatchToProps = {
  articalgetById: articalActions.getById
}


export default connect(mapState, mapDispatchToProps)(ArticalEdit);
