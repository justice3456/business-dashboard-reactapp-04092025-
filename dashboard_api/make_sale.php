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

        // Getting inputs
        $customer_name = $user_value['customerName'];
        $item_name = $user_value['inventoryName'];
        $quantity_sold = $user_value['quantity']; // Corrected typo
        $user_id = $user_value['user_id'];

        // Prepare SQL statement to select customer ID
        $sql_customer_id = "SELECT CustomerID FROM Customers WHERE Customer_Name = ?";
        $stmt_customer = $conn->prepare($sql_customer_id);
        $stmt_customer->bind_param("s", $customer_name);
        $stmt_customer->execute();
        $result_customer = $stmt_customer->get_result();

        if ($result_customer->num_rows > 0) {
            $customer = $result_customer->fetch_assoc();
            $customer_id = $customer['CustomerID'];
        } else {
            $response = array(0, $customer_name); // No customer found
        }



        $stmt_customer->close();

        // Prepare SQL statement to select item ID and quantity
        $sql_inventory_id = "SELECT ItemID, Quantity FROM Inventory WHERE ItemName = ?";
        $stmt_inventory = $conn->prepare($sql_inventory_id);
        $stmt_inventory->bind_param("s", $item_name);
        $stmt_inventory->execute();
        $result_inventory = $stmt_inventory->get_result();

        if ($result_inventory->num_rows > 0) {
            $item = $result_inventory->fetch_assoc();
            $item_id = $item['ItemID'];
            $item_quantity = $item['Quantity'];
        } else {
            $response = array(1, $item_name); // No item found
        }

        $stmt_inventory->close();

        // Check if both customer and item are found
        if (!isset($response)) {
            if ($item_quantity <= 0) {
                $response = 2; // Item is unavailable
            } elseif ($item_quantity - $quantity_sold < 0) {
                $response = array(3, $item_quantity, $item_name); // Insufficient quantity
            } else {
                // Update item quantity
                $new_quantity = $item_quantity - $quantity_sold;
                $sql_update_inventory = "UPDATE Inventory SET Quantity = ? WHERE ItemID = ?";
                $stmt_update_inventory = $conn->prepare($sql_update_inventory);
                $stmt_update_inventory->bind_param("ii", $new_quantity, $item_id);

                if ($stmt_update_inventory->execute()) {
                    // Record sale
                    $date_of_sale = date('Y-m-d');
                    $sql_record_sale = "INSERT INTO Sales (CustomerID, ItemID, DateOfSale, TotalAmount, UserID) VALUES (?, ?, ?, ?,?)";
                    $stmt_record_sale = $conn->prepare($sql_record_sale);
                    $stmt_record_sale->bind_param("iisii", $customer_id, $item_id, $date_of_sale, $quantity_sold, $user_id);
                    if ($stmt_record_sale->execute()) {
                        $response = 4; // Sale recorded successfully
                    } else {
                        $response = -1; // Error recording sale
                    }
                } else {
                    $response = -2; // Error updating inventory
                }

                //Updating cutomer total purchases
                $idToUpdate = 123; 
                $sql = "UPDATE Customers SET TotalPurchases = ? WHERE Customer_Name =  ? ";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("is", $quantity_sold, $customer_name);
                $stmt->execute();
                $stmt_update_inventory->close();
            }
        }

        echo json_encode($response); // Output the response
        break;
}
