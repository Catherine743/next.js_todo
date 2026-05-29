import { model, models, Schema} from 'mongoose'

export interface Inote {
    title: string,
    description: string
}

const notesSchema = new Schema<Inote>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
},{timestamps: true})

export default models.notes || model<Inote>('notes',notesSchema)