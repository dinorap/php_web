<?php
// Thông tin kết nối đến cơ sở dữ liệu
require_once 'db_connection.php';

// Kiểm tra xem dữ liệu đã được gửi đi từ yêu cầu POST chưa
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Lấy dữ liệu sản phẩm từ yêu cầu POST
    $requestData = json_decode(file_get_contents("php://input"), true);
    $madon = mysqli_real_escape_string($conn, $requestData['madon']);
    $soluong = mysqli_real_escape_string($conn, $requestData['soluong']);
    $user_id = mysqli_real_escape_string($conn, $requestData['user_id']);
    // Nếu số lượng sản phẩm được gửi đi là số nguyên dương
    if ($soluong > 0) {
        // Thực hiện cập nhật số lượng sản phẩm
        $sql_update_quantity = "UPDATE cart_items SET soluong = '$soluong' WHERE madon='$madon' AND user_id='$user_id'";
        if ($conn->query($sql_update_quantity) === TRUE) {
            echo "Đã cập nhật số lượng sản phẩm thành công!";
        } else {
            echo "Lỗi: " . $conn->error;
        }
    } else {
        echo "Lỗi: Số lượng sản phẩm không hợp lệ!";
    }
} else {
    echo "Lỗi: Phương thức yêu cầu không hợp lệ!";
}

// Đóng kết nối
$conn->close();
?>
