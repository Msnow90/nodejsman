const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo_iife', {useNewUrlParser: true});

const User = require('./models/User');
const Group = require('./models/Group');
const Event = require('./models/Event');

var ownerIds = [];
var userIds = [];
var eventIds = [];

createOwners()
.then(ownerIdArr => ownerIds = ownerIdArr)
.then(createUsers)
.then(userIdArr => userIds = userIdArr)
.then(() => createEvents(ownerIds, userIds))
.then(eventIdsArr => eventIds = eventIdsArr)
.then(() => createGroups(ownerIds, userIds, eventIds))
.then(() => {
    console.log('Finito de database seeding!');
    process.exit(1);
})


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


function createEvents(ownerIdsArr, userIdsArr) {
    return new Promise((resolve, reject) => {
        var eventIds = [];

        for (var i = 1; i <= 3; ++i) {
            (function() {
                var ind = i;

                Event.create({
                    name: `event-${i}`,
                    attendees: [ownerIdsArr[i], userIdsArr[i]]
                }, (err, createdEvent) => {
                    eventIds[ind] = createdEvent._id;

                    if (ind == 3)
                        resolve(eventIds);
                })
            })()
        } 
    })
}

function createGroups(ownerIdsArr, userIdsArr, eventIdsArr) {
    return new Promise((resolve, reject) => {
        
        for (var i = 1; i <= 3; ++i) {
            (function() {
                var ind = i;

                Group.create({
                    name: `group-${i}`,
                    owner: ownerIdsArr[i],
                    members: [userIdsArr[i]],
                    events: [eventIdsArr[i]]
                }, (err, createdGroup) => {
                    if (ind == 3)
                        resolve(true)
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