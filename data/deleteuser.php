<?php
// Thông tin kết nối đến cơ sở dữ liệu
require_once 'db_connection.php';

// Kiểm tra xem dữ liệu đã được gửi đi từ yêu cầu POST chưa
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Lấy mã sản phẩm từ yêu cầu POST
    $requestData = json_decode(file_get_contents("php://input"), true);
    $username = mysqli_real_escape_string($conn, $requestData['taikhoan']);
    
    // Tạo truy vấn SQL để xóa dữ liệu sản phẩm từ cơ sở dữ liệu
    $sql = "DELETE FROM users WHERE username = '$username'";

    // Thực thi truy vấn SQL và kiểm tra kết quả
    if ($conn->query($sql) === TRUE) {
        echo "Dữ liệu đã được xóa thành công!";
    } else {
        echo "Lỗi: " . $sql . "<br>" . $conn->error;
    }
} else {
    echo "Lỗi: Phương thức yêu cầu không hợp lệ!";
}

// Đóng kết nối
$conn->close();

?>
