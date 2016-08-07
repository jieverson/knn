var matrix = require('./matrix')

// Parameters
var WORKING_USER = 3 // Index of the user who wants recommendation
var RECOMMENDATION_COUNT = 5 // Number of recommendations
var KNN = 10 // [5~20] Number of neighbors (influence on the classification of time)


// Random Generated Database #TODO: To import something usefull
var NUM_USERS = 500
var NUM_MOVIES = 125

var USERS = []
for(var i = 0; i < NUM_USERS; i++){
    USERS.push('User:' + i)
}

var MOVIES = []
for(var i = 0; i < NUM_MOVIES; i++){
    MOVIES.push('Movie:' + i)
}

function rand(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

var watch = []

var NUM_WATCH = NUM_USERS * 10
for(var i = 0; i < NUM_WATCH; i++){
    watch.push({
        user: USERS[rand(0, USERS.length - 1)],
        movie: MOVIES[rand(0, MOVIES.length - 1)],
    })
}

console.log('\nDatabase:')
console.log(watch.slice(0, 10))
console.log('Total: ' + watch.length)



console.log('\n>>> Preparing... <<<')

start = new Date()

// Split Users
var users = []
for(var i in watch){
    var rating = watch[i]
    var user = null
    for(var u in users){
        var aux = users[u]
        if(aux == rating.user){
            user = aux
        }
    }
    if(!user){
        users.push(rating.user)
    }
}

end = new Date()

console.log('\nUsers:')
console.log(users.slice(0,10))
console.log('Total: ' + users.length)
console.log("Log: " + ((end - start) / 1000) + "s")

start = new Date()

// Split Movies
var movies = []
for(var i in watch){
    var rating = watch[i]
    var movie = null
    for(var m in movies){
        var aux = movies[m]
        if(aux == rating.movie){
            movie = aux
        }
    }
    if(!movie){
        movies.push(rating.movie)
    }
}

end = new Date()

console.log('\nMovies:')
console.log(movies.slice(0,10))
console.log('Total: ' + movies.length)
console.log("Log: " + ((end - start) / 1000) + "s")

start = new Date()

// Users x Movies Rating Matrix
var usersXmovies = matrix.new(users.length, movies.length, 0)

for(var i in watch){
    var rating = watch[i]
    usersXmovies.set(1, users.indexOf(rating.user), movies.indexOf(rating.movie))
}

end = new Date()

console.log('\nUsers x Movies:')
usersXmovies.print()
console.log("Log: " + ((end - start) / 1000) + "s")



console.log('\n>>> Training... <<<')

start = new Date()

// User Similarity Matrix
var userSimilarity = matrix.new(users.length, users.length)

var similarity = require('./cosine-similarity')
for(var i1 in users){
    var u1 = parseInt(i1)
    var v1 = usersXmovies.getLine(u1)

    for(var i2 in users){
        var u2 = parseInt(i2)
        var v2 = usersXmovies.getLine(u2)
            
        userSimilarity.set(similarity(v1, v2), u1, u2)
    }
}

end = new Date()

console.log('\nUsers Similarity:')
userSimilarity.print(function(x) { return x.toFixed(2) })
console.log("Log: " + ((end - start) / 1000) + "s")



console.log('\n>>> Classification... <<<')

start = new Date()

// Find neighbors
var neighbors = userSimilarity.getLine(WORKING_USER)

var knn = []
for(var i in neighbors){
    if(i != WORKING_USER){
        knn.push({ index: parseInt(i), similarity: neighbors[i] })
        
        knn = knn.sort(function(a, b) { return b.similarity - a.similarity })

        if(knn.length > KNN){
            knn = knn.slice(0, KNN)
        }
    }
}

end = new Date()

console.log('\nKNN:')
console.log(knn)
console.log("Log: " + ((end - start) / 1000) + "s")

start = new Date()

// Movies Rating by Similarity
var knnXmovies = matrix.new(knn.length, movies.length)
for(var i in knn){
    var n = knn[i]
    var line = usersXmovies.getLine(n.index)
    for(var r in line){
        var rating = line[r] * n.similarity
        knnXmovies.set(rating, parseInt(i), parseInt(r))
    }
}

end = new Date()

console.log('\nKNN X Movies:')
knnXmovies.print(function(x) { return x.toFixed(2) })
console.log("Log: " + ((end - start) / 1000) + "s")

start = new Date()

var moviesWeight = []
for(var c = 0; c < knnXmovies.columns; c++){
    var column = knnXmovies.getColumn(c)
    moviesWeight.push({
        id: movies[c],
        rating: column.sort(function(a, b) { return b - a })[0]
    })  
}

// Remove watched movies
var my_movies = usersXmovies.getLine(WORKING_USER)

for(var i in moviesWeight){
    var weight = moviesWeight[i]
    weight.rating *= 1 - my_movies[i]
}

// Get recommendations
var sortedMovies = moviesWeight.sort(function(a, b){ return b.rating - a.rating })
var recommendations = sortedMovies.slice(0, RECOMMENDATION_COUNT).map(function(x){ return x.id })

end = new Date()

console.log('\nRecommended Movies:')
console.log(recommendations)
console.log("Log: " + ((end - start) / 1000) + "s")