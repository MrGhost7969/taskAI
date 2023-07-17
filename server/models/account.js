import mongoose from "mongoose";
import passport from "passport";
import passportLocalMongoose from 'passport-local-mongoose'
const Schema = mongoose.Schema;

const Account = new Schema({
    username: String,
    email: { type: String, required: false },
    password: String
})

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account)