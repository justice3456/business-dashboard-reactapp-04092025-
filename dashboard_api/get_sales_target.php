<?php
// Error reporting and headers
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
session_start();

// Database connection
include "./DbConnect.php";
$db = new DbConnect;
$conn = $db->connect();

// Get user ID from query parameters
$user_id = $_GET['user_id'];

// SQL query to fetch target sales for the user
$sql = "SELECT Target_Value FROM Sale_Target WHERE UserID = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$target_sales_result = $stmt->get_result();

// Fetch and return target sales if available
if ($target_sales_result->num_rows > 0) {
    $target_sales_row = $target_sales_result->fetch_assoc();
    $target_sales = $target_sales_row["Target_Value"];
    $response = ["sales_target" => $target_sales];
} else {
    $response = ["sales_target" => 0];
}

// Output the response as JSON
echo json_encode($response);
?>
