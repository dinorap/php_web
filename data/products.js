var list_products;
var list_products1;
var list_products2;
var listNews;
var adminInfo;
var listUser;
fetch("./data/product.php")
  .then((response) => response.json())
  .then((data) => {
    list_products = data;
    // Lưu dữ liệu vào biến list_products
    // Xử lý dữ liệu và hiển thị lên trang HTML
  })
  .catch((error) => console.error("Lỗi:", error));
fetch("./data/product1.php")
  .then((response) => response.json())
  .then((data) => {
    list_products1 = data;
    // Lưu dữ liệu vào biến list_products
    // Xử lý dữ liệu và hiển thị lên trang HTML
  })
  .catch((error) => console.error("Lỗi:", error));

fetch("./data/product2.php")
  .then((response) => response.json())
  .then((data) => {
    list_products2 = data;
    // Lưu dữ liệu vào biến list_products
    // Xử lý dữ liệu và hiển thị lên trang HTML
  })
  .catch((error) => console.error("Lỗi:", error));
fetch("./data/news.php")
  .then((response) => response.json())
  .then((data) => {
    listNews = data;
    // Lưu dữ liệu vào biến list_products
    // Xử lý dữ liệu và hiển thị lên trang HTML
  })
  .catch((error) => console.error("Lỗi:", error));
fetch("./data/admin.php")
  .then((response) => response.json())
  .then((data) => {
    adminInfo = data;
    console.log(adminInfo);
    // Lưu dữ liệu vào biến list_products
    // Xử lý dữ liệu và hiển thị lên trang HTML
  })
  .catch((error) => console.error("Lỗi:", error));
fetch("./data/user.php")
  .then((response) => response.json())
  .then((data) => {
    listUser = data;
    // Lưu dữ liệu vào biến list_products
    // Xử lý dữ liệu và hiển thị lên trang HTML
  })
  .catch((error) => console.error("Lỗi:", error));
