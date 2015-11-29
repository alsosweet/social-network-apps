
module.exports = {

    varatr:function(data, option){

        for(var i = 0; i < data.length; i++){
            var id = data[i].userid%1000;
            if(id.toString().length == 1){
                id = '00'+id;
            }else if(id.toString().length == 2){
                id = '0'+id;
            }
            if(data[i].sex == '女'){
                data[i].avatar = 'http://picc.eckuku.com/user_data7/'+data[i].vir_age+'/'+id+'_avatar_big.jpg';
            }else{
                if(data[i].vir_age >33) data[i].vir_age = 30;
                data[i].avatar = 'http://picc.eckuku.com/user_data6/'+data[i].vir_age+'/'+id+'_avatar_big.jpg';
            }

            if(option) data[i].dist = i+option.from;

            data[i].age = data[i].vir_age;
        }
        return data;
    },

}

