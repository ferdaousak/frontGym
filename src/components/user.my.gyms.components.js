import React, { Component } from "react";

import GymService from "../services/gyms.service";

import {CardDeck,Card,ListGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Button} from "antd";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

const currentUser = AuthService.getCurrentUser();
class MyGyms extends React.Component {

    state = {
        gyms: [],
    }

    componentDidMount()
    {   
        if (!currentUser) this.setState({ redirect: "/home" });

        console.log("user :" + currentUser)
        GymService.getAllgymsOfUser(currentUser.username).then(response =>{
            this.setState({
                gyms: response.data
            })
        })
    }

    deleteUserFromGym(gymid,username)
    {
        if(window.confirm('Are you sure you want to quit this gym ?'))
        {  
            GymService.removeUserfromGym(gymid,username);
            alert('you quit from the gym succeessfully');
        }
    }
    render()
    {
        return (
            <Card bg="secondary" text="light">
                <Card.Header>
                    <h1 style={{color:"white"}}>My Gyms</h1>
                </Card.Header>

                <Card.Body style={{display: "flex", justifyContent: "center"}}>
                {this.state.gyms && 
                <CardDeck>
                    {this.state.gyms.map(({id,name,trainerid,userids,videoids})=>(
                        <Card key={id} bg="dark" border="light" text="light" style={{minWidth:"200px", maxWidth:"300px"}}>
                            <Card.Header>Gym : {name}</Card.Header>
                            <Card.Body>
                                <ListGroup>
                                    <ListGroup.Item variant="primary">Trainer id : {trainerid}</ListGroup.Item>
                                    <ListGroup.Item variant="primary">N° Users : {userids.length}</ListGroup.Item>
                                    <ListGroup.Item variant="primary">N° Videos: {videoids.length}</ListGroup.Item >
                                    <ListGroup.Item variant="primary">
                                        <Link className="btn btn-primary" 
                                        to ={   {
                                                    pathname: "/gym",
                                                    state: { currentPageId: id }
                                            }}  
                                                >
                                           Show details
                                        </Link>
                                        <Button onClick={() => {this.deleteUserFromGym(id,currentUser.username)}} type="danger">
                                            Exit from Gym
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    ))}
                </CardDeck>}
                </Card.Body>
            </Card>
        );
    }
}

export default MyGyms;