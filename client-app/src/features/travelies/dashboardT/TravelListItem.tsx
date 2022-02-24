import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item,  Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity"; 
import {format} from 'date-fns';
import { Travel } from "../../../app/models/travel";

interface Props {
    travel: Travel
}

export default function TravelListItem ({travel}: Props) {


    return(
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/travelies/${travel.id}`}>
                                {travel.title} 
                                </Item.Header>
                                <Item.Description> Hosted by Gresa</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock'/> {format (travel.date!, 'dd MMM yyyy h:mm aa')}
                    <Icon name='marker'/> {travel.city}
                </span>
            </Segment>
            <Segment secondary>
                Attends go here
            </Segment>
            <Segment clearing>
                <span>{travel.description}</span>
                <Button 
                as={Link}
                to={`/travelies/ ${travel.id}`}
                color= 'teal'
                floated='right'
                content= 'View'
                />
            </Segment>
        </Segment.Group>
    )
}