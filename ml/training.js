var matrix = require('../lib/matrix')

exports.generateUserSimilarityMatrix = function(users, userXitem){
    var userSimilarity = matrix.new(users.length, users.length)

    var similarity = require('../lib/cosine-similarity')
    var l = users.length

    for(var i1 = 0; i1 < l; i1++){
        var v1 = userXitem.getLine(i1)

        for(var i2 = i1; i2 < l; i2++){
            if(i1 == i2){
                userSimilarity.set(1, i1, i2)
            }
            else{
                var v2 = userXitem.getLine(i2)
                var s = similarity(v1, v2)
                userSimilarity.set(s, i1, i2)
                userSimilarity.set(s, i2, i1)
            }
            
        }
    }

    return userSimilarity
}