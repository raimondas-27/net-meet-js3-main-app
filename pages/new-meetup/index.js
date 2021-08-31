import React from "react";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import axios from "axios";
import {useRouter} from "next/router";
import Head from 'next/head';
import { SITE_NAME } from '../../utils/config';


const NewMeetup = (props) => {


   const router = useRouter()

   const addMeetupHandler = async (enteredMeetupData) => {
      console.log(enteredMeetupData)
      //send data to api
      const result = await axios.post("/api/new-meetup", enteredMeetupData);
      console.log(result.data)
      result.data && await router.replace("/")
   }

   return (
       <>
      <Head>
        <title>Create Meetup - {SITE_NAME}</title>
        <meta
          name='description'
          content='Add new meetup and conncect with people'
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
   )
}

export default NewMeetup;