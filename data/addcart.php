<?php
// Thông tin kết nối đến cơ sở dữ liệu
require_once 'db_connection.php';

// Kiểm tra xem dữ liệu đã được gửi đi từ yêu cầu POST chưa
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Lấy dữ liệu sản phẩm từ yêu cầu POST
    $requestData = json_decode(file_get_contents("php://input"), true);
    $ma = mysqli_real_escape_string($conn, $requestData['ma']);
    $mausac = mysqli_real_escape_string($conn, $requestData['mausac']);
    $rom = mysqli_real_escape_string($conn, $requestData['rom']);
    $user_id = mysqli_real_escape_string($conn, $requestData['user_id']);
    
    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng của người dùng chưa
    $sql_check_product = "SELECT * FROM cart_items WHERE ma='$ma' AND mausac='$mausac' AND rom='$rom' AND user_id='$user_id'";
    $result_check_product = $conn->query($sql_check_product);
    if ($result_check_product->num_rows > 0) {
        // Nếu sản phẩm đã tồn tại, thực hiện cập nhật số lượng sản phẩm
        $sql_update_quantity = "UPDATE cart_items SET soluong = soluong + 1 WHERE ma='$ma' AND mausac='$mausac' AND rom='$rom' AND user_id='$user_id'";
        if ($conn->query($sql_update_quantity) === TRUE) {
            echo "Đã cập nhật số lượng sản phẩm thành công!";
        } else {
            echo "Lỗi: " . $conn->error;
        }
    } else {
        // Nếu sản phẩm chưa tồn tại, thực hiện thêm mới vào giỏ hàng
        $madon = mysqli_real_escape_string($conn, $requestData['madon']);
        $soluong = 1; // Số lượng ban đầu khi thêm vào giỏ hàng
        $date = date("Y-m-d H:i:s"); // Lấy ngày và giờ hiện tại
        $sql_insert_product = "INSERT INTO cart_items (madon, ma, soluong, date, mausac, rom, user_id) VALUES ('$madon', '$ma', '$soluong', '$date', '$mausac', '$rom', '$user_id')";
        if ($conn->query($sql_insert_product) === TRUE) {
            echo "Đã thêm sản phẩm vào giỏ hàng thành công!";
        } else {
            echo "Lỗi: " . $conn->error;
        }
    }
} else {
    echo "Lỗi: Phương thức yêu cầu không hợp lệ!";
}

// Đóng kết nối
$conn->close();
?>
