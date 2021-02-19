import React, { Component } from "react";
import logo from "../images/logo.PNG";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import {Card,Button,Image}from 'react-bootstrap';
import { Typography } from 'antd';
import {Link} from "react-router-dom";

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
            <Title style={{color:"white"}}>Welcome {this.state.user.username} to GymWithMe</Title>
            </Card.Header>
                <Card.Body>
                    <Card.Title>The first online gym</Card.Title>
                    <Card.Text>
                        where you can train and get in shape from your home
                    </Card.Text>
                    <Link className="btn btn-primary" style={{width:"200px"}}
                    to ={{pathname: "/allgyms"}}>
                            Start training
                    </Link>

                    <Image src={logo} roundedCircle  fluid style={{marginTop:"-15%",marginLeft:"30%",width:"30%", height:"10%",display:"inline"}}/>
                </Card.Body>
            </Card>
        );
    }
}