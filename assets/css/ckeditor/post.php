<?php require_once('Connections/C1.php'); ?>
<?php
//initialize the session
if (!isset($_SESSION)) {
  session_start();
}

// ** Logout the current user. **
$logoutAction = $_SERVER['PHP_SELF']."?doLogout=true";
if ((isset($_SERVER['QUERY_STRING'])) && ($_SERVER['QUERY_STRING'] != "")){
  $logoutAction .="&". htmlentities($_SERVER['QUERY_STRING']);
}

if ((isset($_GET['doLogout'])) &&($_GET['doLogout']=="true")){
  //to fully log out a visitor we need to clear the session varialbles
  $_SESSION['MM_Username'] = NULL;
  $_SESSION['MM_UserGroup'] = NULL;
  $_SESSION['PrevUrl'] = NULL;
  unset($_SESSION['MM_Username']);
  unset($_SESSION['MM_UserGroup']);
  unset($_SESSION['PrevUrl']);
	
  $logoutGoTo = "login.php?logout=true";
  if ($logoutGoTo) {
    header("Location: $logoutGoTo");
    exit;
  }
}
?>
<?php
if (!isset($_SESSION)) {
  session_start();
}
$MM_authorizedUsers = "";
$MM_donotCheckaccess = "true";

// *** Restrict Access To Page: Grant or deny access to this page
function isAuthorized($strUsers, $strGroups, $UserName, $UserGroup) { 
  // For security, start by assuming the visitor is NOT authorized. 
  $isValid = False; 

  // When a visitor has logged into this site, the Session variable MM_Username set equal to their username. 
  // Therefore, we know that a user is NOT logged in if that Session variable is blank. 
  if (!empty($UserName)) { 
    // Besides being logged in, you may restrict access to only certain users based on an ID established when they login. 
    // Parse the strings into arrays. 
    $arrUsers = Explode(",", $strUsers); 
    $arrGroups = Explode(",", $strGroups); 
    if (in_array($UserName, $arrUsers)) { 
      $isValid = true; 
    } 
    // Or, you may restrict access to only certain users based on their username. 
    if (in_array($UserGroup, $arrGroups)) { 
      $isValid = true; 
    } 
    if (($strUsers == "") && true) { 
      $isValid = true; 
    } 
  } 
  return $isValid; 
}

$MM_restrictGoTo = "login.php";
if (!((isset($_SESSION['MM_Username'])) && (isAuthorized("",$MM_authorizedUsers, $_SESSION['MM_Username'], $_SESSION['MM_UserGroup'])))) {   
  $MM_qsChar = "?";
  $MM_referrer = $_SERVER['PHP_SELF'];
  if (strpos($MM_restrictGoTo, "?")) $MM_qsChar = "&";
  if (isset($_SERVER['QUERY_STRING']) && strlen($_SERVER['QUERY_STRING']) > 0) 
  $MM_referrer .= "?" . $_SERVER['QUERY_STRING'];
  $MM_restrictGoTo = $MM_restrictGoTo. $MM_qsChar . "accesscheck=" . urlencode($MM_referrer);
  header("Location: ". $MM_restrictGoTo); 
  exit;
}
?>
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

$editFormAction = $_SERVER['PHP_SELF'];
if (isset($_SERVER['QUERY_STRING'])) {
  $editFormAction .= "?" . htmlentities($_SERVER['QUERY_STRING']);
}

if ((isset($_POST["MM_insert"])) && ($_POST["MM_insert"] == "form1")) {
  $insertSQL = sprintf("INSERT INTO news (judul, kategori, isi, id_admin) VALUES (%s, %s, %s, %s)",
                       GetSQLValueString($_POST['judul'], "text"),
                       GetSQLValueString($_POST['kategori'], "text"),
                       GetSQLValueString($_POST['isi'], "text"),
                       GetSQLValueString($_POST['id_admin'], "int"));

  mysql_select_db($database_C1, $C1);
  $Result1 = mysql_query($insertSQL, $C1) or die(mysql_error());

  $insertGoTo = "post.php?post=sukses";
  if (isset($_SERVER['QUERY_STRING'])) {
    $insertGoTo .= (strpos($insertGoTo, '?')) ? "&" : "?";
    $insertGoTo .= $_SERVER['QUERY_STRING'];
  }
  header(sprintf("Location: %s", $insertGoTo));
}

$colname_rsSession = "-1";
if (isset($_SESSION['MM_Username'])) {
  $colname_rsSession = $_SESSION['MM_Username'];
}
mysql_select_db($database_C1, $C1);
$query_rsSession = sprintf("SELECT * FROM users WHERE username = %s", GetSQLValueString($colname_rsSession, "text"));
$rsSession = mysql_query($query_rsSession, $C1) or die(mysql_error());
$row_rsSession = mysql_fetch_assoc($rsSession);
$totalRows_rsSession = mysql_num_rows($rsSession);
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
.admin {
	color: #C00;
	font-weight: bold;
}
</style>
<script type="text/javascript" src="ckeditor.js"></script>
</head>

<body>
<div class="container">
  <p>Hai <span class="admin"><?php echo $row_rsSession['nama']; ?></span>, welcome to admin page | <a href="<?php echo $logoutAction ?>">Log Out</a></p>
  <h2>Add News</h2>
  <?php if(isset($_GET['post'])) { ?>
  <p class="admin">News has been posted successfully</p>
  <?php } ?>
  <form name="form1" method="POST" action="<?php echo $editFormAction; ?>">
    <p>
      <label for="judul">News title:</label>
      <input name="judul" type="text" id="judul" size="70">
    </p>
    <p>
      <label for="kategori">News category:</label>
      <input name="kategori" type="text" id="kategori" size="70">
    </p>
    <p>
      <label for="isi">News content:</label>
      <textarea name="isi" id="isi" cols="90" rows="15"></textarea>
       <script type="text/javascript">
			//<![CDATA[

				CKEDITOR.replace( 'isi',
					{
						fullPage : true,
						extraPlugins : 'docprops'
					});

			//]]>
			</script>
    </p>
    <p>
      <input type="hidden" name="id_admin" id="id_admin">
      <input type="submit" name="submit" id="submit" value="Submit">
      <input type="reset" name="submit2" id="submit2" value="Reset">
    </p>
    <input type="hidden" name="MM_insert" value="form1">
  </form>
</div>
</body>
</html>
<?php
mysql_free_result($rsSession);
?>
