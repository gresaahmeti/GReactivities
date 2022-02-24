import React, { Fragment } from "react";
import { observer } from "mobx-react-lite";
import { Header, Item, Segment } from "semantic-ui-react";
import { useStore } from "./../../../app/stores/store";
//import ActivityListItem from "./ActivityListItem";
import TravelListItem from "./TravelListItem";

export default observer(function TravelList() {
    const { travelStore } = useStore();
    const { groupTravelies } = travelStore;


    return (

        <>
            {groupTravelies.map(([group, travelies]) => (
                <Fragment key={group}>
                    <Header sub color="teal">
                        {group}
                    </Header>
                    <Segment>
                        <Item.Group divided>
                            {travelies.map(travel => (
                                <TravelListItem key={travel.id} travel={travel} />
                            ))}
                        </Item.Group>
                    </Segment>


                </Fragment>
            ))}
        </>
    )
})