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
        // Get the item data from the request body
        $data = json_decode(file_get_contents("php://input"), true);
        $itemName = $data["itemName"]; 
        $quantity = $data["quantity"]; 
        $sellingPrice = $data["price"]; // Corrected variable name from $data["price"]["value"]
        $oldName = $data["itemNamePlaceholder"]; // Corrected accessing itemNamePlaceholder

        // Prepare SQL statement to update the item record
        $sql = "UPDATE Inventory SET Quantity = ?, SellingPrice = ?, ItemName = ? WHERE ItemName = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ddss", $quantity, $sellingPrice, $itemName, $oldName); // Corrected $price to $sellingPrice
        
        // Execute the statement
        if ($stmt->execute()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false]);
        }
        break;
}
?>
