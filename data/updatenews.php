<?php
// Thông tin kết nối đến cơ sở dữ liệu
require_once 'db_connection.php';

// Kiểm tra xem dữ liệu đã được gửi đi từ yêu cầu POST chưa
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Lấy dữ liệu tin tức từ yêu cầu POST
    $requestData = json_decode(file_get_contents("php://input"), true);

    $old_title = mysqli_real_escape_string($conn, $requestData['old_title']); // Tiêu đề tin tức cũ
    $new_title = mysqli_real_escape_string($conn, $requestData['new_title']); // Tiêu đề tin tức mới
    $news = $requestData['news']; // Dữ liệu tin tức mới
    $image = mysqli_real_escape_string($conn, $news['image']);
    $link = mysqli_real_escape_string($conn, $news['link']);
    $time = $news['time']; // Đã được định dạng ở định dạng mong muốn
    $web = mysqli_real_escape_string($conn, $news['web']);

    // Tạo truy vấn SQL để cập nhật dữ liệu vào cơ sở dữ liệu
    $sql = "UPDATE news SET title='$new_title', image='$image', link='$link', time='$time', web='$web' WHERE title='$old_title'";

    // Thực thi truy vấn SQL và kiểm tra kết quả
    if ($conn->query($sql) === TRUE) {
        echo "Dữ liệu đã được cập nhật thành công!";
    } else {
        echo "Lỗi: " . $sql . "<br>" . $conn->error;
    }
} else {
    echo "Lỗi: Phương thức yêu cầu không hợp lệ!";
}

// Đóng kết nối
$conn->close();
?>
