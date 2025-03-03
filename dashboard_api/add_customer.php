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
        // Fetch user ID from session


        $user_value = json_decode(file_get_contents("php://input"), true);

        $customer_name = $user_value['nameInput'];
        $customer_number = $user_value['numberInput'];
        $user_id = $user_value['user_id'];

        $check_sql = "SELECT Customer_Name FROM Customers WHERE Customer_Name = ?";
        $check_stmt = $conn->prepare($check_sql);
        $check_stmt->bind_param("s", $customer_name);
        $check_stmt->execute();
        $check_stmt->store_result();

        if ($check_stmt->num_rows > 0) {
            $response = 2;
        } else {
            // SQL statement with placeholders
            $sql = "INSERT INTO Customers (Customer_Name, PhoneNumber, UserID) VALUES (?, ?, ?)";

            // Prepare the SQL statement
            $stmt = $conn->prepare($sql);

            // Check for errors in preparation
            if (!$stmt) {
                die("Error: " . $conn->error);
            }

            // Bind parameters to the statement
            $stmt->bind_param("ssi", $customer_name, $customer_number, $user_id);

            // Execute the statement
            if ($stmt->execute()) {
                $response = 0;
            } else {
                $response = 1;
            }
        }

        echo ($response);
        break;
}
?>
