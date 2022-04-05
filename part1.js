const readNumber = (request, response) => {

    const {start_number,limit_number,row_number} = request.body;

    var current_number=[];
    var next_number=[];
    var fix_number =[];
    var local_start_number=start_number;
    var multiplier;

    for (i=0;i<row_number;i++)
    {
        console.log('row:'+i);

        if (i===0){
            for (j=0;j<limit_number;j++){
                current_number.push(local_start_number++);
            }
            fix_number.push(current_number);
        
            console.log(fix_number)        
        }
        else{
            multiplier = i+1;
            next_number=[];
            for (k=0;k<current_number.length;k++){
               //console.log('content'+current_number[k] * multiplier);     
                next_number.push(current_number[k] * multiplier);
            }
            //console.log(next_number);
            fix_number.push(next_number);
            console.log(fix_number)
        }
        
    }
    response.status(200).send({success:true,data: fix_number});
}


module.exports = {
    readNumber
}