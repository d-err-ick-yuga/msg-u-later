<?php

$_POST = json_decode(file_get_contents('php://input'), true);

if($_POST['signout'] == 'true')
{
    session_start();
    session_unset();
    session_destroy();
    session_write_close();
    setcookie(session_name(), '', 0, '/');
    session_regenerate_id(true);

    header('Content-Type: application/json');
    echo json_encode(true);
}
else
{
    header('Content-Type: application/json');
    echo json_encode(false);
}