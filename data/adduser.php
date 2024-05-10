<?php
// Kết nối đến cơ sở dữ liệu
require_once 'db_connection.php';

// Kiểm tra xem yêu cầu được gửi đi từ phương thức POST chưa
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Lấy dữ liệu từ yêu cầu POST
    $userData = json_decode(file_get_contents("php://input"), true);
    
    // Trích xuất dữ liệu từ mảng $userData
    $ho = mysqli_real_escape_string($conn, $userData['ho']);
    $ten = mysqli_real_escape_string($conn, $userData['ten']);
    $email = mysqli_real_escape_string($conn, $userData['email']);
    $username = mysqli_real_escape_string($conn, $userData['username']);
    $hashedPass = mysqli_real_escape_string($conn, $userData['pass']);
    $locker = "F";
    // Kiểm tra tên đăng nhập đã tồn tại chưa
    $sql_check_username = "SELECT * FROM users WHERE username='$username'";
    $result_check_username = $conn->query($sql_check_username);
    if ($result_check_username->num_rows > 0) {
        echo "Tên đăng nhập đã tồn tại!";
        exit();
    }

    // Kiểm tra email đã tồn tại chưa
    $sql_check_email = "SELECT * FROM users WHERE email='$email'";
    $result_check_email = $conn->query($sql_check_email);
    if ($result_check_email->num_rows > 0) {
        echo "Email đã tồn tại!";
        exit();
    }

    // Thêm tài khoản người dùng mới vào cơ sở dữ liệu
    $sql_insert_user = "INSERT INTO users (ho, ten, email, username, pass, locker) VALUES ('$ho', '$ten', '$email', '$username', '$hashedPass','$locker')";
    if ($conn->query($sql_insert_user) === TRUE) {
        echo "Tài khoản đã được tạo thành công!";
    } else {
        echo "Lỗi: " . $sql_insert_user . "<br>" . $conn->error;
    }
    // Đóng kết nối
    $conn->close();
} else {
    echo "Lỗi: Phương thức yêu cầu không hợp lệ!";
}
?>
