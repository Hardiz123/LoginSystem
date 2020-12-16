function check() {
    var firstpassword = document.getElementById('user1').value;
    var secondpassword = document.getElementById('user2').value;
    if(checkname()== false){
        return;
    }
    if(password1()==false){
        return
    }
    if(password2()==false){
        return
    }
    if(email()==false){
        reutrn;
    }
    else{
        if(validateEmail()==false){
            alert("Enter a valid email"); 
        }
    }
    if(firstpassword==secondpassword){
        return true;
    }
    else{
        alert("Password must be same!");
        return false
    }
}
function checkname() {
    var x = document.getElementById('uname').value;
    if (x == "") {
      alert("Name must be filled out");
      return false;
    }
  }
  function password1() {
    var x = document.getElementById('user1').value;
    if (x == "") {
      alert("password must be filled out");
      return false;
    }
  }

  function password2() {
    var x = document.getElementById('user2').value;
    if (x == "") {
      alert("Password must be filled out");
      return false;
    }
  }

  function email() {
    var x = document.getElementById('email').value;
    if (x == "") {
      alert("Email must be filled out");
      return false;
    }
  }

  function validateEmail() {
    var email = document.getElementById('email').value;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}