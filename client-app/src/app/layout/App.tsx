import React, { useEffect } from 'react';
import {  Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import TravelDashboard from '../../features/travelies/dashboardT/TravelDashboard';
import PhotoDashboard from '../../features/photoies/dashboardP/PhotoDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import TravelForm from '../../features/travelies/formT/TravelForm';
import PhotoForm from '../../features/photoies/formP/PhotoForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import TravelDetails from '../../features/travelies/detailsT/TravelDetails';
import PhotoDetails from '../../features/photoies/datailsP/PhotoDetails';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';

function App() {

  const location = useLocation ();
  const {commonStore, userStore} = useStore ();

  useEffect (() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded ();
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <LoadingComponent content='Loading app...' />

  return (
    <>
    <ToastContainer position='bottom-right' hideProgressBar/>
    <ModalContainer />
    <Route exact path='/' component={HomePage} />
    <Route
    path={'/(.+)'}
    render = {() => (
      <> 
      <NavBar />
      <Container style={{marginTop:'7em'}}>
        <Switch>
       <Route exact path='/activities' component={ActivityDashboard} />
       <Route  path='/activities/:id' component={ActivityDetails} />
       <Route key={location.key} path={['/createActivity' , '/manage/:id']} component={ActivityForm} />
       
       <Route exact path='/travelies' component={TravelDashboard} />
       <Route  path='/travelies/:id' component={TravelDetails} />
       <Route key={location.key} path={['/createTravel' , '/manage/:id']} component={TravelForm} />

       <Route exact path='/photoies' component={PhotoDashboard} />
       <Route  path='/photoies/:id' component={PhotoDetails} />
       <Route key={location.key} path={['/createPhoto' , '/manage/:id']} component={PhotoForm} />

       <Route path='/errors'component={TestErrors} />
       <Route path= '/server-error' component={ServerError} />
       <Route path='/login' component={ServerError} />
       <Route component={NotFound}/>
       </Switch>
      </Container>
      </>
    )}
    />
    </>
  );
}

export default observer (App);
