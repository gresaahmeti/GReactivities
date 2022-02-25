import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item,  Segment } from "semantic-ui-react";
import { Photo } from "../../../app/models/photo"; 
import {format} from 'date-fns';

interface Props {
    photo: Photo
}

export default function PhotoListItem ({photo}: Props) {


    return(
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${photo.id}`}>
                                {photo.title} 
                                </Item.Header>
                                <Item.Description> Hosted by Gresa</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock'/> {format (photo.date!, 'dd MMM yyyy h:mm aa')}
                    <Icon name='marker'/> {photo.venue}
                </span>
            </Segment>
            <Segment secondary>
                Attends go here
            </Segment>
            <Segment clearing>
                <span>{photo.description}</span>
                <Button 
                as={Link}
                to={`/photoies/ ${photo.id}`}
                color= 'teal'
                floated='right'
                content= 'View'
                />
            </Segment>
        </Segment.Group>
    )
}