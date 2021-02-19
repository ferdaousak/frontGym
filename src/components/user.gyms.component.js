import React, { Component } from "react";

import GymService from "../services/gyms.service";

import {CardDeck,Card,ListGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";


const currentUser = AuthService.getCurrentUser();
class AllGyms extends Component {
    
    state = {
        gyms: [],
        trainers : []
    }


    componentDidMount()
    {
        if (!currentUser) this.setState({ redirect: "/home" });


        console.log("user :" + currentUser)
        GymService.getAllgyms().then(response =>{
            this.setState({
                gyms: response.data
            })
        })
    }


    joinThisGym(gymid,username)
    {
        GymService.addUserToGym(gymid, username).then(response =>{
            console.log(response.data)
        })
    }
    render() {
        return(
            <Card bg="secondary" text="light">
                <Card.Header>
                    <h1>All Gyms : </h1>
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
                                        onClick={()=>this.joinThisGym(id,currentUser.username)}
                                                
                                                >
                                           Join
                                        </Link>
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

export default AllGyms;