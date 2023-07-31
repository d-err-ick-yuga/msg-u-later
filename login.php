<?php
// ini_set('display_errors', 'on');
// error_reporting(E_ALL);

require_once 'dbconnector.php';

$_POST = json_decode(file_get_contents('php://input'), true);

$username = $_POST['username'];
$password = $_POST['password'];

$sql = 'SELECT username, password FROM users WHERE username=?';
$statement = $pdo->prepare($sql);
$statement->execute([$username]);

$row = $statement->fetch();

if($row) 
{
    $loginStatus = password_verify($password, $row['password']);
    if($loginStatus) 
    {
        session_start();
        $_SESSION['user'] = $username;

        echo json_encode(true); 
    }
    else 
    {
        echo json_decode(false);
    }
}
else
{
    echo json_encode(false);
}
