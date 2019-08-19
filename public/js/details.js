$(function(){
   var $t = $('#count');
   $('#add').click(function(){
     $t.val(parseInt($t.val())+1);
   })
   $('#minus').click(function(){
     if($t.val()>1){
     $t.val(parseInt($t.val())-1);
    }else{
      $t.val(parseInt($t.val()))=1;
    }
   })
   

    var lid =window.location.search.split("=")[1];
if(lid){
    $.ajax({
        url:"http://localhost:8080/details",
        type:"get",
        data:{ lid },
        dataType:"json",
        success:function(result){
            console.log(result);
            var pics=result.pics;
            var html="";
            for(var p of pics){
          
              var {sm, md, lg}=p;
              html+=`<li class="float-left p-1">
                <img src="${sm}" data-md="${md}" data-lg="${lg}">
              </li>`;
            }
            var $ulImgs=$("#ulImgs");
            var LIWIDTH=62;
            $ulImgs.html(html)
            //根据图片的张数，计算ul的宽
                    .css(
                      "width",
                      LIWIDTH*pics.length
                    )
            //2. 单击左右按钮，让ulImgs左右移动
            var times=0;
            var $btnLeft=$("#btnLeft");
            var $btnRight=$("#btnRight")
            if(pics.length<=4){
              $btnRight.addClass("disabled");
            }
            $btnRight.click(function(){
              var $btn=$(this);
              if($btn.is(":not(.disabled)")){
                times++;
                $ulImgs.css(
                  "margin-left",
                  -LIWIDTH*times
                );
                //当点完所有多余的图片后，当前按钮禁用
                if(pics.length-4==times){
                  $btn.addClass("disabled");
                }
                //只要右边按钮可以点一下，左边按钮一定启用的
                $btnLeft.removeClass("disabled");
              }
            });
            $btnLeft.click(function(){
              var $btn=$(this);
              if($btn.is(":not(.disabled)")){
                times--;
                $ulImgs.css(
                  "margin-left",
                  -LIWIDTH*times
                );
                //当点完所有多余的图片后，当前按钮禁用
                if(times==0){
                  $btn.addClass("disabled");
                }
                //只要左边按钮可以点一下，右边按钮一定启用的
                $btnRight.removeClass("disabled");
              }
            })
            /*2. 中图片*/
            //1. 开始时，将第一张图片的中图片版本加载到img上
            var $mImg=$("#mImg");
            $mImg.attr("src",pics[0].md);
            var $lgDiv=$("#div-lg");
            $lgDiv.css(
              "background-image",
              `url(${pics[0].lg})`
            )
            //2. 鼠标移入小图片时，换中图片为当前小图片的data-md属性值
            $ulImgs.on(
              "mouseenter",
              "li>img",
              function(){
                var $img=$(this);
                $mImg.attr(
                  "src",
                  $img.attr("data-md")
                );
                $lgDiv.css(
                  "background-image",
                  `url(${$img.attr("data-lg")})`
                )
              }
            )
        }
    })
}
})

var MSIZE=176;//mask大小
        var $mask=$("#mask");
        var $smask=$("#super-mask");
        var $lgDiv=$("#div-lg");
        
        $smask
        .mouseenter(function(){
          $mask.removeClass("d-none");
          $lgDiv.removeClass("d-none");
        }).mouseleave(function(){
          $mask.addClass("d-none");
          $lgDiv.addClass("d-none");
        })
        //4. 当鼠标在super-mask中移动时，让mask跟随鼠标移动
        .mousemove(function(e){
          var {offsetX, offsetY}=e;
          var left=offsetX-MSIZE/2;
          var top=offsetY-MSIZE/2;
          if(left<0){ left=0 }
          else if(left>MSIZE){ left=MSIZE}
          if(top<0){ top=0 }
          else if(top>MSIZE){ top=MSIZE}
          $mask.css({left,top})
          $lgDiv.css(
            "background-position",
            `-${20/9*left}px -${20/9*top}px`
          );
        })