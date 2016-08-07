var matrix = require('../lib/matrix')

exports.generateUserSimilarityMatrix = function(users, userXitem){
    var userSimilarity = matrix.new(users.length, users.length)

    var similarity = require('../lib/cosine-similarity')
    for(var i1 in users){
        var u1 = parseInt(i1)
        var v1 = userXitem.getLine(u1)

        for(var i2 in users){
            var u2 = parseInt(i2)
            var v2 = userXitem.getLine(u2)
                
            userSimilarity.set(similarity(v1, v2), u1, u2)
        }
    }

    return userSimilarity
}
