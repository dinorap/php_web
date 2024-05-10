<?php
// Include the database connection file
require_once 'db_connection.php';

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Decode the JSON data sent in the request body
    $userData = json_decode(file_get_contents("php://input"), true);
    $old_email = mysqli_real_escape_string($conn, $userData['old_email']);
    $user = $userData['user'];
    $ho = mysqli_real_escape_string($conn, $user['ho']);
    $ten = mysqli_real_escape_string($conn, $user['ten']);
    $email = mysqli_real_escape_string($conn, $user['email']);
    $username = mysqli_real_escape_string($conn, $user['username']);
    $locker =mysqli_real_escape_string($conn, $user['locker']); 
    // Update user information in the database
    $sql = "UPDATE users SET ho='$ho', ten='$ten', username='$username', email='$email',locker='$locker' WHERE email='$old_email'";
    if ($conn->query($sql) === TRUE) {
        echo "Dữ liệu đã được cập nhật thành công!";
    } else {
        echo "Lỗi: " . $sql . "<br>" . $conn->error;
    }
} else {
    echo "Lỗi: Phương thức yêu cầu không hợp lệ!";
}
?>
