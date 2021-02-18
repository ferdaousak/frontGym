import React, { Component } from "react";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Table, Button } from 'react-bootstrap';


import UserService from "../services/user.service";

export default class BoardAdmin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        };
    }

    componentDidMount() {
        UserService.getAllUsers().then(
            response => {
                this.setState({
                    users: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    render() {
        return (
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Authority</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.users.map(({ id, username, email, roles }) => (
                        <tr>
                            <td></td>
                            <td key={id}>{username}</td>
                            <td key={id}>{email}</td>
                            <td>{roles.role}</td>
                            <td><Button variant="danger">Delete</Button></td>

                        </tr>

                    ))}
                </tbody>
            </Table>
        );
    }
}