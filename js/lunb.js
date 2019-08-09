var i=0;
var LIWIDTH=730;//每个li的固定宽度
var DURATION=500;//每次轮播动画持续的时间
var LICOUNT=4;//li的总个数
var canClick = true;

//要移动的ul
var ulImgs = document.getElementById("ul-imgs");
var ulIdxs = document.getElementById("ul-idxs");
var btnleft=document.getElementById("btn-left");
var btnright=document.getElementById("btn-right");
 
var lis = ulIdxs.children;
function moveTo(to){
    if(to==undefined){
        to=i+1;
    }
    if(i==0){//如果滚动从头开始，再重新加上transition
        if(to<i){//在第一张图片时要向右移
            ulImgs.className="";
            ulImgs.style.marginLeft=-LICOUNT*LIWIDTH+"px";
            setTimeout(function(){
                moveTo(LICOUNT-1);    
            },100);
            return;
        }else{
            ulImgs.className="transition";
        }
    }
    i=to;
    ulImgs.style.marginLeft = -i*LIWIDTH+"px";
    if(i==LICOUNT){
        i=0;
        //当transition动画播放完之后，才
        setTimeout(function(){
          ulImgs.className="";//清掉transition属性
          ulImgs.style.marginLeft=0;//将ulImgs拉回0位置
        },DURATION)
      }
    for(var li of lis){
        li.className="";
    }
    lis[i].className="active";
}
function move(n){
    if(canClick){
        moveTo(i+n);
        canClick=false;
        setTimeout(function(){
            canClick=true;
        },DURATION+100)
    }
}
btnleft.onclick=function(){
    move(-1);
}
btnright.onclick=function(){
    move(1);
}

var timer = setInterval(function(){
    moveTo();
},3000);

var lunb = document.getElementById("lunb");
lunb.onmouseover=function(){
    clearInterval(timer);
}
lunb.onmouseout=function(){
    timer=setInterval(function(){
        moveTo();
    },3000);
}
ulIdxs.onclick=function(e){
   if(canClick){
       var li=e.target;
       if(li.nodeName=="LI"){
           if(li.className!="active"){
               for(var i=0;i<lis.length;i++){
                   if(lis[i]==li){
                       break;
                   }
               }
               moveTo(i);
               setTimeout(function(){
                   canClick=true;
               },DURATION)
           }
       }
   }
}