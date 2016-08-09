exports.new = function(lines, columns, def){
    var data = new Array(lines * columns)

    data.lines = lines
    data.columns = columns
    data.default = def

    data.get = function(l,c){
        if(l >= data.lines){
            return undefined
        }
        if(c >= data.columns){
            return undefined
        }

        var v = data[l + data.lines * c]
        if(v == null){
            v = data.default
        }
        return v
    }

    data.getLine = function(l){
        if(l >= data.lines){
            return undefined
        }
        
        var line = []
        var columns = data.columns
        for(var i = 0; i < columns; i++){
            line.push(data.get(l,i))
        }
        return line
    }

    data.getColumn = function(c){
        if(c >= data.columns){
            return undefined
        }
        
        var column = []
        var lines = data.lines
        for(var i = 0; i < lines; i++){
            column.push(data.get(i,c))
        }
        return column
    }

    data.set = function(value, l, c){
        data[l + data.lines * c] = value
    }

    data.print = function(format){
        var lines = data.lines
        for(var l = 0; l < lines; l++){
            if(l > 10){
                console.log('...')
                break;
            }
            var line = []
            var columns = data.columns
            for(var c = 0; c < columns; c++){
                if(c > 10){
                    line.push('...')
                    break;
                }
                
                var cell = data.get(l,c)
                if(format){
                    cell = format(cell)
                }
                line.push(cell)
            }
            console.log(line.join('|'))
        }
    }

    return data
}