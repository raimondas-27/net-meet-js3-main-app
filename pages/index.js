import MeetupList from '../components/meetups/MeetupList';
import { getCollection } from '../utils/mongo-data';
import Head from 'next/head';
import { SITE_NAME } from '../utils/config';

const HomePage = (props) => {

  return (
    <>
      <Head>
        <title>All Meetups - {SITE_NAME}</title>
        <meta name='description' content='Browse meetups around the world' />
      </Head>
      <h1>Home meetup page</h1>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

export async function getStaticProps() {

  const [meetupCollecion, client] = await getCollection();
  const allMeets = await meetupCollecion.find({}).toArray();
  await client.close();

  // console.log(allMeets);
  const meetsInReqFormat = allMeets.map((dbObj) => {

    return {
      id: dbObj._id.toString(),
      title: dbObj.title,
      address: dbObj.address,
      image: dbObj.image,
      description: dbObj.description,
    };
  });

  return {
    props: {
      meetups: meetsInReqFormat,
    },
    revalidate: 2,
  };
}

export default HomePage;