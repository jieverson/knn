var matrix = require('../lib/matrix')

exports.neighbors = function(user, userSimilarity, knn){
    var neighbors = userSimilarity.getLine(user)

    var result = []
    for(var i in neighbors){
        if(i != user){
            result.push({ index: parseInt(i), similarity: neighbors[i] })
            
            result = result.sort(function(a, b) { return b.similarity - a.similarity })

            if(result.length > knn){
                result = result.slice(0, knn)
            }
        }
    }

    return result
}

exports.matrix = function(neighbors, userXmovie){
    var knnXitem = matrix.new(neighbors.length, userXmovie.columns)
    for(var i in neighbors){
        var n = neighbors[i]
        var line = userXmovie.getLine(n.index)
        for(var r in line){
            var rating = line[r] * n.similarity
            knnXitem.set(rating, parseInt(i), parseInt(r))
        }
    }
    return knnXitem
}

exports.recommendations = function(user, number, items, knnXitem, userXitem){
    var itemsWeight = []
    for(var c = 0; c < knnXitem.columns; c++){
        var column = knnXitem.getColumn(c)
        itemsWeight.push({
            id: items[c],
            rating: column.sort(function(a, b) { return b - a })[0]
        })  
    }

    // Remove items already rated
    var user_items = userXitem.getLine(user)

    for(var i in itemsWeight){
        var weight = itemsWeight[i]
        weight.rating *= 1 - user_items[i]
    }

    // Get recommendations
    var sortedItems = itemsWeight.sort(function(a, b){ return b.rating - a.rating })
    var recommendations = sortedItems.slice(0, number).map(function(x){ return x.id })

    return recommendations
}