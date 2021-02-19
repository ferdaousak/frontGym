import React from 'react';
import GymService from "../services/gyms.service";
import VideoService from "../services/video.service";
import {Form, Input,Button} from 'antd';
import 'antd/dist/antd.css';
import {Card,CardColumns,ListGroup,Tabs,Tab, ListGroupItem} from 'react-bootstrap';

class GymPage extends React.Component
{
    constructor(props)
    {
        super(props);
        
        this.state ={
            currentPageId:'',
            gym:'',
            users:[],
            videos:[],

            value:''
        }
    }
    componentDidMount()
    {
        const id = this.props.location.state.currentPageId;

        console.log("gym id passed is " + id);


        if(!id)
        {
            var recievedId = "602ef6d14ebfae17c288eb1e";
        }else
        {
            var recievedId = id;
        }

        if(recievedId)
        {
            this.setState({
                id: recievedId
            })
    
            GymService.getGymbyId(recievedId).then(response =>{
                this.setState({
                    gym: response.data
                })
            })

            GymService.getAllGymUsers(recievedId).then(response=>
            {
                this.setState({
                    users: response.data
                })
            })
            VideoService.getAllGymVideos(recievedId).then(response=>
            {
                this.setState({
                    videos: response.data
                })

            })
        }  
    }

    render(){
        return (
            <>
            <Card bg="dark" text="light">
                <Card.Header>
                    <h1 style={{color: 'white'}}>GYM : {this.state.gym.name}</h1>
                </Card.Header>
                <Card.Body>

                <Tabs defaultActiveKey="infos" id="uncontrolled-tab-example" variant="pills">
                    <Tab eventKey="infos" title="Gym Infos">
                        {this.renderInfosTab()}
                    </Tab>
                    <Tab eventKey="users" title="Users">
                        {this.renderUsersTab()}
                    </Tab>
                    <Tab eventKey="videos" title="Videos">
                        {this.renderVideosTab()}
                    </Tab>
                </Tabs>
                </Card.Body>
            </Card>
            </>
        );
    }


    renderInfosTab()
    {
        return (
           <> 
            {this.state.gym &&
                <Card text="dark">
                    <Card.Header>
                        Gym Infos : 
                    </Card.Header>
                    <Card.Body>
                    <ListGroup>
                            <ListGroup.Item variant="secondary">Id: : {this.state.gym.id}</ListGroup.Item>
                            <ListGroup.Item variant="secondary">Name : {this.state.gym.name}</ListGroup.Item>
                            <ListGroup.Item variant="secondary">TrainerId : {this.state.gym.trainerid}</ListGroup.Item>
                            <ListGroup.Item variant="secondary">N° Videos : {this.state.gym.videoids.length}</ListGroup.Item>
                            <ListGroup.Item variant="secondary">N° Users  :{this.state.gym.userids.length}</ListGroup.Item>
                    </ListGroup>
                    </Card.Body>
                </Card>
            }
            </>
        );
    }

    deleteUserFromGym(gymid,username)
    {
        if(window.confirm('Are you sure you want to delete ?'))
        {  
            GymService.removeUserfromGym(gymid,username);
            alert('User Removed from gym deleted');
        }
    }

    deleteVideoFromGym(gymid,title)
    {
        if(window.confirm('Are you sure you want to delete ?'))
        {  
            VideoService.deleteVideoFromGym(gymid,title);
            alert('video Removed from gym deleted');
        }
    }

    renderUsersTab()
    {
        return(
            <Card text="dark">
                        <Card.Header>
                            Gym users : 
                        </Card.Header>
                        <Card.Body>
                            
                            {this.state.users&& this.state.users.map(({username,email}) =>(
                                <ListGroup>
                                    <ListGroup.Item variant="secondary">Username : {username}</ListGroup.Item>
                                    <ListGroup.Item variant="secondary">Email : {email}</ListGroup.Item>
                                    <ListGroup.Item variant="secondary">
                                        <Button onClick={() => {this.deleteUserFromGym(this.state.gym.id,username)}} type="danger">
                                            Delete
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            ))}
                           
                        </Card.Body>
            </Card>
        );
    }

    formRef = React.createRef();

    onReset = () => {
        this.formRef.current.resetFields();
    }
    onTitleChange = ({target : {value}}) => {
        this.setState({value})
    };

    onFinish = () => {

        const value = {
            title : this.state.value,
            gymid : this.state.gym.id
        }
        
        console.log("video : " + value.title + " gymid : " + value.gymid)
        VideoService.addVideoGym(value.title,value.gymid).then((response) => {
            console.log(response.data)
        }).catch((error) => {console.log(error)});
    };

    renderVideosTab()
    {
        const {value} = this.state.value;
        return(
            <Card text="dark">
                        <Card.Header>
                            Gym Videos : 
                        </Card.Header>
                        <Card.Body>
                            <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
                            <Form.Item name="title" label="Video Title"
                                        rules={[{required: true}]}>
                                <Input
                                    value={value}
                                    onChange={this.onTitleChange}
                                    placeholder="Insert Video Title"
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
                            <ListGroup>
                                {this.state.videos&& this.state.videos.map(({title,url}) =>(
                                <>
                                <ListGroup.Item variant="secondary">Title : {title}</ListGroup.Item>
                                <ListGroup.Item variant="secondary">Url : {url}</ListGroup.Item>
                                <Button onClick={() => {this.deleteVideoFromGym(this.state.gym.id,title)}} type="danger">
                                            Delete
                                </Button>
                                </>
                                ))}
                            </ListGroup>
                        </Card.Body>
            </Card>
        );
    }
}



export default GymPage;