const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllUsers = async () => {
    const result = await mongodb.getDatabase().db('music').collection('user').find();
    return result.toArray();
};

const getSingleUser = async (userId) => {
    const result = await mongodb.getDatabase().db('music').collection('user').find({ _id: new ObjectId(userId) });
    const users = await result.toArray();
    return users[0];
};

const updateUser = async (userId, user) => {
    if (!user.username || !user.fullname || !user.email || !user.password) {
        throw new Error('All fields (username, fullname, email, password) are required.');
    }

    const response = await mongodb.getDatabase().db('music').collection('user').replaceOne({ _id: new ObjectId(userId) }, user);
    return response;
};

const deleteUser = async (userId) => {
    const response = await mongodb.getDatabase().db('music').collection('user').deleteOne({ _id: new ObjectId(userId) });
    return response;
};

const createUser = async (user) => {
    if (!user.username || !user.fullname || !user.email || !user.password) {
        throw new Error('All fields (username, fullname, email, password) are required.');
    }

    const response = await mongodb.getDatabase().db('music').collection('user').insertOne(user);
    return response;
};

module.exports = {
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    createUser
};
