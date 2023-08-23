import mongoosePaginate from "mongoose-paginate-v2";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 100
    },
    email: {
        type: String,
        required: true,
        min: 3,
        max: 100
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    ativo: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

UserSchema.plugin(mongoosePaginate);

const User = mongoose.model("User", UserSchema);

export default User;