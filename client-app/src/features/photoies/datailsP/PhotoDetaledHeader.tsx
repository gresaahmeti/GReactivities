import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import {Photo} from "../../../app/models/photo";
import {format} from 'date-fns';

const photoImageStyle = {
    filter: 'brightness(30%)'
};

const photoImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    photo: Photo
}

export default observer (function PhotoDetailedHeader({photo}: Props) {
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/categoryImages/${photo.category}.jpg`} fluid style={photoImageStyle}/>
                <Segment style={photoImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={photo.title}
                                    style={{color: 'white'}}
                                />
                                <p>{format (photo.date! , 'dd MMM yyyy')}</p>
                                <p>
                                    Hosted by <strong>Gresa</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button color='teal'>See Photos</Button>
                <Button>Cancel attendance</Button>
                <Button as={Link} to={`/manage/${photo.id}`} color='orange' floated='right'>
                    Manage Photo
                </Button>
            </Segment>
        </Segment.Group>
    )
})