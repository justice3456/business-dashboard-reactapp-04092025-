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
        $data = json_decode(file_get_contents("php://input"), true);
        $sale_id = $data["sale_id"]; // Corrected variable name

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
