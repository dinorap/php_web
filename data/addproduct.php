<?php
// Include the database connection file
require_once 'db_connection.php';

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Decode the JSON data sent in the request body
    $requestData = json_decode(file_get_contents("php://input"), true);

    // Extract product data from the decoded JSON data
    $product = $requestData['product'];
    $tableName = $requestData['table'];
    $tableName1 = $requestData['table1'];
    $company_name = mysqli_real_escape_string($conn, $product['company']); // Sửa tên biến thành $company_name
    $sql_company = "SELECT id FROM  $tableName1 WHERE name = '$company_name'";
    $result_company = $conn->query($sql_company);
    $row_company = $result_company->fetch_assoc();
    $companyId = $row_company['id'];

    // Extract product data
    $masp = mysqli_real_escape_string($conn, $product['masp']);
    $name = mysqli_real_escape_string($conn, $product['name']);
    $img = mysqli_real_escape_string($conn, $product['img']);
    $price = mysqli_real_escape_string($conn, $product['price']);
    $star = $product['star'];
    $count = $product['count'];
    $rateCount = $product['rateCount'];
    $promoName = mysqli_real_escape_string($conn, $product['promo']['name']);
    $promoValue = $product['promo']['value'];
    $color = mysqli_real_escape_string($conn, $product['detail']['color']);
    $screen = mysqli_real_escape_string($conn, $product['detail']['screen']);
    $os = mysqli_real_escape_string($conn, $product['detail']['os']);
    $camara = mysqli_real_escape_string($conn, $product['detail']['camara']);
    $camaraFront = mysqli_real_escape_string($conn, $product['detail']['camaraFront']);
    $cpu = mysqli_real_escape_string($conn, $product['detail']['cpu']);
    $ram = mysqli_real_escape_string($conn, $product['detail']['ram']);
    $rom = mysqli_real_escape_string($conn, $product['detail']['rom']);
    $microUSB = mysqli_real_escape_string($conn, $product['detail']['microUSB']);
    $battery = mysqli_real_escape_string($conn, $product['detail']['battery']);
    $loai = mysqli_real_escape_string($conn, $product['detail']['loai']);

    // SQL query to insert the product into the database
    $sql = "INSERT INTO $tableName (masp, name, companyId, img, price, star, count, rateCount, promoName, promoValue, color, screen, os, camara, 
            camaraFront, cpu, ram, rom, microUSB, battery, loai) 
            VALUES ('$masp', '$name', '$companyId', '$img', '$price', '$star', '$count', '$rateCount', '$promoName', '$promoValue', '$color', 
            '$screen', '$os', '$camara', '$camaraFront', '$cpu', '$ram', '$rom', '$microUSB', '$battery', '$loai')";

    // Execute the SQL query to insert the product
    if ($conn->query($sql) === TRUE) {
        echo "Sản phẩm đã được thêm thành công!";
    } else {
        echo "Lỗi: " . $sql . "<br>" . $conn->error;
    }

    // Close the database connection
    $conn->close();
} else {
    echo "Lỗi: Phương thức yêu cầu không hợp lệ!";
}
?>
