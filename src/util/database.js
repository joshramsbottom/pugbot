import { MongoClient } from 'mongodb'

const { MONGODB_PASSWD } = process.env

const uri = `mongodb+srv://pugbot-user:${MONGODB_PASSWD}@pugbot-cluster-3gn5k.mongodb.net/test?retryWrites=true`

export async function insertBattleTag(memberId, battleTag) {
  if (!memberId || !battleTag) {
    return 0
  }

  const client = new MongoClient(uri)
  await client.connect()

  const db = client.db('test')

  const r = await db.collection('users').updateOne({
    _id: memberId
  },
  {
    $set: {
      battleTag
    }
  },
  {
    upsert: true
  })

  client.close()
  return r.insertedCount || r.modifiedCount
}
