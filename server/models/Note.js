import mongoose from "mongoose";
import autoIncrement from 'mongoose-sequence'

const AutoIncrement = autoIncrement(mongoose)

const noteSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        title: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    } 
)

noteSchema.plugin(AutoIncrement, {
    inc_field: 'ticket',
    id: 'tickenNums',
    start_req: 500
})

export default mongoose.model('Note', noteSchema)

