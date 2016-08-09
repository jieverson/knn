module.exports = function(num_users, num_items, db_rows){
    var USERS = []
    for(var i = 0; i < num_users; i++){
        USERS.push('User:' + i)
    }

    var ITEMS = []
    for(var i = 0; i < num_items; i++){
        ITEMS.push('Item:' + i)
    }

    function rand(min,max)
    {
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    var watch = []

    for(var i = 0; i < db_rows; i++){
        watch.push({
            user: USERS[rand(0, USERS.length - 1)],
            item: ITEMS[rand(0, ITEMS.length - 1)],
        })
    }

    return watch
}