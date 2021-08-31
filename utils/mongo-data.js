import { MongoClient } from 'mongodb';

export async function getColletion() {
  const client = await MongoClient.connect(process.env.MONGO_CONN);
  const db = client.db();
  // sukurti arba nusitiaikyti i esama
  const meetupCollection = db.collection('meetups');
  return [meetupCollection, client];
}