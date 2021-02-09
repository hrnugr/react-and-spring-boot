import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table, Spinner, Row, Col} from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import axios from 'axios';

class GroupList extends Component {

  constructor(props) {
    super(props);
    this.state = {groups: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }


  async componentDidMount() {
    this.setState({isLoading: true});

    await axios.get("/api/groups").then(res => {
      console.log(res.data);
      this.setState({groups: res.data,isLoading: false});
    }).catch(error => {
      console.log(error);
    });
  }

  async remove(id, e){
    await axios.delete(`/api/group/${id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
  
        const updatedGroups = this.state.groups.filter(item => item.id !== id);
        this.setState({groups: updatedGroups});
      }).catch(error => {
        console.log(error);
      });
  }

  render() {
    const {groups, isLoading} = this.state;

    if (isLoading) {
      return (
        <Container>
          <Row>
            <Col xs="auto">
                <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" color="primary" />
            </Col>
          </Row>
        </Container>
      );
    }

    const groupList = groups.map(group => {
        const address = `${group.address || ''} ${group.city || ''} ${group.stateOrProvince || ''}`;
        return (
            <tr key={group.id}>
              <td style={{whiteSpace: 'nowrap'}}>{group.name}</td>
              <td>{address}</td>
              <td>{group.events.map(event => {
                return <div key={event.id}>{new Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: '2-digit'
                }).format(new Date(event.date))}: {event.title}</div>
              })}</td>
              <td>
                <ButtonGroup>
                  <Button size="sm" color="primary" tag={Link} to={"/groups/" + group.id}>Edit</Button>
                  <Button size="sm" color="danger" onClick={(e) => this.remove(group.id,e)}>Delete</Button>
                </ButtonGroup>
              </td>
            </tr>
          )
      });
      return (
        <div>
          <AppNavbar/>
          <Container fluid>
            <div className="float-right">
              <Button color="success" tag={Link} to="/groups/new">Add New Group</Button>
            </div>
            <h3>Tours</h3>
            <Table className="mt-4">
              <thead>
              <tr>
                <th width="20%">Name</th>
                <th width="20%">Location</th>
                <th>Events</th>
                <th width="10%">Actions</th>
              </tr>
              </thead>
              <tbody>
              {groupList}
              </tbody>
            </Table>
            </Container>
      </div>
    );
  }
}

export default GroupList;  
