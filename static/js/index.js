function getCookieValue(name) {
  let value = "; " + document.cookie;
  let parts = value.split("; " + name + "=");
  if (parts.length == 2) {
  return parts.pop().split(";").shift();
  }
  }
  
  let accessToken = getCookieValue('access_token');
  
  let decodedToken = parseJwt(accessToken)
  console.log(decodedToken)
  
  function parseJwt(accessToken) {
  let base64Url = accessToken.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  let jsonPayload = decodeURIComponent(
  window
  .atob(base64)
  .split("")
  .map(function (c) {
  return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
  })
  .join("")
  );
  
  return JSON.parse(jsonPayload);
  }



function userLogin() {
    
  loginEmail = $("#loginEmail").val();
  loginPassword = $("#loginPassword").val();


  const formData = new FormData();
  formData.append("loginEmail",loginEmail);
  formData.append("loginPassword",loginPassword);

  

  $.ajax({
    type: "POST",
    url: "/login",
    dataType: "json",
    contentType: false, 
    processData: false,
    data: formData,

    }).done(function (result) {

      
      const accessToken = result['access_token']
      const refreshToken = result['refresh_token']

      const expireDate = new Date();
      
      expireDate.setDate(expireDate.getDate() + 7);
      expireDate.setDate(expireDate.getDate() +30)
      const cookieString = `access_token=${accessToken}; refresh_token=${refreshToken} expires=${expireDate.toUTCString()}; path=/`;
      document.cookie = cookieString;
     
      alert('로그인 성공')
      window.location.reload();
    }).fail(function (jqXHR) {
      console.log(jqXHR);
      $("#errorMsg").show();
    }).always(function () {
      console.log("실행되는지 확인");
    });
}



function register() {

if ($("#userEmail").val() == "") {
    alert("이메일을 입력하세요.");
    $("#userEmail").focus();
    return false;
}
if ($("#userId").val() == "") {
    alert("아이디를 입력하세요.");
    $("#userId").focus();
    return false;
}
if ($("#userPwd").val() == "") {
    alert("비밀번호를 입력하세요.");
    $("#userPwd").focus();
    return false;
}
if ($("#userPwd").val() != $('#userPwdCheck').val()) {
    alert("비밀번호가 일치하지 않습니다.");
    $("#userPwdCheck").focus();
    return false;
}

  //inputs
  userEmail = $("#userEmail").val();
  userId = $("#userId").val();
  userPwd = $("#userPwd").val();
  userAddr = $("#userAddr").val();
  //userProfile = $("#userProfile").val();
  const fileInput = document.getElementById('userProfile')
  level = 1;

  const file =fileInput.files[0];
  console.log(file)
  const formData = new FormData();
  formData.append('file',file);
  
  formData.append("userEmail",userEmail);
  formData.append("userId",userId);
  formData.append("userPwd",userPwd);
  formData.append("userAddr",userAddr);
  //formData.append("userProfile",userProfile);
  formData.append("userLevel", level);


  $.ajax({
    type: "POST",
    url: "/register",
    dataType: "json",
    contentType: false, 
    processData: false,
    data: formData,

    }).done(function (result) {
        console.log(result);
        alert('회원가입 성공')
        window.location.reload();
    }).fail(function (jqXHR) {
        console.log(jqXHR);
        $("#errorMsg").show();
    }).always(function () {
        console.log("실행되는지 확인");
      });
 
}
