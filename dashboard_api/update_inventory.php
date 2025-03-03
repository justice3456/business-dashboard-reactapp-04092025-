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

        // $item_name = $user_value['itemName'];
        // $item_quantity = $user_value['quantity'];
        // $item_cost = $user_value['costprice'];
        // $item_selling = $user_value['sellingprice'];
        // $current_date =  date('Y-m-d');

        // $check_sql = "SELECT ItemName FROM Inventory WHERE ItemName = ?";
        // $check_stmt = $conn->prepare($check_sql);
        // $check_stmt->bind_param("s", $item_name); // Fix the parameter name here
        // $check_stmt->execute();
        // $check_stmt->store_result();

        // if ($check_stmt->num_rows > 0) {
        //     $response = array(2, $item_name); // Item already exists
        // } else {
        //     // SQL statement with placeholders
        //     $sql = "INSERT INTO Inventory (ItemName, Quantity, CostPrice, SellingPrice,DateAdded) VALUES (?,?,?,?,?)";

        //     // Prepare the SQL statement
        //     $stmt = $conn->prepare($sql);

        //     // Check for errors in preparation
        //     if (!$stmt) {
        //         die("Error: " . $conn->error);
        //     }

        //     // Bind parameters to the statement
        //     $stmt->bind_param("siiis", $item_name, $item_quantity, $item_cost, $item_selling,$current_date);

        //     // Execute the statement
        //     if ($stmt->execute()) {
        //         $response = array(0,$item_name);//successfully added
        //     } else {
        //         $response = 1; //failed to add
        //     }
        // }

        // echo  json_encode($response);
        // break;
}
?>
