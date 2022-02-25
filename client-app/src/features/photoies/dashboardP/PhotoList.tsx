import React, { Fragment } from "react";
import { observer } from "mobx-react-lite";
import { Header, Item, Segment } from "semantic-ui-react";
import { useStore } from "./../../../app/stores/store";
import PhotoListItem from "./PhotoListItem";

export default observer(function PhotoList() {
    const { photoStore } = useStore();
    const { groupPhotoies } = photoStore;


    return (

        <>
            {groupPhotoies.map(([group, photo]) => (
                <Fragment key={group}>
                    <Header sub color="teal">
                        {group}
                    </Header>
                    <Segment>
                        <Item.Group divided>
                            {photo.map(photo => (
                                <PhotoListItem key={photo.id} photo={photo} />
                            ))}
                        </Item.Group>
                    </Segment>


                </Fragment>
            ))}
        </>
    )
})