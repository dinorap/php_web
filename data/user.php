<?php
// Kết nối đến cơ sở dữ liệu
require_once 'db_connection.php';

// Hàm lấy dữ liệu từ bảng users
function getUsersData($conn) {
    $sql = "SELECT * FROM users";
    $result = $conn->query($sql);
    $usersData = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $usersData[] = $row;
        }
    }
    return $usersData;
}

// Hàm lấy dữ liệu từ bảng cart_items// Hàm lấy dữ liệu từ bảng cart_items
function getCartItemsData($conn) {
    $sql = "SELECT * FROM cart_items";
    $result = $conn->query($sql);
    $cartItemsData = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            // Ép kiểu dữ liệu của cột soluong sang integer
            $row['soluong'] = (int)$row['soluong'];
            $cartItemsData[] = $row;
        }
    }
    return $cartItemsData;
}


// Hàm lấy dữ liệu từ bảng orders và order_items
function getOrdersData($conn) {
    $sql = "SELECT * FROM orders";
    $result = $conn->query($sql);
    $ordersData = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $order_id = $row['id'];
            $sql_items = "SELECT * FROM order_items WHERE order_id=$order_id";
            $result_items = $conn->query($sql_items);
            $itemsData = array();
            if ($result_items->num_rows > 0) {
                while($item_row = $result_items->fetch_assoc()) {
                    $item_row['soluong'] = (int)$item_row['soluong'];
                    $itemsData[] = $item_row;
                }
            }
            $row['sp'] = $itemsData;
            $ordersData[] = $row;
        }
    }
    return $ordersData;
}

// Gọi các hàm để lấy dữ liệu
$usersData = getUsersData($conn);
$cartItemsData = getCartItemsData($conn);
$ordersData = getOrdersData($conn);

// Tạo một mảng kết quả chứa dữ liệu
$resultData = array();

// Lặp qua dữ liệu của bảng users và thêm vào mảng kết quả
foreach ($usersData as $userData) {
    $user_data = array(
        'id'=> $userData['id'],
        'ho' => $userData['ho'],
        'ten' => $userData['ten'],
        'email' => $userData['email'],
        'username' => $userData['username'],
        'pass' => $userData['pass'],
        'locker' => $userData['locker'],
        'products' => array(),
        'donhang' => array()
    );

    // Thêm dữ liệu của bảng cart_items vào mảng kết quả
    foreach ($cartItemsData as $cartItemData) {
        if ($cartItemData['user_id'] == $userData['id']) {
            $user_data['products'][] = array(
                'madon' => $cartItemData['madon'],
                'ma' => $cartItemData['ma'],
                'soluong' => $cartItemData['soluong'],
                'date' => $cartItemData['date'],
                'mausac' => $cartItemData['mausac'],
                'rom' => $cartItemData['rom']
            );
        }
    }
    
    // Thêm dữ liệu của bảng orders và order_items vào mảng kết quả
    foreach ($ordersData as $orderData) {
        if ($orderData['user_id'] == $userData['id']) {
            $user_data['donhang'][] = array(
                'madon' => $orderData['madon'],
                'tongtien' => $orderData['tongtien'],
                'thongtin' => array(
                    'hoTen' => $orderData['hoTen'],
                    'email' => $orderData['email'],
                    'soDienThoai' => $orderData['soDienThoai'],
                    'tinh' => $orderData['tinh'],
                    'huyen' => $orderData['huyen'],
                    'xa' => $orderData['xa'],
                    'diaChi' => $orderData['diaChi'],
                    'loiNhan' => $orderData['loiNhan'],
                    'phuongthuc' => $orderData['phuongthuc'],
                    'magiamgia' => $orderData['magiamgia']
                ),
                'sp' => $orderData['sp'],
                'ngaymua' => $orderData['ngaymua'],
                'tinhTrang' => $orderData['tinhTrang']
            );
        }
    }
    
    // Thêm dữ liệu của người dùng vào mảng kết quả
    $resultData[] = $user_data;
}

// Chuyển mảng kết quả thành định dạng JSON và hiển thị
header('Content-Type: application/json');
echo json_encode($resultData, JSON_PRETTY_PRINT);

// Đóng kết nối
$conn->close();
?>
