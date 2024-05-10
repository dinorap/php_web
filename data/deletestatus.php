<?php
// Thông tin kết nối đến cơ sở dữ liệu
require_once 'db_connection.php';

// Kiểm tra xem dữ liệu đã được gửi đi từ yêu cầu POST chưa
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Lấy mã đơn hàng từ yêu cầu POST
    $requestData = json_decode(file_get_contents("php://input"), true);
    $madon = mysqli_real_escape_string($conn, $requestData['madon']);

    // Tạo truy vấn SQL để lấy ID của đơn hàng có madon = $madon
    $sql_get_order_id = "SELECT id FROM orders WHERE madon = '$madon'";
    $result_order_id = $conn->query($sql_get_order_id);
    if ($result_order_id->num_rows > 0) {
        $row = $result_order_id->fetch_assoc();
        $order_id = $row['id'];

        // Tạo truy vấn SQL để xóa dữ liệu sản phẩm từ bảng order_items
        $sql_delete_items = "DELETE FROM order_items WHERE order_id = '$order_id'";
        
        // Thực thi truy vấn SQL và kiểm tra kết quả
        if ($conn->query($sql_delete_items) === TRUE) {
            // Nếu xóa sản phẩm thành công, tiến hành xóa đơn hàng
            $sql_delete_order = "DELETE FROM orders WHERE madon = '$madon'";
            if ($conn->query($sql_delete_order) === TRUE) {
                echo "Dữ liệu đã được xóa thành công!";
            } else {
                echo "Lỗi khi xóa đơn hàng: " . $conn->error;
            }
        } else {
            echo "Lỗi khi xóa sản phẩm: " . $conn->error;
        }
    } else {
        echo "Không tìm thấy đơn hàng có mã: $madon";
    }
} else {
    echo "Lỗi: Phương thức yêu cầu không hợp lệ!";
}

// Đóng kết nối
$conn->close();
?>
