import React, { useEffect} from "react";
import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react"; 
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import PhotoList from "./PhotoList";
import PhotoFilters from "./PhotoFilters";

export default observer( function PhotoDashboard() {

        const {photoStore} = useStore();
        const {loadPhotoies, photoRegistry} = photoStore;

        useEffect (() => {
           if(photoRegistry.size ===0) loadPhotoies();
        }, [photoRegistry.size, loadPhotoies])

        if (photoStore.loadingInitial) return <LoadingComponent content='Loading photos' /> 
    return (
        <Grid>
            <Grid.Column width='10'>
            <PhotoList  />
            </Grid.Column>
            <Grid.Column width='6'>
               <PhotoFilters /> 
            </Grid.Column>
        </Grid>
    )
})