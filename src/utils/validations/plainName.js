module.exports = (name)=>{
    if(name.length > 3){
        const spaceCount = name.split(' ').length - 1
        if((name.length - spaceCount) < 3){
            return false
        }else{
            return true
        }
    }else{
        return false
    }
}