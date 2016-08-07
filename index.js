var matrix = require('./lib/matrix')
var timer = require('./lib/timer')

var prepare = require('./ml/prepare')
var training = require('./ml/training')
var evaluation = require('./ml/evaluation')

// Parameters
var WORKING_USER = 3 // Index of the user who wants recommendation
var RECOMMENDATION_COUNT = 5 // Number of recommendations
var KNN = 10 // [5~20] Number of neighbors (influence on the classification of time)


// Random Generated Database #TODO: To import something usefull
var db = require('./fake-db')(500,125)

console.log('\nDatabase:')
console.log(db.slice(0, 10))
console.log('Total: ' + db.length)



console.log('\n>>> Preparing... <<<')

timer.start()

// Split users
var users = prepare.users(db)

console.log('\nUsers:')
console.log(users.slice(0,10))
console.log('Total: ' + users.length)
timer.log()

timer.start()

// Split Items
var items = prepare.items(db)

console.log('\nItems:')
console.log(items.slice(0,10))
console.log('Total: ' + items.length)
timer.log()

timer.start()

// Users x Items Rating Matrix
var userXitem = prepare.matrix(db, users, items)

console.log('\nUser x Item:')
userXitem.print()
timer.log()



console.log('\n>>> Training... <<<')

timer.start()

// User Similarity Matrix
var userSimilarityMatrix = training.generateUserSimilarityMatrix(users, userXitem)

console.log('\nUsers Similarity:')
userSimilarityMatrix.print(function(x) { return x.toFixed(2) })
timer.log()



console.log('\n>>> Evaluation... <<<')

timer.start()

// Find neighbors
var neighbors = evaluation.neighbors(WORKING_USER, userSimilarityMatrix, KNN)

console.log('\nNeighbors:')
console.log(neighbors)
timer.log()

timer.start()

// Items Rated by Similarity
var knnXitem = evaluation.matrix(neighbors, userXitem) 

console.log('\nNeighbor X Item:')
knnXitem.print(function(x) { return x.toFixed(2) })
timer.log()

var recommendations = evaluation.recommendations(WORKING_USER, RECOMMENDATION_COUNT, items, knnXitem, userXitem)

console.log('\nRecommended Items for "' + users[WORKING_USER] + '":')
console.log(recommendations)