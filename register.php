<?php
require_once "dbconnector.php";

$_POST = json_decode(file_get_contents('php://input'), true);

if(isset($_POST['username']) && isset($_POST['password']) && 
   isset($_POST['email']))
{
    $username = $_POST['username'];
    $password = password_hash($_POST['password']);
    $email = $_POST['email'];

    $result = ["register" => "true"];

    // Check if username is taken.
    $sql = 'SELECT username FROM users WHERE username=?';
    $statement = $pdo->prepare($sql);
    $statement->execute([$username]);
    if($statement->rowCount() > 0)
    {
        header('Content-Type: application/json');
        echo json_encode('username taken.');
        exit;
    }

    // Check if email is already used.
    $sql = 'SELECT email FROM users WHERE email=?';
    $statement = $pdo->prepare($sql);
    $statement->execute([$email]);
    if($statement->rowCount() > 0)
    {
        header('Content-Type: application/json');
        echo json_encode('email already used.');
        exit;
    }

    // Adding user.
    $sql = 'INSERT INTO users VALUES (NULL, ?, ?, ?)';
    $statement = $pdo->prepare($sql);
    $statement->execute([$username, $password, $email]);

    header('Content-Type: application/json');
    echo json_encode('Successful sign up.');
}
