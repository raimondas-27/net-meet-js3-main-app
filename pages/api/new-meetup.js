//cia aprasyti galima prisijungimo slaptazodzius ir kita susijusia info. cia aprasytas kodas nekeliauja i kliento narsykle
//localhost:3000/api/new-meetup

//
import {MongoClient} from "mongodb";


const handler = async (req, res) => {
   console.log(req.method);
   if (req.method === 'POST') {
      const data = req.body;
      console.log('got data in api/new-meetup', data);
      let client;
      try {
         client = await MongoClient.connect(process.env.MONGO_CONN);
         const db = client.db();
         // sukurti arba nusitiaikyti i esama
         const meetupCollecion = db.collection('meetups');
         const insertResult = await meetupCollecion.insertOne(data);
         res.status(201).json({msg: 'success', insertResult});
      } catch (error) {
         res.status(500).json({error: error});
      } finally {
         client && await client.close();
      }
   }
}

export default handler;


