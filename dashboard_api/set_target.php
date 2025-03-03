<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:*');

session_start();

include "./DbConnect.php";
$db = new DbConnect;
$conn = $db->connect();

$method = $_SERVER["REQUEST_METHOD"];

switch ($method) {
    case "POST":
        $user_value = json_decode(file_get_contents("php://input"), true);
        $user_id = $user_value['user_id'];
        $sale_target = $user_value['sale_target'];

        // Check if a record exists for the given UserID
        $check_sql = "SELECT UserID FROM Sale_Target WHERE UserID = ?";
        $check_stmt = $conn->prepare($check_sql);
        $check_stmt->bind_param("i", $user_id);
        $check_stmt->execute();
        $result = $check_stmt->get_result();

        // If a record exists, update it. Otherwise, insert a new record.
        if ($result->num_rows > 0) {
            $update_sql = "UPDATE Sale_Target SET Target_Value = ? WHERE UserID = ?";
            $update_stmt = $conn->prepare($update_sql);
            $update_stmt->bind_param("ii", $sale_target, $user_id);
            $result = $update_stmt->execute();
        } else {
            $insert_sql = "INSERT INTO Sale_Target (Target_Value, UserID) VALUES (?, ?)";
            $insert_stmt = $conn->prepare($insert_sql);
            $insert_stmt->bind_param("ii", $sale_target, $user_id);
            $result = $insert_stmt->execute();
        }

        // Send response based on execution result
        if ($result) {
            $response = 0; // Success
        } else {
            $response = 1; // Failure
        }

        echo json_encode($response);
        break;
}
?>
