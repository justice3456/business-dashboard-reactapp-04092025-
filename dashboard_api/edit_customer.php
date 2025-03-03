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
        // Get the customer ID and updated data from the request body
        $data = json_decode(file_get_contents("php://input"), true);
        $customer_id = $data["customer_id"];
        $customer_name = $data["customer_name"];
        $phone_number = $data["phone_number"];
        $total_purchases = $data["total_purchases"];

        // Prepare SQL statement to update the customer record
        $sql = "UPDATE Customers SET Customer_Name = ?, PhoneNumber = ?, TotalPurchases = ? WHERE CustomerID = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssii", $customer_name, $phone_number, $total_purchases, $customer_id);
        
        // Execute the statement
        if ($stmt->execute()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false]);
        }
        break;
}
?>
