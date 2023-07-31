<?php
require_once "dbconnector.php";

$_POST = json_decode(file_get_contents('php://input'), true);

if(isset($_POST['username']) && isset($_POST['password']) && 
   isset($_POST['email']))
{
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $email = $_POST['email'];
    //
    // Check if username is taken.
    $sql = 'SELECT username FROM users WHERE username=?';
    $statement = $pdo->prepare($sql);
    $statement->execute([$username]);
    $row = $statement->fetch();

    if($row)
    {
        header('Content-Type: application/json');
        $result = ["message" => "username taken"];
        echo json_encode($result);
        exit;
    }

    // Check if email is already used.
    $sql = 'SELECT email FROM users WHERE email=?';
    $statement = $pdo->prepare($sql);
    $statement->execute([$email]);
    $row = $statement->fetch();

    if($row)
    {
        header('Content-Type: application/json');
        $result = ["message" => "email already used"];
        echo json_encode($result);
        exit;
    }

    // Adding user.
    $sql = 'INSERT INTO users VALUES (NULL, ?, ?, ?)';
    $statement = $pdo->prepare($sql);
    $statement->execute([$username, $password, $email]);

    session_start();
    $_SESSION['user'] = $username;

    header('Content-Type: application/json');
    $result = ["message" => "true"];
    echo json_encode($result);
}
else {
    header('Content-Type: application/json');
    $result = ['message' => 'wrong request'];
    echo json_encode($result);
}