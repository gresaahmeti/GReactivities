import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import PhotoDetailedChat from "./PhotoDetailedChat";
import PhotoDetailedInfo from "./PhotoDetailedInfo";
import PhotoDetailedSidebar from "./PhotoDetailedSidebar";
import PhotoDetailedHeader from "./PhotoDetaledHeader";


export default observer ( function PhotoDetails () {
  const {photoStore} = useStore ();
  const {selectedPhoto : photo, loadPhoto, loadingInitial} = photoStore;
  const {id} = useParams<{id: string}>();

  useEffect (() => {
    if (id) loadPhoto(id);
  }, [id, loadPhoto]);

  if (loadingInitial || !photo) return <LoadingComponent/>;

    return(
   <Grid>
     <Grid.Column width={10}>
       <PhotoDetailedHeader photo={photo} />
       <PhotoDetailedInfo photo={photo} />
       <PhotoDetailedChat /> 
     </Grid.Column>
     <Grid.Column width={6}>
       <PhotoDetailedSidebar /> 
     </Grid.Column>
   </Grid>
    )
})