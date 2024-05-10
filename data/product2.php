<?php
// Thông tin kết nối đến cơ sở dữ liệu
require_once 'db_connection.php';
// Truy vấn SQL để lấy dữ liệu
$sql = "SELECT product2.*, companies2.name AS company_name FROM product2 LEFT JOIN companies2 ON product2.companyId = companies2.id";
$result = $conn->query($sql);

// Kiểm tra nếu có kết quả trả về
if ($result->num_rows > 0) {
    // Khởi tạo mảng để lưu trữ dữ liệu
    $products = array();

    // Lặp qua từng hàng dữ liệu và lưu vào mảng
    while($row = $result->fetch_assoc()) {
        // Lấy các trường cần thiết từ hàng dữ liệu và thêm vào mảng
        $product = array(
            'name' => $row['name'],
            'company' => $row['company_name'],
            'img' => $row['img'],
            'price' => $row['price'],
            'star' => $row['star'],
            'count' => $row['count'],
            'rateCount' => $row['rateCount'],
            'promo' => array('name' => $row['promoName'], 'value' => $row['promoValue']),
            'detail' => array(
                'color' => $row['color'],
                'screen' => $row['screen'],
                'os' => $row['os'],
                'camara' => $row['camara'],
                'camaraFront' => $row['camaraFront'],
                'cpu' => $row['cpu'],
                'ram' => $row['ram'],
                'rom' => $row['rom'],
                'microUSB' => $row['microUSB'],
                'battery' => $row['battery'],
                'loai' => $row['loai']
            ),
            'masp' => $row['masp']
        );
        $products[] = $product;
    }
} else {
    echo "Không có sản phẩm nào.";
}

// Đóng kết nối
$conn->close();

// Chuyển đổi mảng thành JSON và trả về
header('Content-Type: application/json');
echo json_encode($products);
?>
