import { MongoClient } from 'mongodb'

const { MONGODB_PASSWD, DB_NAME } = process.env

const URI = `mongodb+srv://pugbot-user:${MONGODB_PASSWD}@pugbot-cluster-3gn5k.mongodb.net/test?retryWrites=true`

export async function insertBattleTag(memberId, battleTag) {
  if (!memberId || !battleTag) {
    return 0
  }

  const client = new MongoClient(URI)
  await client.connect()

  const db = client.db(DB_NAME)

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
  return r.upsertedCount || r.modifiedCount || r.matchedCount
}

export async function getBattleTag(memberId) {
  if (!memberId) {
    return null
  }

  const client = new MongoClient(URI)
  await client.connect()

  const db = client.db(DB_NAME)

  const doc = await db.collection('users').findOne({
    _id: memberId
  })

  client.close()

  if (doc) {
    return doc.battleTag
  }

  return null
}
