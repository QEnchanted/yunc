// $(function(){
//     $.ajax({
//         url:"login.html",
//         type:"get",
//         success:function(result){
//             console.log(result);
//             $(result).replaceAll("main");
//             // $(`<link rel="stylesheet" href="css/login.css"> `).appendTo("footer");
//         }
//     })
// })


// function show(){
//     div.black.classList.remove('hide');
// }

// var lo = document.getElementsByClassName("nav-11")[0];
// console.log(lo);
// lo.onclick=function(){
//     blank.style.removeClass("hide");
// }
function show()
{
	var lo = document.getElementById("blank");
	var lo1= document.getElementsByClassName("blank_out")[0];
	console.log(lo1);
	lo1.style.display="block";
	lo.style.display="block"
}
function hide()
{
	var lil = document.getElementById("blank");
	var lo1= document.getElementsByClassName("blank_out")[0];
	lil.style.display="none";
	lo1.style.display="none";
	// uname.value="";
	// upwdss.value="";
	namess.innerHTML="";
	pwdss.innerHTML="";
}
 document.getElementById("login").onclick=function (){	
		 console.log(uname.value,namess.innerHTML);
		 var reg = /^\w{3,8}$/;
			if(uname.value==""){
				alert("用户名不能为空");
				namess.innerHTML="";
			}else if(!reg.test(uname.value)){
				namess.innerHTML="用户名格式不正确";
			}

			if(upwdss.value==""){
				alert("密码不能为空");
				pwdss.innerHTML="";
			}else if(!reg.test(upwdss.value)){
				pwdss.innerHTML="密码格式不正确";
			}
			else{
				// alert("登录成功");
				hide();
			}
		}