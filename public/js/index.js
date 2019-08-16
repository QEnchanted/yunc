var WIDTH=645;
var a=0;
var DURAT=500;
var COUNT=3;
var can=true;
var alImgs = document.getElementById("al-imgs");
var left=document.getElementById("left");
var right=document.getElementById("right");
function moTo(n){
    if(n==undefined){
        n=a+1;
    }
    if(a==0){//如果滚动从头开始，再重新加上transition
        if(n<a){//在第一张图片时要向右移
            alImgs.className="";
            alImgs.style.marginLeft=-COUNT*WIDTH+"px";
            setTimeout(function(){
                moTo(COUNT-1);    
            },100);
            return;
        }else{
            alImgs.className="transition";
        }
    }
    a=n;
    alImgs.style.marginLeft = -a*WIDTH+"px";
    if(a==COUNT){
        a=0;
        //当transition动画播放完之后，才
        setTimeout(function(){
          alImgs.className="";//清掉transition属性
          alImgs.style.marginLeft=0;//将ulImgs拉回0位置
        },DURAT)
      }
}
function me(x){
    if(can){
        moTo(a+x);
        can=false;
        setTimeout(function(){
            can=true;
        },DURATION+100)
    }
}
left.onclick=function(){
    me(-1);
}
right.onclick=function(){
    me(1);
}