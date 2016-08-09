module.exports = function(v1, v2){    
    var length = v1.length
    var top = 0
    for(var i = 0; i < length; i++){
        top += v1[i] * v2[i]
    }
   
    var v1Bot = 0
    for(var i = 0; i < length; i++){
        v1Bot += v1[i] * v1[i]
    }
    length = v2.length
    var v2Bot = 0
    for(var i = 0; i < length; i++){
        v2Bot += v2[i] * v2[i]
    }
    
    return top / (Math.sqrt(v1Bot) * Math.sqrt(v2Bot))
}