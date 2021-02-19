import 'antd/dist/antd.css';

import React from "react";
import AuthService from "../services/auth.service";
import {Card,CardGroup,ListGroup,CardDeck} from 'react-bootstrap';
import {Redirect,useHistory,Link} from "react-router-dom";
import {Form, Input,Button} from 'antd';

import GymService from "../services/gyms.service";

const currentUser = AuthService.getCurrentUser();

const {ButtonBoot} = Button;

class TrainerGyms extends React.Component
{
    
    formRef = React.createRef();

    state = {
        gyms: [],
        user: { username: "", id: ""},

        value:'',
        trainerid: '',
    }
    
    onFinish = () => {

        const value = {
            name : this.state.value,
            trainerid : this.state.trainerid
        }
        
        GymService.addGym(value.name,value.trainerid).then((response) => {
            console.log(response.data)
        }).catch((error) => {console.log(error)});
    };
    componentDidMount()
    {

        if (!currentUser) this.setState({ redirect: "/home" });
        this.setState({ user: currentUser})

        this.setState({
            user: AuthService.getCurrentUser()
        });

        this.setState({
            trainerid: currentUser.id
        })

        console.log(currentUser.username);

        GymService.getAllgymsOfTrainer(currentUser.username).then(
            response => {
                this.setState({
                    gyms : response.data
                })
        })
    }
    onRedirecttoGym(id)
    {
        localStorage.setItem("gym_id" , id);
    }
    updateGyms()
    {
        GymService.getAllgymsOfTrainer(currentUser.username).then(
            response => {
                this.setState({
                    gyms : response.data
                })
        })
    }
    onReset = () => {
        this.formRef.current.resetFields();
    }
    onNameChange = ({target : {value}}) => {
        this.setState({value})
    };

    deleteGym(name)
    {
        if(window.confirm('Are you sure you want to delete ?'))
        {  
            GymService.deleteGym(name);
            alert('Gym deleted');
        }

        this.loadData();
    }
    render(){

        const { user } = this.state;
        const {value} = this.state.value;
        return (
            <>
            <Card bg="secondary" text="light" style={{display:"flex", justifyContent:"center"}}>
                <Card.Header>
                    <span style={{fontWeight:"bold"}}>{user.username}</span>'s gyms 
                    <Card style={{minWidth:"200px",width:'60%'}} bg="" text="dark">
                    <Card.Header>
                        Add a new gym
                    </Card.Header>   
                    <Card.Body>
                        <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
                        <Form.Item name="name" label="Gym Name"
                                    rules={[{required: true}]}>
                            <Input
                                value={value}
                                onChange={this.onNameChange}
                                placeholder="Insert Gym name to add"
                                showCount
                                />                          
                                </Form.Item>
                                <Form.Item >
                                    <Button style={{width:"200px"}}  type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                    <Button htmlType="button" onClick={this.onReset}>
                                        Reset
                                    </Button>
                                </Form.Item>
                        </Form>
                    </Card.Body> 
                </Card>  
                
                
                </Card.Header>

                <Card.Body style={{display: "flex", justifyContent: "center"}}>

                {this.state.gyms && 
                <CardDeck>
                    {this.state.gyms.map(({id,name,trainerid,userids,videoids})=>(
                        <Card key={id} bg="dark" border="light" text="light" style={{minWidth:"400px", maxWidth:"600px"}}>
                            <Card.Header>Gym : {name}</Card.Header>
                            <Card.Body>
                                <ListGroup>
                                    <ListGroup.Item variant="primary">Id : {id}</ListGroup.Item>
                                    <ListGroup.Item variant="primary">Trainer id : {trainerid}</ListGroup.Item>
                                    <ListGroup.Item variant="primary">N° Users : {userids.length}</ListGroup.Item>
                                    <ListGroup.Item variant="primary">N° Videos: {videoids.length}</ListGroup.Item >
                                    <ListGroup.Item variant="primary">
                                        <Link className="btn btn-primary" to ={{
                                            pathname: "/gym",
                                            state: { currentPageId: id }
                                                }}>
                                           Show details 
                                        </Link>
                                    </ListGroup.Item>
                                    <ListGroup.Item variant="primary">
                                        <Link className="btn btn-danger" onClick={() => {this.deleteGym(name)}}>Delete</Link>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    ))}
                </CardDeck>}
                </Card.Body>
            </Card>
            </>
        );
    }
}


export default TrainerGyms;