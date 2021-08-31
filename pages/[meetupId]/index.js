import MeetupDetail from '../../components/meetups/MeetupDetail';
import {getColletion} from '../../utils/mongo-data';
import {ObjectId} from 'mongodb';
import Head from 'next/head';
import { SITE_NAME } from '../../utils/config';

const MeetupDetails = (props) => {
   return (
       <>
      <Head>
        <title>
          {props.meetupData.title} - {SITE_NAME}
        </title>
        <meta name='description' content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        title={props.meetupData.title}
        image={props.meetupData.image}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
   );
};

export async function getStaticPaths() {
   const [meetupCollection, client] = await getColletion();
   const allMeets = await meetupCollection.find({}).toArray();
   await client.close();

   const pathsArrOfCurrentMeets = allMeets.map((dbObj) => {
      return {
         params: {
            meetupId: dbObj._id.toString(),
         },
      };
   });

   return {
      fallback: false,
      paths: pathsArrOfCurrentMeets,
   };
}

export async function getStaticProps(context) {

   const currentId = context.params.meetupId;
   const [meetCollection, client] = await getColletion()
   const currentMeetObj = await meetCollection.findOne({
      _id: ObjectId(currentId),
   });

   console.log('currentMeetObj', currentMeetObj);

   await client.close();

   return {
      props: {
         meetupData: {
            id: currentId,
            title: currentMeetObj.title,
            image: currentMeetObj.image,
            address: currentMeetObj.address,
            description: currentMeetObj.description,
         },
         revalidate: 2,
      },
   };
}

export default MeetupDetails;


