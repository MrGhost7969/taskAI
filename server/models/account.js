import mongoose from "mongoose";
import passport from "passport";
import passportLocalMongoose from 'passport-local-mongoose'
const Schema = mongoose.Schema;

const Account = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    }
})

Account.plugin(passportLocalMongoose, {usernameField: 'email'});

export default mongoose.model('Account', Account)