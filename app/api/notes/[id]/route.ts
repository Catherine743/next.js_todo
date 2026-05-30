import connectDB from '@/lib/mongoConfig'
import noteModel from '@/models/notes'
import { NextResponse } from 'next/server'

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        connectDB()
        await noteModel.findByIdAndDelete(id)
        return NextResponse.json({ message: "Deleted successfully", status: 200 })
    }
    catch (error) {
        return NextResponse.json(error, { status: 404 })
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        let { id } = await params
        let body = await req.json()
        connectDB()
        const updatedNotes = await noteModel.findByIdAndUpdate(id, body, { new: true })
        return NextResponse.json(updatedNotes, { status: 200 })
    }
    catch (error) {
        return NextResponse.json(error, { status: 404 })
    }
}