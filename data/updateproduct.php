<?php
// Include the database connection file
require_once 'db_connection.php';

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Decode the JSON data sent in the request body
    $requestData = json_decode(file_get_contents("php://input"), true);

    // Extract product data from the decoded JSON data
    $old_masp = mysqli_real_escape_string($conn, $requestData['old_masp']);
    $new_masp = mysqli_real_escape_string($conn, $requestData['new_masp']);
    $product = $requestData['product'];
    $tableName = $requestData['table'];
    $tableName1 = $requestData['table1'];
    $company_name = mysqli_real_escape_string($conn, $product['company']); // Sửa tên biến thành $company_name
    $sql_company = "SELECT id FROM  $tableName1 WHERE name = '$company_name'";
    $result_company = $conn->query($sql_company);
    $row_company = $result_company->fetch_assoc();
    $companyId = $row_company['id'];
    // Extract product data
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

    // SQL query to update the product information
    $sql = "UPDATE $tableName 
            SET masp='$new_masp', name='$name', companyId='$companyId', img='$img', price='$price', star='$star', count='$count', rateCount='$rateCount', 
            promoName='$promoName', promoValue='$promoValue', color='$color', screen='$screen', os='$os', camara='$camara', 
            camaraFront='$camaraFront', cpu='$cpu', ram='$ram', rom='$rom', microUSB='$microUSB', battery='$battery', 
            loai='$loai' 
            WHERE masp='$old_masp'";

    // Execute the SQL query
        if ($conn->query($sql) === TRUE) {
            echo "Dữ liệu đã được cập nhật thành công!";
        } else {
            echo "Lỗi: " . $sql . "<br>" . $conn->error;
        }
    } else {
        echo "Lỗi: Phương thức yêu cầu không hợp lệ!";
    }

// Close the database connection
$conn->close();
?>




<!-- <?php
// Include the database connection file
// require_once 'db_connection.php';

// // Check if the request method is POST
// if ($_SERVER["REQUEST_METHOD"] == "POST") {
//     // Decode the JSON data sent in the request body
//     $requestData = json_decode(file_get_contents("php://input"), true);

//     // Extract product data from the decoded JSON data
//     $product = $requestData['product'];
//     $tableName = $requestData['table'];
//     $masp = mysqli_real_escape_string($conn, $product['masp']);
//     $name = mysqli_real_escape_string($conn, $product['name']);

//     // Check for duplicate entry based on masp or name
//     $sqlCheckDuplicate = "SELECT * FROM $tableName WHERE (masp = '$masp' OR name = '$name') AND masp != '$masp'";
//     $resultCheckDuplicate = $conn->query($sqlCheckDuplicate);

//     if ($resultCheckDuplicate->num_rows > 0) {
//         echo "Mã sản phẩm hoặc Tên sản phẩm đã tồn tại!";
//     } else {
//         // No duplicate found, proceed with the update
//         // Extract product data
//         $company = mysqli_real_escape_string($conn, $product['company']);
//         $img = mysqli_real_escape_string($conn, $product['img']);
//         $price = mysqli_real_escape_string($conn, $product['price']);
//         $star = $product['star'];
//         $count = $product['count'];
//         $rateCount = $product['rateCount'];
//         $promoName = mysqli_real_escape_string($conn, $product['promo']['name']);
//         $promoValue = $product['promo']['value'];
//         $color = mysqli_real_escape_string($conn, $product['detail']['color']);
//         $screen = mysqli_real_escape_string($conn, $product['detail']['screen']);
//         $os = mysqli_real_escape_string($conn, $product['detail']['os']);
//         $camara = mysqli_real_escape_string($conn, $product['detail']['camara']);
//         $camaraFront = mysqli_real_escape_string($conn, $product['detail']['camaraFront']);
//         $cpu = mysqli_real_escape_string($conn, $product['detail']['cpu']);
//         $ram = mysqli_real_escape_string($conn, $product['detail']['ram']);
//         $rom = mysqli_real_escape_string($conn, $product['detail']['rom']);
//         $microUSB = mysqli_real_escape_string($conn, $product['detail']['microUSB']);
//         $battery = mysqli_real_escape_string($conn, $product['detail']['battery']);
//         $loai = mysqli_real_escape_string($conn, $product['detail']['loai']);

//         // SQL query to update the product information
//         $sqlUpdateProduct = "UPDATE $tableName 
//                             SET name='$name', company='$company', img='$img', price='$price', star='$star', count='$count', rateCount='$rateCount', 
//                             promoName='$promoName', promoValue='$promoValue', color='$color', screen='$screen', os='$os', camara='$camara', 
//                             camaraFront='$camaraFront', cpu='$cpu', ram='$ram', rom='$rom', microUSB='$microUSB', battery='$battery', 
//                             loai='$loai' 
//                             WHERE masp='$masp'";

//         // Execute the SQL query to update the product
//         if ($conn->query($sqlUpdateProduct) === TRUE) {
//             echo "Dữ liệu đã được cập nhật thành công!";
//         } else {
//             echo "Lỗi: " . $sqlUpdateProduct . "<br>" . $conn->error;
//         }
//     }
// } else {
//     echo "Lỗi: Phương thức yêu cầu không hợp lệ!";
// }

// // Close the database connection
// $conn->close();
?> -->
