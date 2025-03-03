<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:*');

session_start();

include "./DbConnect.php";
$db = new DbConnect;
$conn = $db->connect();

// Retrieve user ID from URL parameter
$user_id = $_GET['user_id'];

$sql = "SELECT * FROM Customers WHERE UserID = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();

// Initialize an array to store the fetched data
$data = array();

// Fetch each row and add it to the data array
$result = $stmt->get_result();
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

$response = $data;

// Encode the data array as JSON and output it
echo json_encode($response);
exit();
?>
