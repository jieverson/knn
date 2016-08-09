var matrix = require('../lib/matrix')

exports.users = function(db){
    var users = []
    var length = db.length
    for(var i = 0; i < length; i++){
        var rating = db[i]
        var user = null
        var l = users.length
        for(var u = 0; u < l; u++){
            var aux = users[u]
            if(aux == rating.user){
                user = aux
                break
            }
        }
        if(!user){
            users.push(rating.user)
        }
    }
    return users
}

exports.items = function(db){
    var items = []
    var length = db.length
    for(var i = 0; i < length; i++){
        var rating = db[i]
        var item = null
        var l = items.length
        for(var m = 0; m < l; m++){
            var aux = items[m]
            if(aux == rating.item){
                item = aux
                break
            }
        }
        if(!item){
            items.push(rating.item)
        }
    }
    return items
}

exports.matrix = function(db, users, items){
    var userXitem = matrix.new(users.length, items.length, 0)

    var length = db.length
    for(var i = 0; i < length; i++){
        var rating = db[i]
        userXitem.set(1, users.indexOf(rating.user), items.indexOf(rating.item))
    }

    return userXitem
}