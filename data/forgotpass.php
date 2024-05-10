<?php
// Include the database connection file
require_once 'db_connection.php';

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Decode the JSON data sent in the request body
    $userData = json_decode(file_get_contents("php://input"), true);
    $email = mysqli_real_escape_string($conn, $userData['email']);
    $hashedPass = mysqli_real_escape_string($conn, $userData['pass']);
    
    // Update the password in the database
    $sql = "UPDATE users SET pass='$hashedPass' WHERE email='$email'";
    if ($conn->query($sql) === TRUE) {
        echo "Dữ liệu đã được cập nhật thành công!";
    } else {
        echo "Lỗi: " . $sql . "<br>" . $conn->error;
    }
} else {
    echo "Lỗi: Phương thức yêu cầu không hợp lệ!";
}
?>
