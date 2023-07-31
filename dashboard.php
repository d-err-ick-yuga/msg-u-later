<?php
session_start();

if(isset($_SESSION['user']))
{
    $user = $_SESSION['user'];
    echo "Successful login or register page, $user";
    echo "<a href='http://localhost:80/msg-u-later/index.php'>Home page</a>";
}
else {
    header('Location: index.php');
}
?>