<?php
// Thông tin kết nối đến cơ sở dữ liệu
require_once 'db_connection.php';

// Kiểm tra xem dữ liệu đã được gửi đi từ yêu cầu POST chưa
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Lấy dữ liệu đơn hàng từ yêu cầu POST
    $requestData = json_decode(file_get_contents("php://input"), true);
    
    // Lấy thông tin đơn hàng từ dữ liệu yêu cầu
    $ngaymua = $requestData['ngaymua'];
    $tinhTrang = mysqli_real_escape_string($conn, $requestData['tinhTrang']);
    $hoTen = mysqli_real_escape_string($conn, $requestData['hoTen']);
    $email = mysqli_real_escape_string($conn, $requestData['email']);
    $soDienThoai = mysqli_real_escape_string($conn, $requestData['soDienThoai']);
    $tinh = mysqli_real_escape_string($conn, $requestData['tinh']);
    $huyen = mysqli_real_escape_string($conn, $requestData['huyen']);
    $xa = mysqli_real_escape_string($conn, $requestData['xa']);
    $diaChi = mysqli_real_escape_string($conn, $requestData['diaChi']);
    $loiNhan = mysqli_real_escape_string($conn, $requestData['loiNhan']);
    $phuongThuc = mysqli_real_escape_string($conn, $requestData['phuongThuc']);
    $magiamgia = mysqli_real_escape_string($conn, $requestData['magiamgia']);
    $user_id = mysqli_real_escape_string($conn, $requestData['user_id']);
    $madon = mysqli_real_escape_string($conn, $requestData['madon']);
    $tongtien = mysqli_real_escape_string($conn, $requestData['tongtien']);

    // Thực hiện thêm thông tin đơn hàng vào bảng "order"
    $sql_insert_order = "INSERT INTO `orders` (ngaymua, tinhTrang, hoTen, email, soDienThoai, tinh, huyen, xa, diaChi, loiNhan, phuongThuc, magiamgia, user_id, madon, tongtien) 
                        VALUES ('$ngaymua', '$tinhTrang', '$hoTen', '$email', '$soDienThoai', '$tinh', '$huyen', '$xa', '$diaChi', '$loiNhan', '$phuongThuc', '$magiamgia', '$user_id', '$madon', '$tongtien')";
    if ($conn->query($sql_insert_order) === TRUE) {
        // Lấy ID của đơn hàng vừa được thêm vào
        $order_id = $conn->insert_id;
        
        // Lấy danh sách sản phẩm từ dữ liệu yêu cầu
        $products = $requestData['products'];
        
        // Thêm thông tin chi tiết đơn hàng vào bảng "order_detail" cho mỗi sản phẩm
        foreach ($products as $product) {
            $ma = mysqli_real_escape_string($conn, $product['ma']);
            $soluong = mysqli_real_escape_string($conn, $product['soluong']);
            $mausac = mysqli_real_escape_string($conn, $product['mausac']);
            $rom = mysqli_real_escape_string($conn, $product['rom']);
        
            // Thực hiện truy vấn SQL để lấy tên sản phẩm từ các bảng "product", "product1", và "product2"
            $sql_product_name = "(SELECT name FROM product WHERE masp = '$ma')
                                UNION
                                (SELECT name FROM product1 WHERE masp = '$ma')
                                UNION
                                (SELECT name FROM product2 WHERE masp = '$ma')";
            $result_product_name = $conn->query($sql_product_name);
            if ($result_product_name->num_rows > 0) {
                $row_product_name = $result_product_name->fetch_assoc();
                $product_name_final = $row_product_name['name'];
            } else {
                $product_name_final = ''; // hoặc giá trị mặc định khác tùy thuộc vào yêu cầu của bạn
            }
        
            // Thực hiện thêm thông tin chi tiết đơn hàng vào bảng "order_detail"
            $sql_insert_order_detail = "INSERT INTO order_items (order_id, ma, soluong, mausac, rom, ten_sp) 
                                        VALUES ('$order_id', '$ma', '$soluong', '$mausac', '$rom', '$product_name_final')";
            $conn->query($sql_insert_order_detail);
        }
        
        
        echo "Đã thêm đơn hàng và chi tiết đơn hàng thành công!";
    } else {
        echo "Lỗi khi thêm đơn hàng: " . $conn->error;
    }
} else {
    echo "Lỗi: Phương thức yêu cầu không hợp lệ!";
}

// Đóng kết nối
$conn->close();
?>
