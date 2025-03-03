// dashboard_api/delete_sale.php

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
        // Get the sale ID from the request body
        $sale_id = json_decode(file_get_contents("php://input"), true)['sale_id'];

        // Prepare SQL statement to delete the sale record
        $sql = "DELETE FROM Sales WHERE SaleID = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $sale_id);
        
        // Execute the statement
        if ($stmt->execute()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false]);
        }
        break;
}
?>
