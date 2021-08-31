import React, {useEffect, useState} from "react";
import MeetupList from "../components/meetups/MeetupList";
import {getCollection} from "../utils/mongo-data";
import Head from 'next/head';
import {SITE_NAME} from '../utils/config';


const DUMMY_MEETUPS = [
   {
      id: "m1",
      title: "the first meetup",
      image: "https://picsum.photos/id/1016/1000/800",
      address: "some street 5, 234545, Rome, Italy",
      description: "this is our first meet in Italy",
   },
   {
      id: "m2",
      title: "the second meetup",
      image: "https://picsum.photos/id/1018/1000/800",
      address: "another street 34, 765478, London, England",
      description: "this is our first meet in UK",
   }
]

const HomePage = (props) => {

   return (
       <>
          <Head>
             <title>All Meetups - {SITE_NAME}</title>
             <meta name='description' content='Browse meetups around the world'/>
          </Head>
          <h1>Home meetup page</h1>
          <MeetupList meetups={props.meetups}/>
       </>
   )
}


//vietoj state ir useEffect naudojama butent sitokio pavadinimo funkcija, kad gauti duomenis. SSG budas.
export const getStaticProps = async () => {

   const {meetupCollection, client} = await getCollection()

   const allMeets = await meetupCollection.find({}).toArray()
   await client.close()

   const meetsInRequiredFormat = allMeets.map((dbObject) => {
      return {
         id: dbObject._id.toString(),
         title: dbObject.title,
         address: dbObject.address,
         image: dbObject.image,
         description: dbObject.description,
      }
   })

   return {
      props: {
         meetups: meetsInRequiredFormat,
      },
      revalidate: 2,
   }
}

//vietoj state ir useEffect naudojama butent sitokio pavadinimo funkcija, kad gauti duomenis. SSR budas.

// export const getServerSideProps = (context) => {
//
//    const request = context.req;
//    const response = context.res;
//
//    return {
//       props : {
//          meetups: DUMMY_MEETUPS,
//       },
//
//    }
// }


export default HomePage;