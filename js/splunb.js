var i = 0;
var LIWIDTH = 1100;
var DURATION = 500;
var LICOUNT = 6;
var canClick = true;

//要移动的ul
var ulImgs = document.getElementById("ul-imgs");
console.log(ulImgs);
var ulIdxs = document.getElementById("ul-idxs");
var lis = ulIdxs.children;
var btnleft = document.getElementById("btn-left");
var btnright = document.getElementById("btn-right");

//创建图片移动函数
function moveTo(to){
    if(to==undefined){//如果没有指定到第几张图片，就到下一张
        to = i+1;
    }  
    if(i==0){//如果图片位于第一张时,往左滚动没问题，往右出错
        if(to<i){
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
    i=to;//把当前显示的图片值赋值给i
    // ulImgs.className="transition";
    ulImgs.style.marginLeft = -i*LIWIDTH+"px";
    if(i==LICOUNT){//到了最后一张时，要立即换到第一张
        i=0;
        setTimeout(function(){//定时器的作用是等动画播放完再拉回到第一张
            ulImgs.className=" ";//把动画清掉，防止用户看到往回滚的效果
           ulImgs.style.marginLeft = 0+"px";//拉回到第一张
        },DURATION+200)  
    }
    //让底部小圆点跟随滚动
   for(var li of lis){
        li.className="";
   }
   lis[i].className="active";
}

 function move(n){
     if(canClick==true){
        moveTo(i+n);
        canClick=false;
        setTimeout(function(){
            canClick=true;
        },DURATION+400)
    }
 }
//添加按钮点击移动事件
btnleft.onclick=function(){
    move(-1);
}
btnright.onclick=function(){
    move(1);
}
//添加自动播放事件
var timer = setInterval(function(){
    moveTo();
},3000)
//添加鼠标放在上面就不会自动播放事件
var lunb = document.getElementById("lunb");
lunb.onmouseover = function(){
    clearInterval(timer);
}

lunb.onmouseout = function(){
    timer=setInterval(function(){
        moveTo();
    },3000);
}
//添加小圆点的点击事件
ulIdxs.onclick = function(e){
  if(canClick==true){
      var li=e.target;
      if(li.nodeName=="LI"){
          if(li.className!="active"){
              for(var i=0;i<lis.length;i++){
                  if(lis[i]==li){
                      break;
                  }
              }
              moveTo(i);
              canClick=false;
              setTimeout(function(){
                canClick=true;
              },DURATION+100)
          }
      }
  }
}