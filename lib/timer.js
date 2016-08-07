exports.start = function(){
    exports.__date = new Date()
}

exports.log = function(){
    var end = new Date()
    console.log("Log: " + ((end - exports.__date) / 1000) + "s")
}