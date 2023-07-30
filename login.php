<?php
require_once 'dbconnector.php';

$_POST = json_decode(file_get_contents('php://input'), true);

if(isset($_POST['username']) && isset($_POST['password']))
{
    $username = $_POST['username'];
    $password = $_POST['password'];

    $result = ["login" => "true"];

    $sql = 'SELECT * FROM users WHERE username=? AND password=?';
    $statement = $pdo->prepare($sql);
    $statement->execute([$username, $password]);

    $postCount = $statement->rowCount();
    if($postCount > 0) 
    {
        header('Content-Type: application/json');
        $response = true;
        echo json_encode($response);
    }
    else 
    {
        header('Content-Type: application/json');
        $response = false;
        echo json_encode($response);
    }
}
