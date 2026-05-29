import connectDB from '@/lib/mongoConfig'
import noteModel from '@/models/notes'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        // connectDB for sending req to db
        await connectDB();
        // create body to a new document
        const body = await req.json()
        let newNote = await noteModel.create(body)
        return NextResponse.json(newNote, { status: 201 })
    } catch (error) {
        return NextResponse.json(error, { status: 404 })
    }
}

export async function GET(req: Request) {
    try {
        await connectDB();
        // get all notes
        let allNotes = await noteModel.find()
        return NextResponse.json(allNotes, { status: 200 })
    } catch (error) {
        return NextResponse.json(error, { status: 404 })
    }
}