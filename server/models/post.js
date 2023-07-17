import mongoose from "mongoose";
import passport from "passport";
import passportLocalMongoose from 'passport-local-mongoose'
const Schema = mongoose.Schema;

const Post = new Schema({
    title: String,
    content: String,
    thumbNailImage: {type: String, required: false},
    icon: {type: String, required: false},
    table: {type: Array, required: false}
})

Post.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Post)