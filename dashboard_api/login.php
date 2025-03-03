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

        $email = $user_value['email'];
        $unhashed_password = $user_value['password'];

        // Prepare statement to retrieve password hash, user ID, and Firstname
        $sql = "SELECT User_Password, UserID, Firstname FROM Users WHERE Email = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();

        // Check if user exists
        if ($stmt->num_rows > 0) {
            $stmt->bind_result($password_hash, $user_id, $firstname);
            $stmt->fetch();

            // Verify password
            if (password_verify($unhashed_password, $password_hash)) {
                $response = array(1, $user_id, $firstname);



                
            } else {
                $response = 0; // Passwords don't match
            }
        } else {
            $response = 0; // User not found
        }

        // Close statement
        $stmt->close();

        echo json_encode($response);
        break;
}

?>
