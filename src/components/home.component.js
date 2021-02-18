import React, { Component } from "react";

import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import {Card,Button}from 'react-bootstrap';
import { Typography } from 'antd';

const { Title } = Typography;


export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
            user : '',
        };
    }

    componentDidMount()
    {
        this.setState({user : AuthService.getCurrentUser()});

        UserService.getPublicContent().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    render() {
        return (
            <Card bg="dark" text="light" border="secondary">
            <Card.Header>
            <Title>Welcome {this.state.user.username} to GymWithMe</Title>
            </Card.Header>
                <Card.Body>
                    <Card.Title>The first online gym</Card.Title>
                    <Card.Text>
                        where you can train and get in shape from your home
                    </Card.Text>
                    <Button variant="primary">Join a gym</Button>
                </Card.Body>
            </Card>
        );
    }
}