<?php
// Thông tin kết nối đến cơ sở dữ liệu
require_once 'db_connection.php';

// Kiểm tra xem dữ liệu đã được gửi đi từ yêu cầu POST chưa
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Lấy dữ liệu sản phẩm từ yêu cầu POST
    $requestData = json_decode(file_get_contents("php://input"), true);

    // Kiểm tra xem dữ liệu đã đủ hay không
    if(isset($requestData['news'])) {
        $news = $requestData['news'];

        // Kiểm tra các trường dữ liệu
        if(isset($news['title']) && isset($news['image']) && isset($news['link']) && isset($news['time']) && isset($news['web'])) {
            // Escape dữ liệu để tránh SQL injection
            $title = mysqli_real_escape_string($conn, $news['title']);
            $image = mysqli_real_escape_string($conn, $news['image']);
            $link = mysqli_real_escape_string($conn, $news['link']);
            $time = $news['time']; // Đã được định dạng ở định dạng mong muốn
            $web = mysqli_real_escape_string($conn, $news['web']);

            // Tạo truy vấn SQL để chèn dữ liệu vào cơ sở dữ liệu
            $sql = "INSERT INTO news (title, image, link, time, web) VALUES ('$title', '$image', '$link', '$time', '$web')";

            // Thực thi truy vấn SQL và kiểm tra kết quả
           

            // Kiểm tra kết quả
            if ($conn->query($sql) === TRUE) {
                echo "Dữ liệu đã được thêm thành công!";
            } else {
                echo "Lỗi: Không thể thêm dữ liệu!";
            }
        } else {
            echo "Lỗi: Dữ liệu không đủ hoặc không đúng định dạng!";
        }
    } else {
        echo "Lỗi: Dữ liệu không tồn tại!";
    }
} else {
    echo "Lỗi: Phương thức yêu cầu không hợp lệ!";
}

// Đóng kết nối
$conn->close();
?>
