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

$sql_today = "SELECT SUM(Sales.TotalAmount * Inventory.SellingPrice) AS todays_sales
FROM Sales
JOIN Inventory ON Sales.ItemID = Inventory.ItemID
WHERE DATE(Sales.DateOfSale) = CURDATE();
";

$stmt = $conn->prepare($sql_today);
$stmt->execute();

$total_sales_result = $stmt->get_result();

$total_sales_row = $total_sales_result->fetch_assoc();

$todays_sales = $total_sales_row["todays_sales"];

$user_id = $_GET['user_id'];

/** Sales target */
$sql_target = "SELECT Target_Value FROM Sale_Target WHERE UserID = $user_id";

$stmt = $conn->prepare($sql_target);
$stmt->execute();

$target_sales_result = $stmt->get_result();


if ($target_sales_result->num_rows > 0) {

    $target_sales_row = $target_sales_result->fetch_assoc();
    $target_sales = $target_sales_row["Target_Value"];

}

$progress = $todays_sales/$target_sales * 100;
$progress = round($progress, 2);

$circle_percentage = round(250-($progress * 249), 1);

$response = array($progress, $circle_percentage);

echo json_encode($response);
exit();
