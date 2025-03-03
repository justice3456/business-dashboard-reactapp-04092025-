<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:*');

include "./DbConnect.php";
$db = new DbConnect;
$conn = $db->connect();

$method = $_SERVER["REQUEST_METHOD"];

switch ($method) {
    case "POST":
        $user_value = json_decode(file_get_contents("php://input"));
        $hashed_password = password_hash($user_value->password, PASSWORD_DEFAULT);

        $sql = "INSERT INTO Users(Email , User_Password, Firstname, Lastname) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);

        // Check if the statement was prepared successfully
        if (!$stmt) {
            die("Error: " . $conn->error);
        }

        // Bind parameters to the statement
        $stmt->bind_param('ssss', $user_value->email, $hashed_password, $user_value->fname, $user_value->lname);

        if ($user_value->password == $user_value->password) {
            if ($stmt->execute()) {
                $response = 1;
            } else {
                $response = 0;
            }
        } else {
            $response = 2;
        }
        echo $response;

        // Close the statement
        $stmt->close();
        // Close the connection
        $conn->close();

        break;
}