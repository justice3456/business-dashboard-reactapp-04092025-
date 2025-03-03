<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:*');

session_start();

include "./DbConnect.php";
$db = new DbConnect;
$conn = $db->connect();

$sql = "SELECT
            DATE(s.DateOfSale) AS sale_date,
            SUM(s.TotalAmount * i.SellingPrice) AS total_sales
        FROM
            Sales s
        JOIN
            Inventory i ON s.ItemID = i.ItemID
        WHERE
            s.DateOfSale >= CURDATE() - INTERVAL 6 DAY AND
            s.DateOfSale <= CURDATE()
        GROUP BY
            DATE(s.DateOfSale)
        ORDER BY
            DATE(s.DateOfSale);";

$stmt = $conn->prepare($sql);
$stmt->execute();

$total_sales_result = $stmt->get_result();

$response = array();
while ($row = $total_sales_result->fetch_assoc()) {
    $response[] = $row;
}

echo json_encode($response);
exit();
?>
