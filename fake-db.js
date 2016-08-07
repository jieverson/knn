module.exports = function(num_users, num_items){
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

    var NUM_WATCH = num_users * 10
    for(var i = 0; i < NUM_WATCH; i++){
        watch.push({
            user: USERS[rand(0, USERS.length - 1)],
            item: ITEMS[rand(0, ITEMS.length - 1)],
        })
    }

    return watch
}