import React, { Component } from 'react';
import AppNavbar from './AppNavbar';
import {Container,Button} from 'reactstrap';
import {Link} from 'react-router-dom';

export default class Home extends Component {
    render() {
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <Button color="link">
                        <Link to="/groups">Tours</Link>
                    </Button>
                </Container>
            </div>
        )
    }
}
