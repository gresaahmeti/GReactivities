import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
//import {Activity} from "../../../app/models/activity";
import { Travel } from '../../../app/models/travel';
import {format} from 'date-fns';

const travelImageStyle = {
    filter: 'brightness(30%)'
};

const travelImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    travel : Travel
}

export default observer (function TravelDetailedHeader({travel}: Props) {
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/categoryImages/${travel.city}.jpg`} fluid style={travelImageStyle}/>
                <Segment style={travelImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={travel.title}
                                    style={{color: 'white'}}
                                />
                                <p>{format (travel.date! , 'dd MMM yyyy')}</p>
                                <p>
                                    Hosted by <strong>Gresa</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button color='teal'>Join Activity</Button>
                <Button>Cancel attendance</Button>
                <Button as={Link} to={`/manage/${travel.id}`} color='orange' floated='right'>
                    Manage Event
                </Button>
            </Segment>
        </Segment.Group>
    )
})