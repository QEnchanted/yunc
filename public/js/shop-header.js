$(function(){
    $.ajax({
        url:"shop-header.html",
        type:"get",
        success:function(result){
            // console.log(result);
            $(result).replaceAll("header");
            $(`<link rel="stylesheet" href="css/shop-header.css">`).appendTo("head");
        }
    })
})