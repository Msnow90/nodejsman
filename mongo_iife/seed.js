const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo_iife', {useNewUrlParser: true});

const User = require('./models/User');
const Group = require('./models/Group');
const Event = require('./models/Event');

var ownerIds = [];
var userIds = [];

createOwners()
.then(ownerIdArr => ownerIds = ownerIdArr)
.then(createUsers)
.then(userIdArr => userIds = userIdArr)


function createOwners() {
    return new Promise((resolve, reject) => {
        var ownerIds = [];
        
        for (var i = 1; i <= 3; ++i) {
            (function() {
                var ind = i;
                
                User.create({
                    name: `owner-${i}`
                }, (err, createdUser) => {
                    ownerIds[ind] = createdUser._id;
                    
                    if (ind == 3)
                        resolve(ownerIds);
                })
            })()
        }
    })
}

function createUsers() {
    return new Promise((resolve, reject) => {
        var userIds = [];

        for (var i = 1; i <= 3; ++i) {
            (function() {
                var ind = i;
        
                User.create({
                    name: `user-${i}`
                }, (err, createdUser) => {
                    userIds[ind] = createdUser._id;

                    if (ind == 3)
                        resolve(userIds)
                })
            })()
        }
    })
}













    // this our IIFE, which will imprint the current index ("i") into our function's scope.
    // if we do not use the IIFE (when performing async funcions inside of our loop), 
    // the scope of our async function(db operation), will refer to whatever "i" is.
    // the loop will complete,
    // thus the index will be the last number iterated, before our database operations perform,
    // and because of 