<?php
// Thông tin kết nối đến cơ sở dữ liệu
require_once 'db_connection.php';

// Truy vấn SQL để lấy dữ liệu từ bảng news
$sql = "SELECT * FROM `admin`";
$result = $conn->query($sql);

// Kiểm tra nếu có kết quả trả về
$newsArray = array();

// Kiểm tra nếu có kết quả trả về
if ($result->num_rows > 0) {
    // Lặp qua từng hàng dữ liệu và lưu vào mảng
    while($row = $result->fetch_assoc()) {
        // Thêm hàng dữ liệu vào mảng $newsArray
        $newsArray[] = $row;
    }
} else {
    echo "Không có tin tức nào.";
}

// Đóng kết nối
$conn->close();

// Trả về dữ liệu dưới dạng JSON
header('Content-Type: application/json');
echo json_encode($newsArray);

?>
