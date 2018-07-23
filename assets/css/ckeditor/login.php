<?php require_once('Connections/C1.php'); ?>
<?php
if (!function_exists("GetSQLValueString")) {
function GetSQLValueString($theValue, $theType, $theDefinedValue = "", $theNotDefinedValue = "") 
{
  if (PHP_VERSION < 6) {
    $theValue = get_magic_quotes_gpc() ? stripslashes($theValue) : $theValue;
  }

  $theValue = function_exists("mysql_real_escape_string") ? mysql_real_escape_string($theValue) : mysql_escape_string($theValue);

  switch ($theType) {
    case "text":
      $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
      break;    
    case "long":
    case "int":
      $theValue = ($theValue != "") ? intval($theValue) : "NULL";
      break;
    case "double":
      $theValue = ($theValue != "") ? doubleval($theValue) : "NULL";
      break;
    case "date":
      $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
      break;
    case "defined":
      $theValue = ($theValue != "") ? $theDefinedValue : $theNotDefinedValue;
      break;
  }
  return $theValue;
}
}
?>
<?php
// *** Validate request to login to this site.
if (!isset($_SESSION)) {
  session_start();
}

$loginFormAction = $_SERVER['PHP_SELF'];
if (isset($_GET['accesscheck'])) {
  $_SESSION['PrevUrl'] = $_GET['accesscheck'];
}

if (isset($_POST['username'])) {
  $loginUsername=$_POST['username'];
  $password=sha1($_POST['password']);
  $MM_fldUserAuthorization = "";
  $MM_redirectLoginSuccess = "post.php";
  $MM_redirectLoginFailed = "login.php?login=false";
  $MM_redirecttoReferrer = true;
  mysql_select_db($database_C1, $C1);
  
  $LoginRS__query=sprintf("SELECT username, password FROM users WHERE username=%s AND password=%s",
    GetSQLValueString($loginUsername, "text"), GetSQLValueString($password, "text")); 
   
  $LoginRS = mysql_query($LoginRS__query, $C1) or die(mysql_error());
  $loginFoundUser = mysql_num_rows($LoginRS);
  if ($loginFoundUser) {
     $loginStrGroup = "";
    
	if (PHP_VERSION >= 5.1) {session_regenerate_id(true);} else {session_regenerate_id();}
	 //Declare session for CKEDITOR and KCFINDER
	$_SESSION['KCFINDER']=array();
	$_SESSION['KCFINDER']['disabled'] = false;
	$_SESSION['KCFINDER']['uploadURL'] = "/upload";
	$_SESSION['KCFINDER']['uploadDir'] = "";
    //declare two session variables and assign them
    $_SESSION['MM_Username'] = $loginUsername;
    $_SESSION['MM_UserGroup'] = $loginStrGroup;	      

    if (isset($_SESSION['PrevUrl']) && true) {
      $MM_redirectLoginSuccess = $_SESSION['PrevUrl'];	
    }
    header("Location: " . $MM_redirectLoginSuccess );
  }
  else {
    header("Location: ". $MM_redirectLoginFailed );
  }
}
?>
<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<title>Java Web Media</title>
<style type="text/css">
body {
	background-color: #333;
}
.container {
	font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
	background-color: #FFF;
	margin: auto;
	padding: 20px;
	height: auto;
	width: 80%;
	border: 10px outset #900;
	border-radius: 5px;
}
label {
	font-weight: bold;
	display: block;
}
input, select, textarea {
	padding-top: 5px;
	padding-right: 10px;
	padding-bottom: 5px;
	padding-left: 10px;
}
form {
	background-color: #CFC;
	padding: 20px;
	border: thin solid #D40000;
	border-radius: 5px;
}
h2 {
	padding-bottom: 5px;
	border-bottom: #F90 thin solid;
	color: #F60;
}
table {
	background-color: #fff;
	width:100%;
	border-collapse:collapse;
}
table,  td,  th {
	font-size:1em;
	border:1px solid #98bf21;
	padding:3px 7px 2px 7px;
	vertical-align: top;
	text-align: left;
}
th {
	font-size:1.2em;
	padding-top:5px;
	padding-bottom:4px;
	background-color:#A7C942;
	color:#fff;
}
tr, td  {
	color:#000;
	background-color:#EAF2D3;
}
.sukses {
	color: #C00;
	border: solid thin #F00;
	padding: 5px 10px;
	background-color: #FFC;
	border-radius: 3px;
}
</style>
</head>

<body>
<div class="container">
  <h2>Login Page</h2>
  <?php if(isset($_GET['login']) && ($_GET['login']==false)) { ?>
  <p class="sukses">Oopss..., username and password are not valid. Please try again.</p>
  <?php } ?>
  <?php if(isset($_GET['logout']) && ($_GET['logout']==true)) { ?>
  <p class="sukses">You have been logged out successfully</p>
  <?php } ?>
  <form name="form1" method="POST" action="<?php echo $loginFormAction; ?>">
    <p>
      <label for="username">Username:</label>
      <input type="text" name="username" id="username">
    </p>
    <p>
      <label for="password">Password:</label>
      <input type="password" name="password" id="password">
    </p>
    <p>
      <input type="submit" name="submit" id="submit" value="Submit">
      <input type="reset" name="submit2" id="submit2" value="Reset">
    </p>
  </form>
</div>
</body>
</html>