import React, { Component } from "react";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Table, Button,Tabs,Tab,Card,Alert } from 'react-bootstrap';
import UserService from "../services/user.service";
import GymService from "../services/gyms.service";

export default class BoardAdmin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors:'',
            users: [],
            gyms : [],
        };
    }
    componentDidMount()
    {
        this.loadData();
    }

    render() {
        return (
        <>
        {this.state.errors&&
            <Alert variant="danger">{this.state.errors}</Alert>}
        <Card bg="secondary" text="light">
            <Card.Header>
                Admin Dashboard
                <Button onClick={() => {this.onButtonRefrechData()}} style={{marginLeft:"70%"}} variant="info">Refresh Data</Button>
            </Card.Header>
            <Card.Body>
                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                    <Tab eventKey="users" title="Users">
                        <br/>
                        <br/>
                        {this.renderUsersTable()}
                    </Tab>
                    <Tab eventKey="gyms" title="Gyms">
                        <br/>
                        <br/>
                        {this.renderGymsTable()}
                    </Tab>
                </Tabs>      
            </Card.Body>
        </Card>
        </>    
        );
    }


    renderUsersTable()
    {
        return(
            <Table responsive striped bordered hover variant="dark">
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
                        <tr key={id}>
                            <td>{id}</td>
                            <td >{username}</td>
                            <td >{email}</td>
                            <td>
                                {roles.map(({id,role}) => (role))}
                            </td>
                            <td><Button onClick={() => {this.deleteUser(id)}} variant="danger">Delete</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    }
    renderGymsTable()
    {
        return(
            <Table responsive striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>name</th>
                        <th>trainerid</th>
                        <th>N° Users</th>
                        <th>N° Videos</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.gyms.map(({ id, name, trainerid, userids,videoids}) => (   
                        <tr key={id}>
                            <td>{id}</td>
                            <td>{name}</td>
                            <td>{trainerid}</td>
                            <td>{userids.length}</td>
                            <td>{videoids.length}</td>
                            <td><Button variant="info">Show details</Button></td>
                            <td><Button onClick={() => {this.deleteGym(name)}} variant="danger">Delete</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    }
    deleteGym(name)
    {
        if(window.confirm('Are you sure you want to delete ?'))
        {  
            GymService.deleteGym(name);
            alert('Gym deleted');
        }

        this.loadData();
    }
    
    deleteUser(id)
    {
        if(window.confirm('Are you sure you want to delete ?'))
        {  
            UserService.deleteUser(id);
            alert('User deleted');
        }

        this.loadData();
    }
    loadData()
    {
        UserService.getAllUsers().then(
            response => {
                this.setState({
                    users: response.data
                });
            },
            error => {
                this.setState({
                    errors:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            }
        );

        GymService.getAllgyms().then(
            response => {
                this.setState({
                    gyms: response.data
                });
            },
            error => {
                this.setState({
                    errors:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }
    onButtonRefrechData()
    {
        this.loadData();
    }
}