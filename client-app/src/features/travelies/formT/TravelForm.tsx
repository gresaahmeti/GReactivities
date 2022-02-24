import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button,   Header,   Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from 'uuid';
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
//import MyTextArea from "./MyTextArea";
import MyTextArea from "./MyTextAreaT";
//import MySelectInput from "./MySelectInputT";
import MySelectInput from "./MySelectInputT";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Activity } from "../../../app/models/activity";
import { Travel } from "../../../app/models/travel";

export default observer ( function TravelForm() {
    const history = useHistory ();
    const {travelStore} = useStore ();
    const { createTravel, updateTravel,
         loading, loadTravel, loadingInitial} = travelStore;
    const {id} = useParams<{id: string}> ();

    const [travel, setTravel] = useState <Travel> ({
        id: '',
        title: '',
      //  category: '',
        description:'',
        date:null,
        city: '',
      //  venue:''
    });

    const validationSchema = Yup.object ({
        title: Yup.string().required('The travel title is required'),
        description: Yup.string().required('The travel description is required'),
      //  category: Yup.string().required(),
        date: Yup.string().required('Date is required').nullable(),
      //  venue: Yup.string().required(),
        city: Yup.string().required(),
    })

    useEffect (() => {
        if (id) loadTravel (id). then(travel => setTravel(travel!))
    }, [id, loadTravel]);

   
    function handleFormSubmit(travel: Travel) {
     if( travel.id.length ===0 ) {
           let newTravel = {
               ...travel,
               id: uuid ()
           };
           createTravel(newTravel).then (() => history.push(`/travelies/${newTravel.id}`))
       } else {
           updateTravel(travel).then (() => history.push(`/travelies/${travel.id}`))
       }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value}= event.target;
        setTravel({...travel, [name]:value})
    } 

    if (loadingInitial) return <LoadingComponent content='Loading travel ...'/>

    return(
        <Segment clearing>
            <Header content ='Travel Details' sub color='teal'/>
            <Formik
            validationSchema={validationSchema}
             enableReinitialize
              initialValues={travel}
               onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty}) => (        
            <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
            <MyTextInput placeholder='Title' name='title' />
            <MyTextArea rows={3} placeholder='Description'  name='description'/>
            <MyDateInput
             placeholderText='Date'
               name='date'
               showTimeSelect
               timeCaption='time'
               dateFormat='MMMM d, yyyy h:mm aa'
               />
               <Header content='LocationDetails' sub color='teal' />
            <MyTextInput placeholder='City'  name='city' />
           
            <Button 
            disabled={isSubmitting || !dirty || !isValid}
            loading={loading} floated='right'
             positive type='submit' content='Submit'/>
            <Button as={Link} to='/travelies' floated='right' type='button' content='Cancel' />
        </Form>
                )}
            </Formik>
        </Segment>
    )
})