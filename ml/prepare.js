var matrix = require('../lib/matrix')

exports.users = function(db){
    var users = []
    for(var i in db){
        var rating = db[i]
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
    return users
}

exports.items = function(db){
    var items = []
    for(var i in db){
        var rating = db[i]
        var item = null
        for(var m in items){
            var aux = items[m]
            if(aux == rating.item){
                item = aux
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

    for(var i in db){
        var rating = db[i]
        userXitem.set(1, users.indexOf(rating.user), items.indexOf(rating.item))
    }

    return userXitem
}