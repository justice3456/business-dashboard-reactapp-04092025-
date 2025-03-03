<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:*');

session_start();

include "./DbConnect.php";
$db = new DbConnect;
$conn = $db->connect();

// Calculate the date 7 days ago
$sevenDaysAgo = date('Y-m-d', strtotime('-7 days'));

// Retrieve user_id from GET parameter
$user_id = $_GET['user_id'];

// Prepare the SQL query to retrieve sales data along with profit for the last 7 days
$sql = "SELECT SUM(Sales.TotalAmount * Inventory.SellingPrice - Sales.TotalAmount * Inventory.CostPrice) AS TotalProfit
        FROM Sales
        JOIN Inventory ON Sales.ItemID = Inventory.ItemID
        WHERE Sales.DateOfSale >= ? AND Sales.UserID = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $sevenDaysAgo, $user_id);
$stmt->execute();

// Fetch the total profit
$result = $stmt->get_result();

// Check if there is a result
if ($result->num_rows > 0) {
    $totalProfit = $result->fetch_assoc()["TotalProfit"];
    $response = ["total_profit" => $totalProfit];
} else {
    $response = ["total_profit" => 'No Sales'];
}

// Encode the data array as JSON and output it
echo json_encode($response);
exit();
?>
