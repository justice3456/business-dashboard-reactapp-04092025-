<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:*');

session_start();

include "./DbConnect.php";
$db = new DbConnect;
$conn = $db->connect();
$user_id = $_GET["user_id"];
$sql = "SELECT SUM(Quantity) AS total_quantity 
FROM Inventory 
WHERE UserID = $user_id;
";

$stmt = $conn->prepare($sql);
$stmt->execute();

$total_sales_result = $stmt->get_result();

// Check if there are rows in the result

// Fetch the associative array representing the row
$total_sales_row = $total_sales_result->fetch_assoc();
// Extract the total_sales value from the row
$total_sales = $total_sales_row["total_quantity"];



$response = ["total_quantity" => $total_sales];

echo json_encode($response);
exit();
