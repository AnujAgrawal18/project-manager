
import { MongoClient } from 'mongodb';
import { NextResponse} from "next/server";

const url = "mongodb+srv://anujagrawal1804:<db_password>@projectsinfo.k7fms.mongodb.net/?retryWrites=true&w=majority&appName=projectsinfo";
const client = new MongoClient(url);
const dbName = 'myProjectManager';

export async function GET(res) {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('data');
    const findResult = await collection.find({}).toArray()
    return NextResponse.json(findResult)
}

export async function POST(req) {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('data');
    const project = await req.json()
    const findResult = await collection.insertOne(project)
    return NextResponse.json({ findResult })
}

export async function DELETE(req) {
    await client.connect();
    const db = client.db(dbName);
    const project = await req.json()
    const collection = db.collection('data');
    const findResult = await collection.deleteOne(project, function(err, obj) {
        if (err) throw err;
        console.log(" document(s) deleted");
      });
    return NextResponse.json({ findResult })
}
