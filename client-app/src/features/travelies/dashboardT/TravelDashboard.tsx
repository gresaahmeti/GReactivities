import React, { useEffect} from "react";
import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react"; 
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
//import ActivityList from "./ActivityList";
//import ActivityFilters from "./ActivityFilters";
import TravelList from "./TravelList";
import TravelFilters from "./TravelFilters";

export default observer( function TravelDashboard() {

        const {travelStore} = useStore();
        const {loadTravelies, travelRegistry} = travelStore;

        useEffect (() => {
           if(travelRegistry.size ===0) loadTravelies();
        }, [travelRegistry.size, loadTravelies])

        if (travelStore.loadingInitial) return <LoadingComponent content='Loading travelies' /> 
    return (
        <Grid>
            <Grid.Column width='10'>
            <TravelList  />
            </Grid.Column>
            <Grid.Column width='6'>
               <TravelFilters /> 
            </Grid.Column>
        </Grid>
    )
})