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
        // Get the item ID from the request body
        $data = json_decode(file_get_contents("php://input"), true);
        $item_name = $data["new_name"];

        // Prepare SQL statement to delete the item record
        $sql = "DELETE FROM Inventory WHERE ItemName = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $item_name);
        
        // Execute the statement
        if ($stmt->execute()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false]);
        }
        break;
}
?>
