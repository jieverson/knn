module.exports = function(v1, v2){
    var top = 0
    for(var i in v1){
        top += v1[i] * v2[i]
    }
   
    var v1Bot = 0
    for(var i in v1){
        v1Bot += v1[i] * v1[i]
    }
    var v2Bot = 0
    for(var i in v2){
        v2Bot += v2[i] * v2[i]
    }
    var similarity = top / (Math.sqrt(v1Bot) * Math.sqrt(v2Bot))
    return similarity
}