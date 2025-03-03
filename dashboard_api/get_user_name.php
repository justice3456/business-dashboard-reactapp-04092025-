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
        // Get user ID from the request body
        $user_id = $_POST['user_id'];

        // SQL statement to select username based on user ID
        $sql = "SELECT Username FROM Users WHERE UserID = ?";
        
        // Prepare the SQL statement
        $stmt = $conn->prepare($sql);
        
        // Check for errors in preparation
        if (!$stmt) {
            die("Error: " . $conn->error);
        }
        
        // Bind user ID parameter to the statement
        $stmt->bind_param("i", $user_id);
        
        // Execute the statement
        $stmt->execute();
        
        // Bind the result variables
        $stmt->bind_result($username);
        
        // Fetch the result
        $stmt->fetch();
        
        // Close the statement
        $stmt->close();

        // Return the username in the response
        echo json_encode(["user_name" => $username]);
        break;
}
?>
