<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:*');

session_start();

include "./DbConnect.php";
$db = new DbConnect;
$conn = $db->connect();
$current_date = date('Y-m-d');

$user_id = $_GET['user_id'];

$sql = "SELECT SUM(Sales.TotalAmount * Inventory.SellingPrice) AS todays_sales
        FROM Sales
        JOIN Inventory ON Sales.ItemID = Inventory.ItemID
        WHERE DATE(Sales.DateOfSale) = CURDATE() AND Sales.UserID = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id); // Bind the user ID parameter
$stmt->execute();

$total_sales_result = $stmt->get_result();

// Check if there are rows in the result
if ($total_sales_result->num_rows > 0) {
    // Fetch the associative array representing the row
    $total_sales_row = $total_sales_result->fetch_assoc();
    // Extract the total_sales value from the row
    $total_sales = $total_sales_row["todays_sales"];
} else {
    $total_sales = 0; // If no sales found, set total sales to 0
}

$response = ["todays_sales" => $total_sales];

echo json_encode($response);
exit();
?>
