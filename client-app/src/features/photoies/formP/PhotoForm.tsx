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
import MyTextArea from "./MyTextAreaP";
import MySelectInput from "./MySelectInputP";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Photo } from "../../../app/models/photo";

export default observer ( function PhotoForm() {
    const history = useHistory ();
    const {photoStore} = useStore ();
    const { createPhoto, updatePhoto,
         loading, loadPhoto, loadingInitial} = photoStore;
    const {id} = useParams<{id: string}> ();

    const [photo, setPhoto] = useState <Photo> ({
        id: '',
        title: '',
        category: '',
        description:'',
        date:null,
        city: '',
        venue:''
    });

    const validationSchema = Yup.object ({
        title: Yup.string().required('The photo title is required'),
        description: Yup.string().required('The photo description is required'),
        category: Yup.string().required(),
        date: Yup.string().required('Date is required').nullable(),
        venue: Yup.string().required(),
        city: Yup.string().required(),
    })

    useEffect (() => {
        if (id) loadPhoto (id). then(photo => setPhoto(photo!))
    }, [id, loadPhoto]);

   
    function handleFormSubmit(photo: Photo) {
     if( photo.id.length ===0 ) {
           let newPhoto = {
               ...photo,
               id: uuid ()
           };
           createPhoto (newPhoto).then (() => history.push(`/photoies/${newPhoto.id}`))
       } else {
           updatePhoto(photo).then (() => history.push(`/photoies/${photo.id}`))
       }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value}= event.target;
        setPhoto({...photo, [name]:value})
    } 

    if (loadingInitial) return <LoadingComponent content='Loading photo ...'/>

    return(
        <Segment clearing>
            <Header content ='Photo Details' sub color='teal'/>
            <Formik
            validationSchema={validationSchema}
             enableReinitialize
              initialValues={photo}
               onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty}) => (        
            <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>

            <MyTextInput placeholder='Title' name='title' />
            <MyTextArea rows={3} placeholder='Description'  name='description'/>
            <MySelectInput options={categoryOptions} placeholder='Category' name='category' />
            <MyDateInput
             placeholderText='Date'
               name='date'
               showTimeSelect
               timeCaption='time'
               dateFormat='MMMM d, yyyy h:mm aa'
               />
               <Header content='LocationDetails' sub color='teal' />
            <MyTextInput placeholder='City'  name='city' />
            <MyTextInput placeholder='Venue' name='venue' />
            <Button 
            disabled={isSubmitting || !dirty || !isValid}
            loading={loading} floated='right'
             positive type='submit' content='Submit'/>
            <Button as={Link} to='/photoies' floated='right' type='button' content='Cancel' />
        </Form>
                )}
            </Formik>
        </Segment>
    )
})