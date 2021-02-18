import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
import {Card,Form,Button,Alert} from "react-bootstrap";


export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            userReady: false,
            currentUser: { username: "" },
            role:""
        };
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) this.setState({ redirect: "/home" });
        this.setState({ currentUser: currentUser, userReady: true })

        currentUser.roles.map((role, index) => this.setState({role:role}));
    }

    onReset = () => {
        this.formRef.current.resetFields();
    }

    onFinish = (values) => {
        console.log(values);
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        const { currentUser } = this.state;

        return (
            <>
            <Card bg="light" text="dark">
                <Card.Header>
                    {currentUser.username}'s Profile
                </Card.Header>
                <Card.Body>
                <div className="container">
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={currentUser.email} />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={currentUser.username} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Update
                    </Button>
                </Form>
                {(this.state.role == "ROLE_ADMIN") && 
                <>
                    <Alert variant="warning">Admin infos</Alert>
                    {(this.state.userReady) ?
                        <div>
                            <p>
                                <strong>Token:</strong>{" "}
                                {currentUser.accessToken.substring(0, 20)} ...{" "}
                                {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                            </p>
                            <p>
                                <strong>Id:</strong>{" "}
                                {currentUser.id}
                            </p>
                            <p>
                                <strong>Email:</strong>{" "}
                                {currentUser.email}
                            </p>
                            <strong>Authorities:</strong>
                            <ul>
                                {this.state.role}
                            </ul>
                        </div> : null}   
                   </>
                }
                 </div>
                </Card.Body>
            </Card>
        </>
        );
    }
}