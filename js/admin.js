var TONGTIEN = 0;
var thongKeDT = {};
var differentElements111 = {};
var lv = getLv();
function getListUser() {
  return listUser;
}
window.onload = function () {
  // get data từ localstorage
  list_products1 = list_products1;
  list_products = list_products;
  list_products2 = list_products2;
  list_products0 = list_products;
  listNews = listNews;
  console.log(list_products0);
  console.log(list_products1);
  console.log(list_products2);
  // Tạo một mảng mới để chứa các sản phẩm không trùng lặp
  var newProducts = [];

  // Kiểm tra và chỉ nối các sản phẩm không trùng lặp từ list_products1 vào newProducts
  for (var i = 0; i < list_products1.length; i++) {
    // Kiểm tra xem sản phẩm hiện tại đã tồn tại trong list_products chưa
    if (
      !list_products.some((product) => product.masp === list_products1[i].masp)
    ) {
      // Nếu không trùng lặp, thì nối sản phẩm vào mảng newProducts
      newProducts.push(list_products1[i]);
    }
  }

  // Kiểm tra và chỉ nối các sản phẩm không trùng lặp từ list_products2 vào newProducts
  for (var i = 0; i < list_products2.length; i++) {
    // Kiểm tra xem sản phẩm hiện tại đã tồn tại trong list_products và newProducts chưa
    if (
      !list_products.some(
        (product) => product.masp === list_products2[i].masp
      ) &&
      !newProducts.some((product) => product.masp === list_products2[i].masp)
    ) {
      // Nếu không trùng lặp, thì nối sản phẩm vào mảng newProducts
      newProducts.push(list_products2[i]);
    }
  }

  // Nối các sản phẩm không trùng lặp từ newProducts vào list_products
  list_products = list_products.concat(newProducts);

  var thongKeDTFromStorage =
    JSON.parse(localStorage.getItem("thongKeDT")) || thongKeDT;
  console.log(thongKeDTFromStorage);

  // Tính toán thongKeDT
  var thongKeDT = addSoLuong();
  localStorage.setItem("thongKeDT", JSON.stringify(thongKeDT));

  // Chuyển đổi cả hai đối tượng thành chuỗi JSON
  var thongKeDTString = JSON.stringify(thongKeDT);
  var thongKeDTFromStorageString = JSON.stringify(thongKeDTFromStorage);

  // So sánh chuỗi JSON
  var areEqual = thongKeDTString === thongKeDTFromStorageString;

  console.log(areEqual);

  differentElements = {};

  // Duyệt qua thongKeDT và kiểm tra từng phần tử
  for (var key in thongKeDT) {
    if (thongKeDT.hasOwnProperty(key)) {
      // Kiểm tra xem phần tử có tồn tại trong thongKeDTFromStorage không
      if (
        !thongKeDTFromStorage.hasOwnProperty(key) ||
        JSON.stringify(thongKeDT[key]) !==
          JSON.stringify(thongKeDTFromStorage[key])
      ) {
        // Nếu không tồn tại hoặc giá trị khác nhau, thêm phần tử vào mảng mới
        differentElements[key] = thongKeDT[key];
      }
    }
  }

  // Duyệt qua thongKeDTFromStorage và kiểm tra từng phần tử
  for (var key in thongKeDTFromStorage) {
    if (thongKeDTFromStorage.hasOwnProperty(key)) {
      // Kiểm tra xem phần tử có tồn tại trong thongKeDT không
      if (!thongKeDT.hasOwnProperty(key)) {
        // Nếu không tồn tại, thêm phần tử vào mảng mới
        differentElements[key] = thongKeDTFromStorage[key];
      }
    }
  }

  console.log(differentElements);

  var differentElements111 = {};

  // Duyệt qua từng phần tử trong mảng differentElements
  for (var key in differentElements) {
    if (differentElements.hasOwnProperty(key)) {
      // Kiểm tra xem phần tử có tồn tại trong thongKeDTFromStorage không
      if (thongKeDTFromStorage.hasOwnProperty(key)) {
        // Giảm giá trị của phần tử trong differentElements đi giá trị tương ứng trong thongKeDTFromStorage
        differentElements[key].soLuongBanRa -=
          thongKeDTFromStorage[key].soLuongBanRa;
        // Nếu giá trị sau khi giảm lớn hơn 0, thêm vào mảng differentElements111
        if (differentElements[key].soLuongBanRa > 0) {
          differentElements111[key] = differentElements[key];
        }
      } else {
        // Nếu phần tử không tồn tại trong thongKeDTFromStorage, thêm vào mảng differentElements111
        differentElements111[key] = differentElements[key];
      }
    }
  }

  console.log(differentElements111);

  if (!areEqual) {
    addSoLuong1(differentElements111);
  }

  if (!areEqual) {
    addSoLuong0(differentElements111);
  }

  if (!areEqual) {
    addSoLuong2(differentElements111);
  }

  addEventChangeTab();
  if (lv == 1) {
    addTableProducts();
    addTableProducts1();
    addTableProducts2();
    thongBao();
    addTableDonHang();
    addTableKhachHang();
    addThongKe();
    addTableTinTuc();

    openTab("Trang Chủ");
  } else if (lv == 2) {
    var a = document.getElementById("user");
    var b = document.getElementById("tintuc");
    b.style.display = "none";
    a.style.display = "none";
    thongBao();
    addThongKe();
    addTableProducts();
    addTableProducts1();
    addTableProducts2();
    addTableDonHang();
    addTableTinTuc();
    openTab("Trang Chủ");
  } else if (lv == 3) {
    var a = document.getElementById("user");
    a.style.display = "none";
    var b = document.getElementById("trangchu");
    b.style.display = "none";
    var c = document.getElementById("donhang");
    c.style.display = "none";
    var d = document.getElementById("sanpham");
    d.style.display = "none";

    addTableTinTuc();
    openTab("Tin Tức");
  } else {
    document.body.innerHTML = `<h1 style="color:red; with:100%; text-align:center; margin: 50px;"> Truy cập bị từ chối.. </h1>`;
  }
};

function logOutAdmin() {
  window.localStorage.removeItem("lv");
}

function getListRandomColor(length) {
  let result = [];
  for (let i = length; i--; ) {
    result.push(getRandomColor());
  }
  return result;
}
//thêm bảng thống kê
function addChart(id, chartOption) {
  var ctx = document.getElementById(id).getContext("2d");
  var chart = new Chart(ctx, chartOption);
}

function createChartConfigbar(
  title = "Title",
  charType = "bar",
  labels = ["nothing"],
  data = [2],
  colors = ["red"]
) {
  // Tạo một mảng datasets cho mỗi ô dữ liệu
  const datasets = data.map((value, index) => {
    return {
      label: labels[index],
      data: [value],
      backgroundColor: colors[index],
      borderColor: colors[index],
    };
  });

  return {
    type: charType,
    data: {
      labels: [title],
      datasets: datasets, // Sử dụng mảng datasets
    },
    options: {
      title: {
        fontColor: "#fff",
        fontSize: 25,
        display: true,
        text: title,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  };
}
function createChartConfig(
  title = "Title",
  charType = "bar",
  labels = ["nothing"],
  data = [2],
  colors = ["red"]
) {
  return {
    type: charType,
    data: {
      labels: labels,
      datasets: [
        {
          label: title,
          data: data,
          backgroundColor: colors,
          borderColor: colors,
          // borderWidth: 2
        },
      ],
    },
    options: {
      title: {
        fontColor: "#fff",
        fontSize: 25,
        display: true,
        text: title,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  };
}

function addThongKe() {
  var danhSachDonHang = getListDonHang(true);

  var thongKeHang = {}; // Thống kê hãng

  danhSachDonHang.forEach((donHang) => {
    // Nếu đơn hàng bị huỷ thì không tính vào số lượng bán ra
    if (donHang.tinhTrang === "Đã hủy") return;

    // Lặp qua từng sản phẩm trong đơn hàng
    donHang.sp.forEach((sanPhamTrongDonHang) => {
      let tenHang = sanPhamTrongDonHang.sanPham.company;
      let soLuong = sanPhamTrongDonHang.soLuong;
      let donGia = stringToNum(sanPhamTrongDonHang.sanPham.price);
      let thanhTien = soLuong * donGia;

      if (!thongKeHang[tenHang]) {
        thongKeHang[tenHang] = {
          soLuongBanRa: 0,
          doanhThu: 0,
        };
      }

      thongKeHang[tenHang].soLuongBanRa += soLuong;
      thongKeHang[tenHang].doanhThu += thanhTien;
    });
  });
  let tongDoanhThu = 0;
  let tongBan = 0;
  for (let tenHang in thongKeHang) {
    tongDoanhThu += thongKeHang[tenHang].doanhThu;
    tongBan += thongKeHang[tenHang].soLuongBanRa;
  }

  // Hiển thị tổng doanh thu và tổng số lượng bán ra trên cùng một hàng
  var divThongKe = document.createElement("div");
  divThongKe.innerHTML = `
    <p>Tổng số lượng bán ra: ${tongBan} sản phẩm</p>
    <p>Tổng doanh thu: ${tongDoanhThu.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    })}</p>
  `;
  divThongKe.classList.add("thong-ke"); // Thêm lớp CSS cho phần tử div
  var parentElement = document.getElementById("addtotal");
  parentElement.appendChild(divThongKe);

  parentElement.appendChild(divThongKe);

  // Lấy mảng màu ngẫu nhiên để vẽ đồ thị
  let colors = getListRandomColor(Object.keys(thongKeHang).length);

  // Thêm thống kê
  addChart(
    "myChart1",
    createChartConfigbar(
      "Số lượng bán ra",
      "bar",
      Object.keys(thongKeHang),
      Object.values(thongKeHang).map((_) => _.soLuongBanRa),
      colors
    )
  );

  addChart(
    "myChart2",
    createChartConfig(
      "Doanh thu",
      "doughnut",
      Object.keys(thongKeHang),
      Object.values(thongKeHang).map((_) => _.doanhThu),
      colors
    )
  );

  // var doughnutChart = copyObject(dataChart);
  //     doughnutChart.type = 'doughnut';
  // addChart('myChart2', doughnutChart);

  // var pieChart = copyObject(dataChart);
  //     pieChart.type = 'pie';
  // addChart('myChart3', pieChart);

  // var lineChart = copyObject(dataChart);
  //     lineChart.type = 'line';
  // addChart('myChart4', lineChart);
}

// ======================= Các Tab =========================
function addEventChangeTab() {
  var sidebar = document.getElementsByClassName("sidebar")[0];
  var list_a = sidebar.getElementsByTagName("a");

  for (var a of list_a) {
    if (!a.onclick) {
      a.addEventListener("click", function () {
        turnOff_Active();

        // Nếu nhấn vào "Sản Phẩm", thêm lớp active cho thẻ có id là "dienthoai"
        if (this.childNodes[1].data.trim() == "Sản Phẩm") {
          document.getElementById("dienthoai10").classList.add("active");
        } else {
          this.classList.add("active");
        }

        var tab = this.childNodes[1].data.trim();
        openTab(tab);
      });
    }
  }
}

function turnOff_Active() {
  var sidebar = document.getElementsByClassName("sidebar")[0];
  var list_a = sidebar.getElementsByTagName("a");
  for (var a of list_a) {
    a.classList.remove("active");
  }
}

function openTab(nameTab) {
  // ẩn hết
  var main = document.getElementsByClassName("main")[0].children;
  for (var e of main) {
    e.style.display = "none";
  }

  // mở tab
  switch (nameTab) {
    case "Trang Chủ":
      document.getElementsByClassName("home")[0].style.display = "block";
      break;
    case "Sản Phẩm":
      var abcItems = document.getElementsByClassName("abc");

      for (var item of abcItems) {
        if (item.style.display === "block") {
          item.style.display = "none";
        } else {
          item.style.display = "block";
        }
      }
      document.getElementsByClassName("sanpham")[0].style.display = "block";
      break;
    case "Điện Thoại":
      document.getElementsByClassName("sanpham")[0].style.display = "block";
      break;
    case "Máy Tính":
      document.getElementsByClassName("sanpham1")[0].style.display = "block";
      break;
    case "Tablet":
      document.getElementsByClassName("sanpham2")[0].style.display = "block";
      break;
    case "Đơn Hàng":
      document.getElementsByClassName("donhang")[0].style.display = "block";
      break;
    case "Khách Hàng":
      document.getElementsByClassName("khachhang")[0].style.display = "block";
      break;
    case "Tin Tức":
      document.getElementsByClassName("tintuc")[0].style.display = "block";
      break;
  }
}

// ========================== Sản Phẩm ========================
// Vẽ bảng danh sách sản phẩm
function addTableProducts() {
  var tc = document
    .getElementsByClassName("sanpham")[0]
    .getElementsByClassName("table-content")[0];

  var s = `<table class="table-outline hideImg">`;
  var alltotal = 0;
  for (var i = 0; i < list_products0.length; i++) {
    var p = list_products0[i];

    var total = p.count * stringToNum(p.price);
    alltotal += total;

    var formattedTotal = total.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    }); // Định dạng giá trị total
    s +=
      `<tr>
            <td style="width: 5%">` +
      (i + 1) +
      `</td>
            <td style="width: 10%">` +
      p.masp +
      `</td>
            <td style="width: 25%">
                <a title="Xem chi tiết" target="_blank" href="chitietsanpham.html?` +
      p.name.split(" ").join("-") +
      `">` +
      p.name +
      `</a>
                <img src="` +
      p.img +
      `"></img>
            </td>
            <td style="width: 8%">` +
      p.count +
      `</td>
            <td style="width: 10%">` +
      p.price +
      `</td>
      </td>
            <td style="width: 18%">` +
      formattedTotal +
      `</td>
            <td style="width: 12%">` +
      promoToStringValue(p.promo) +
      `</td>
            <td style="width: 12%">
                <div class="tooltip">
                    <i class="fa fa-wrench" onclick="addKhungSuaSanPham('` +
      p.masp +
      `')"></i>
                    <span class="tooltiptext">Sửa</span>
                </div>
                <div class="tooltip">
                    <i class="fa fa-trash" onclick="xoaSanPham('` +
      p.masp +
      `', '` +
      p.name +
      `')"></i>
                    <span class="tooltiptext">Xóa</span>
                </div>
            </td>
        </tr>`;
  }
  var formattedALLTotal = alltotal.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  s += `</table>`;
  s +=
    "<div class='alltotal'><p>Tổng giá trị toàn bộ sản phẩm " +
    formattedALLTotal +
    "</p></div>";
  tc.innerHTML = s;
}
function addTableProducts1() {
  console.log(list_products1);
  var tc = document
    .getElementsByClassName("sanpham1")[0]
    .getElementsByClassName("table-content")[0];

  var s = `<table class="table-outline hideImg">`;
  var alltotal = 0;
  for (var i = 0; i < list_products1.length; i++) {
    var p = list_products1[i];

    var total = p.count * stringToNum(p.price);
    alltotal += total;

    var formattedTotal = total.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    }); // Định dạng giá trị total
    s +=
      `<tr>
            <td style="width: 5%">` +
      (i + 1) +
      `</td>
            <td style="width: 10%">` +
      p.masp +
      `</td>
            <td style="width: 25%">
                <a title="Xem chi tiết" target="_blank" href="chitietsanpham.html?` +
      p.name.split(" ").join("-") +
      `">` +
      p.name +
      `</a>
                <img src="` +
      p.img +
      `"></img>
            </td>
            <td style="width: 8%">` +
      p.count +
      `</td>
            <td style="width: 10%">` +
      p.price +
      `</td>
      </td>
            <td style="width: 18%">` +
      formattedTotal +
      `</td>
            <td style="width: 12%">` +
      promoToStringValue(p.promo) +
      `</td>
            <td style="width: 12%">
                <div class="tooltip">
                    <i class="fa fa-wrench" onclick="addKhungSuaSanPham1('` +
      p.masp +
      `')"></i>
                    <span class="tooltiptext">Sửa</span>
                </div>
                <div class="tooltip">
                    <i class="fa fa-trash" onclick="xoaSanPham1('` +
      p.masp +
      `', '` +
      p.name +
      `')"></i>
                    <span class="tooltiptext">Xóa</span>
                </div>
            </td>
        </tr>`;
  }
  var formattedALLTotal = alltotal.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  s += `</table>`;
  s +=
    "<div class='alltotal'><p>Tổng giá trị toàn bộ sản phẩm " +
    formattedALLTotal +
    "</p></div>";
  tc.innerHTML = s;
}
function addTableProducts2() {
  var tc = document
    .getElementsByClassName("sanpham2")[0]
    .getElementsByClassName("table-content")[0];

  var s = `<table class="table-outline hideImg">`;
  var alltotal = 0;
  for (var i = 0; i < list_products2.length; i++) {
    var p = list_products2[i];

    var total = p.count * stringToNum(p.price);
    alltotal += total;

    var formattedTotal = total.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    }); // Định dạng giá trị total
    s +=
      `<tr>
            <td style="width: 5%">` +
      (i + 1) +
      `</td>
            <td style="width: 10%">` +
      p.masp +
      `</td>
            <td style="width: 25%">
                <a title="Xem chi tiết" target="_blank" href="chitietsanpham.html?` +
      p.name.split(" ").join("-") +
      `">` +
      p.name +
      `</a>
                <img src="` +
      p.img +
      `"></img>
            </td>
            <td style="width: 8%">` +
      p.count +
      `</td>
            <td style="width: 10%">` +
      p.price +
      `</td>
      </td>
            <td style="width: 18%">` +
      formattedTotal +
      `</td>
            <td style="width: 12%">` +
      promoToStringValue(p.promo) +
      `</td>
            <td style="width: 12%">
                <div class="tooltip">
                    <i class="fa fa-wrench" onclick="addKhungSuaSanPham2('` +
      p.masp +
      `')"></i>
                    <span class="tooltiptext">Sửa</span>
                </div>
                <div class="tooltip">
                    <i class="fa fa-trash" onclick="xoaSanPham2('` +
      p.masp +
      `', '` +
      p.name +
      `')"></i>
                    <span class="tooltiptext">Xóa</span>
                </div>
            </td>
        </tr>`;
  }
  var formattedALLTotal = alltotal.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  s += `</table>`;
  s +=
    "<div class='alltotal'><p>Tổng giá trị toàn bộ sản phẩm " +
    formattedALLTotal +
    "</p></div>";
  tc.innerHTML = s;
}
// Tìm kiếm
function timKiemSanPham(inp) {
  var kieuTim = document.getElementsByName("kieuTimSanPham")[0].value;
  var text = inp.value;

  // Lọc
  var vitriKieuTim = { ma: 1, ten: 2 }; // mảng lưu vị trí cột

  var listTr_table = document
    .getElementsByClassName("sanpham")[0]
    .getElementsByClassName("table-content")[0]
    .getElementsByTagName("tr");
  for (var tr of listTr_table) {
    var td = tr
      .getElementsByTagName("td")
      [vitriKieuTim[kieuTim]].innerHTML.toLowerCase();

    if (td.indexOf(text.toLowerCase()) < 0) {
      tr.style.display = "none";
    } else {
      tr.style.display = "";
    }
  }
}
function timKiemSanPham1(inp) {
  var kieuTim = document.getElementsByName("kieuTimSanPham")[0].value;
  var text = inp.value;

  // Lọc
  var vitriKieuTim = { ma: 1, ten: 2 }; // mảng lưu vị trí cột

  var listTr_table = document
    .getElementsByClassName("sanpham1")[0]
    .getElementsByClassName("table-content")[0]
    .getElementsByTagName("tr");
  for (var tr of listTr_table) {
    var td = tr
      .getElementsByTagName("td")
      [vitriKieuTim[kieuTim]].innerHTML.toLowerCase();

    if (td.indexOf(text.toLowerCase()) < 0) {
      tr.style.display = "none";
    } else {
      tr.style.display = "";
    }
  }
}
function timKiemSanPham2(inp) {
  var kieuTim = document.getElementsByName("kieuTimSanPham")[0].value;
  var text = inp.value;

  // Lọc
  var vitriKieuTim = { ma: 1, ten: 2 }; // mảng lưu vị trí cột

  var listTr_table = document
    .getElementsByClassName("sanpham2")[0]
    .getElementsByClassName("table-content")[0]
    .getElementsByTagName("tr");
  for (var tr of listTr_table) {
    var td = tr
      .getElementsByTagName("td")
      [vitriKieuTim[kieuTim]].innerHTML.toLowerCase();

    if (td.indexOf(text.toLowerCase()) < 0) {
      tr.style.display = "none";
    } else {
      tr.style.display = "";
    }
  }
}
// Thêm
let previewSrc; // biến toàn cục lưu file ảnh đang thêm
function layThongTinSanPhamTuTable(id) {
  var khung = document.getElementById(id);
  var tr = khung.getElementsByTagName("tr");

  var masp = tr[1]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("input")[0].value;
  var name = tr[2]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("input")[0].value;
  var company = tr[3]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("select")[0].value;
  var img = tr[4]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("img")[0].src;
  var price = tr[5]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("input")[0].value;
  var count = tr[6]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("input")[0].value;
  var star = tr[7]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("input")[0].value;
  var rateCount = tr[8]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("input")[0].value;
  var promoName = tr[9]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("select")[0].value;
  var promoValue = tr[10]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("input")[0].value;

  var screen = tr[12]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("input")[0].value;
  var os = tr[13]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("input")[0].value;
  var camara = tr[14]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("input")[0].value;
  var camaraFront = tr[15]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("input")[0].value;
  var cpu = tr[16]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("input")[0].value;
  var ram = tr[17]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("input")[0].value;
  var color = tr[18]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("input")[0].value;
  var rom = tr[19]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("input")[0].value;
  var microUSB = tr[20]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("input")[0].value;
  var battery = tr[21]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("input")[0].value;
  var loai = tr[22]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("input")[0].value;
  if (isNaN(price)) {
    alert("Giá phải là số nguyên");
    return false;
  }

  if (isNaN(star)) {
    alert("Số sao phải là số nguyên");
    return false;
  }

  if (isNaN(rateCount)) {
    alert("Số đánh giá phải là số nguyên");
    return false;
  }
  if (isNaN(count)) {
    alert("Số lượng sản phẩm phải là số nguyên");
    return false;
  }

  try {
    return {
      name: name,
      company: company,
      img: img,
      price: numToString(Number.parseInt(price, 10)),
      count: Number.parseInt(count, 10),
      star: Number.parseInt(star, 10),
      rateCount: Number.parseInt(rateCount, 10),
      promo: {
        name: promoName,
        value: promoValue,
      },
      detail: {
        screen: screen,
        os: os,
        camara: camara,
        camaraFront: camaraFront,
        cpu: cpu,
        ram: ram,
        color: color,
        rom: rom,
        microUSB: microUSB,
        battery: battery,
        loai: loai,
      },
      masp: masp,
    };
  } catch (e) {
    alert("Lỗi: " + e.toString());
    return false;
  }
}

function themSanPham() {
  var newSp = layThongTinSanPhamTuTable("khungThemSanPham");
  console.log(newSp);
  if (!newSp) return;

  for (var p of list_products0) {
    if (p.masp == newSp.masp) {
      alert("Mã sản phẩm bị trùng !!");
      return false;
    }

    if (p.name == newSp.name) {
      alert("Tên sản phẩm bị trùng !!");
      return false;
    }
  }
  // Them san pham vao list_products
  fetch("./data/addproduct.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      product: newSp,
      table: "product",
      table1: "companies",
    }),
  })
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
      // Thực hiện các hành động sau khi dữ liệu đã được thêm thành công
      alert('Thêm sản phẩm "' + newSp.name + '" thành công.');
      document.getElementById("khungThemSanPham").style.transform = "scale(0)";
      list_products0.push(newSp);
      addTableProducts();
      addTableProducts1();
      addTableProducts2();
      clearInput("");
      // Vẽ lại bảng nếu cần
    })
    .catch((error) => {
      console.error("Lỗi:", error); // Log lỗi nếu có
    });
}
function clearInput(input) {
  document.getElementById("maspThem" + input).value = "";
  console.log("maspThem" + input);
  document.getElementById("tenSanPham" + input).value = "";
  document.getElementById("chonCompany").selectedIndex = 0;
  document.getElementById("anhDaiDienSanPhamThem" + input).src = "";
  document.getElementById("giaTien" + input).value = "";
  document.getElementById("soLuong" + input).value = "";
  document.getElementById("soSao" + input).value = "";
  document.getElementById("danhGia" + input).value = "";
  document.getElementById("khuyenMai" + input).selectedIndex = 0;
  document.getElementById("giaTriKhuyenMai" + input).value = "";
  document.getElementById("manHinh" + input).value = "";
  document.getElementById("heDieuHanh" + input).value = "";
  document.getElementById("camaraSau" + input).value = "";
  document.getElementById("camaraTruoc" + input).value = "";
  document.getElementById("cpu" + input).value = "";
  document.getElementById("ram" + input).value = "";
  document.getElementById("mauSac" + input).value = "";
  document.getElementById("boNhoTrong" + input).value = "";
  document.getElementById("theNho" + input).value = "";
  document.getElementById("dungLuongPin" + input).value = "";
  document.getElementById("loaiSanPham" + input).value = "";
}

function themSanPham1() {
  var newSp = layThongTinSanPhamTuTable("khungThemSanPham1");
  console.log(newSp);
  if (!newSp) return;

  for (var p of list_products1) {
    if (p.masp == newSp.masp) {
      alert("Mã sản phẩm bị trùng !!");
      return false;
    }

    if (p.name == newSp.name) {
      alert("Tên sản phẩm bị trùng !!");
      return false;
    }
  }
  fetch("./data/addproduct.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      product: newSp,
      table: "product1",
      table1: "companies1",
    }),
  })
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
      // Thực hiện các hành động sau khi dữ liệu đã được thêm thành công
      alert('Thêm sản phẩm "' + newSp.name + '" thành công.');
      document.getElementById("khungThemSanPham1").style.transform = "scale(0)";
      list_products1.push(newSp);
      addTableProducts();
      addTableProducts1();
      addTableProducts2();
      clearInput("1");
      // Vẽ lại bảng nếu cần
    })
    .catch((error) => {
      console.error("Lỗi:", error); // Log lỗi nếu có
    });
}
function themSanPham2() {
  var newSp = layThongTinSanPhamTuTable("khungThemSanPham2");
  console.log(newSp);
  if (!newSp) return;

  for (var p of list_products2) {
    if (p.masp == newSp.masp) {
      alert("Mã sản phẩm bị trùng !!");
      return false;
    }

    if (p.name == newSp.name) {
      alert("Tên sản phẩm bị trùng !!");
      return false;
    }
  }
  // Them san pham vao list_products
  fetch("./data/addproduct.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      product: newSp,
      table: "product2",
      table1: "companies2",
    }),
  })
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
      // Thực hiện các hành động sau khi dữ liệu đã được thêm thành công
      alert('Thêm sản phẩm "' + newSp.name + '" thành công.');
      document.getElementById("khungThemSanPham2").style.transform = "scale(0)";
      list_products2.push(newSp);
      addTableProducts();
      addTableProducts1();
      addTableProducts2();
      clearInput("2");
      // Vẽ lại bảng nếu cần
    })
    .catch((error) => {
      console.error("Lỗi:", error); // Log lỗi nếu có
    });
}
function autoMaSanPham(company) {
  // hàm tự tạo mã cho sản phẩm mới
  if (!company) company = document.getElementsByName("chonCompany")[0].value;
  var index = 0;
  for (var i = 0; i < list_products.length; i++) {
    if (list_products[i].company == company) {
      index++;
    }
  }
  document.getElementById("maspThem").value = company.substring(0, 3) + index;
}
function autoMaSanPham1(company) {
  // hàm tự tạo mã cho sản phẩm mới
  if (!company) company = document.getElementsByName("chonCompany1")[0].value;
  var index = 0;
  for (var i = 0; i < list_products1.length; i++) {
    if (list_products1[i].company == company) {
      index++;
    }
  }
  document.getElementById("maspThem1").value = company.substring(0, 3) + index;
}
function autoMaSanPham2(company) {
  // hàm tự tạo mã cho sản phẩm mới
  if (!company) company = document.getElementsByName("chonCompany2")[0].value;
  var index = 0;
  for (var i = 0; i < list_products2.length; i++) {
    if (list_products2[i].company == company) {
      index++;
    }
  }
  document.getElementById("maspThem2").value = company.substring(0, 3) + index;
}
// Xóa
function xoaSanPham(masp, tensp) {
  if (window.confirm("Bạn có chắc muốn xóa " + tensp)) {
    // Dữ liệu yêu cầu POST
    var requestData = {
      masp: masp,
      table: "product", // Thay đổi tên bảng tương ứng
    };

    // Gửi yêu cầu POST đến tệp PHP xử lý việc xóa sản phẩm
    fetch("./data/deleteproduct.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.text())
      .then((data) => {
        // Hiển thị thông báo kết quả
        fetch("./data/product.php")
          .then((response) => response.json())
          .then((data) => {
            // Cập nhật lại dữ liệu list_products0 với dữ liệu mới
            list_products0 = data;
            // Hiển thị lại bảng sản phẩm sau khi cập nhật dữ liệu
            alert("Xóa " + tensp + " thành công");
            addTableProducts();
            addTableProducts1();
            addTableProducts2();
          })
          .catch((error) => {
            console.error("Lỗi khi lấy dữ liệu mới:", error);
            alert(
              "Xóa " +
                tensp +
                " thành công, nhưng không thể cập nhật dữ liệu mới."
            );
          });
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error("Lỗi khi xóa sản phẩm:", error);
        alert("Đã xảy ra lỗi khi xóa sản phẩm");
      });
  }
}

// function xoaSanPham(masp, tensp) {
//   if (window.confirm("Bạn có chắc muốn xóa " + tensp)) {
//     // Xóa
//     for (var i = 0; i < list_products0.length; i++) {
//       if (list_products0[i].masp == masp) {
//         list_products0.splice(i, 1);
//       }
//     }

//     // Lưu vào localstorage
//     setListProducts(list_products0);

//     // Vẽ lại table

//     addTableProducts();
//     addTableProducts1();
//     addTableProducts2();
//   }
// }
function xoaSanPham1(masp, tensp) {
  if (window.confirm("Bạn có chắc muốn xóa " + tensp)) {
    // Dữ liệu yêu cầu POST
    var requestData = {
      masp: masp,
      table: "product1", // Thay đổi tên bảng tương ứng
    };

    // Gửi yêu cầu POST đến tệp PHP xử lý việc xóa sản phẩm
    fetch("./data/deleteproduct.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.text())
      .then((data) => {
        // Hiển thị thông báo kết quả
        fetch("./data/product1.php")
          .then((response) => response.json())
          .then((data) => {
            // Cập nhật lại dữ liệu list_products0 với dữ liệu mới
            list_products1 = data;
            // Hiển thị lại bảng sản phẩm sau khi cập nhật dữ liệu
            alert("Xóa " + tensp + " thành công");
            addTableProducts();
            addTableProducts1();
            addTableProducts2();
          })
          .catch((error) => {
            console.error("Lỗi khi lấy dữ liệu mới:", error);
            alert(
              "Xóa " +
                tensp +
                " thành công, nhưng không thể cập nhật dữ liệu mới."
            );
          });
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error("Lỗi khi xóa sản phẩm:", error);
        alert("Đã xảy ra lỗi khi xóa sản phẩm");
      });
  }
}

function xoaSanPham2(masp, tensp) {
  if (window.confirm("Bạn có chắc muốn xóa " + tensp)) {
    // Dữ liệu yêu cầu POST
    var requestData = {
      masp: masp,
      table: "product2", // Thay đổi tên bảng tương ứng
    };

    // Gửi yêu cầu POST đến tệp PHP xử lý việc xóa sản phẩm
    fetch("./data/deleteproduct.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.text())
      .then((data) => {
        // Hiển thị thông báo kết quả
        fetch("./data/product2.php")
          .then((response) => response.json())
          .then((data) => {
            // Cập nhật lại dữ liệu list_products0 với dữ liệu mới
            list_products2 = data;
            // Hiển thị lại bảng sản phẩm sau khi cập nhật dữ liệu
            alert("Xóa " + tensp + " thành công");
            addTableProducts();
            addTableProducts1();
            addTableProducts2();
          })
          .catch((error) => {
            console.error("Lỗi khi lấy dữ liệu mới:", error);
            alert(
              "Xóa " +
                tensp +
                " thành công, nhưng không thể cập nhật dữ liệu mới."
            );
          });
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error("Lỗi khi xóa sản phẩm:", error);
        alert("Đã xảy ra lỗi khi xóa sản phẩm");
      });
  }
}

// Sửa

function addKhungSuaSanPham(masp) {
  var sp;
  for (var p of list_products0) {
    if (p.masp == masp) {
      sp = p;
    }
  }

  var s =
    `<span class="close" onclick="this.parentElement.style.transform = 'scale(0)';">&times;</span>
    <table class="overlayTable table-outline table-content table-header">
        <tr>
            <th colspan="2">` +
    sp.name +
    `</th>
        </tr>
        <tr>
            <td>Mã sản phẩm:</td>
            <td><input type="text" value="` +
    sp.masp +
    `"></td>
        </tr>
        <tr>
            <td>Tên sẩn phẩm:</td>
            <td><input type="text" value="` +
    sp.name +
    `"></td>
        </tr>
        <tr>
            <td>Hãng:</td>
            <td>
                <select>`;

  var company = [
    "Apple",
    "Samsung",
    "Oppo",
    "Nokia",
    "Huawei",
    "Xiaomi",
    "Realme",
    "Vivo",
    "Philips",
    "Mobell",
    "Mobiistar",
    "Itel",
    "Coolpad",
    "HTC",
    "Motorola",
  ];
  for (var c of company) {
    if (sp.company == c)
      s += `<option value="` + c + `" selected>` + c + `</option>`;
    else s += `<option value="` + c + `">` + c + `</option>`;
  }

  s +=
    `
                </select>
            </td>
        </tr>
        <tr>
            <td>Hình:</td>
            <td>
                <img class="hinhDaiDien" id="anhDaiDienSanPhamSua" src="` +
    sp.img +
    `">
                <input type="file" accept="image/*" onchange="capNhatAnhSanPham(this.files, 'anhDaiDienSanPhamSua')">
            </td>
        </tr>
        <tr>
            <td>Giá tiền (số nguyên):</td>
            <td><input type="text" value="` +
    stringToNum(sp.price) +
    `"></td>
        </tr>
        <tr>
            <td>Số lượng:</td>
            <td><input type="text" type="text" value="` +
    sp.count +
    `"/></td>
          </tr>
        <tr>
            <td>Số sao (số nguyên 0->5):</td>
            <td><input type="text" value="` +
    sp.star +
    `"></td>
        </tr>
        <tr>
            <td>Đánh giá (số nguyên):</td>
            <td><input type="text" value="` +
    sp.rateCount +
    `"></td>
        </tr>
        <tr>
            <td>Khuyến mãi:</td>
            <td>
                <select>
                    <option value="">Không</option>
                    <option value="tragop" ` +
    (sp.promo.name == "tragop" ? "selected" : "") +
    `>Trả góp</option>
                    <option value="giamgia" ` +
    (sp.promo.name == "giamgia" ? "selected" : "") +
    `>Giảm giá</option>
                    <option value="giareonline" ` +
    (sp.promo.name == "giareonline" ? "selected" : "") +
    `>Giá rẻ online</option>
                    <option value="moiramat" ` +
    (sp.promo.name == "moiramat" ? "selected" : "") +
    `>Mới ra mắt</option>
                </select>
            </td>
        </tr>
        <tr>
            <td>Giá trị khuyến mãi:</td>
            <td><input type="text" value="` +
    sp.promo.value +
    `"></td>
        </tr>
        <tr>
            <th colspan="2">Thông số kĩ thuật</th>
        </tr>
        <tr>
            <td>Màn hình:</td>
            <td><input type="text" value="` +
    sp.detail.screen +
    `"></td>
        </tr>
        <tr>
            <td>Hệ điều hành:</td>
            <td><input type="text" value="` +
    sp.detail.os +
    `"></td>
        </tr>
        <tr>
            <td>Camara sau:</td>
            <td><input type="text" value="` +
    sp.detail.camara +
    `"></td>
        </tr>
        <tr>
            <td>Camara trước:</td>
            <td><input type="text" value="` +
    sp.detail.camaraFront +
    `"></td>
        </tr>
        <tr>
            <td>CPU:</td>
            <td><input type="text" value="` +
    sp.detail.cpu +
    `"></td>
        </tr>
        <tr>
            <td>RAM:</td>
            <td><input type="text" value="` +
    sp.detail.ram +
    `"></td>
        </tr>
        <tr>
            <td>Màu sắc:</td>
            <td><input type="text" value="` +
    sp.detail.color +
    `"></td>
        </tr>
        <tr>
            <td>Bộ nhớ trong:</td>
            <td><input type="text" value="` +
    sp.detail.rom +
    `"></td>
        </tr>
        <tr>
            <td>Thẻ nhớ:</td>
            <td><input type="text" value="` +
    sp.detail.microUSB +
    `"></td>
        </tr>
        <tr>
            <td>Dung lượng Pin:</td>
            <td><input type="text" value="` +
    sp.detail.battery +
    `"></td>
        </tr>
        <tr>
            <td>Loại sản phẩm:</td>
            <td><input type="text" value="` +
    sp.detail.loai +
    `"></td>
        </tr>
        <tr>
            <td colspan="2"  class="table-footer"> <button onclick="suaSanPham('` +
    sp.masp +
    `','` +
    sp.name +
    `')">SỬA</button> </td>
        </tr>
    </table>`;
  var khung = document.getElementById("khungSuaSanPham");
  khung.innerHTML = s;
  khung.style.transform = "scale(1)";
}
function addKhungSuaSanPham1(masp) {
  var sp;
  for (var p of list_products1) {
    if (p.masp == masp) {
      sp = p;
    }
  }

  var s =
    `<span class="close" onclick="this.parentElement.style.transform = 'scale(0)';">&times;</span>
    <table class="overlayTable table-outline table-content table-header">
        <tr>
            <th colspan="2">` +
    sp.name +
    `</th>
        </tr>
        <tr>
            <td>Mã sản phẩm:</td>
            <td><input type="text" value="` +
    sp.masp +
    `"></td>
        </tr>
        <tr>
            <td>Tên sẩn phẩm:</td>
            <td><input type="text" value="` +
    sp.name +
    `"></td>
        </tr>
        <tr>
            <td>Hãng:</td>
            <td>
                <select>`;

  var company = [
    "lenovo",
    "macbook",
    "dell",
    "hp",
    "asus",
    "acer",
    "msi",
    "itel",
    "gigabyte",
    "surface",
    "masstel",
    "lg",
  ];
  for (var c of company) {
    if (sp.company == c)
      s += `<option value="` + c + `" selected>` + c + `</option>`;
    else s += `<option value="` + c + `">` + c + `</option>`;
  }

  s +=
    `
                </select>
            </td>
        </tr>
        <tr>
            <td>Hình:</td>
            <td>
                <img class="hinhDaiDien" id="anhDaiDienSanPhamSua" src="` +
    sp.img +
    `">
                <input type="file" accept="image/*" onchange="capNhatAnhSanPham(this.files, 'anhDaiDienSanPhamSua')">
            </td>
        </tr>
        <tr>
            <td>Giá tiền (số nguyên):</td>
            <td><input type="text" value="` +
    stringToNum(sp.price) +
    `"></td>
        </tr>
        <tr>
            <td>Số lượng:</td>
            <td><input type="text" type="text" value="` +
    sp.count +
    `"/></td>
          </tr>
        <tr>
            <td>Số sao (số nguyên 0->5):</td>
            <td><input type="text" value="` +
    sp.star +
    `"></td>
        </tr>
        <tr>
            <td>Đánh giá (số nguyên):</td>
            <td><input type="text" value="` +
    sp.rateCount +
    `"></td>
        </tr>
        <tr>
            <td>Khuyến mãi:</td>
            <td>
                <select>
                    <option value="">Không</option>
                    <option value="tragop" ` +
    (sp.promo.name == "tragop" ? "selected" : "") +
    `>Trả góp</option>
                    <option value="giamgia" ` +
    (sp.promo.name == "giamgia" ? "selected" : "") +
    `>Giảm giá</option>
                    <option value="giareonline" ` +
    (sp.promo.name == "giareonline" ? "selected" : "") +
    `>Giá rẻ online</option>
                    <option value="moiramat" ` +
    (sp.promo.name == "moiramat" ? "selected" : "") +
    `>Mới ra mắt</option>
                </select>
            </td>
        </tr>
        <tr>
            <td>Giá trị khuyến mãi:</td>
            <td><input type="text" value="` +
    sp.promo.value +
    `"></td>
        </tr>
        <tr>
            <th colspan="2">Thông số kĩ thuật</th>
        </tr>
        <tr>
            <td>Màn hình:</td>
            <td><input type="text" value="` +
    sp.detail.screen +
    `"></td>
        </tr>
        <tr>
            <td>Hệ điều hành:</td>
            <td><input type="text" value="` +
    sp.detail.os +
    `"></td>
        </tr>
        <tr>
            <td>Camara sau:</td>
            <td><input type="text" value="` +
    sp.detail.camara +
    `"></td>
        </tr>
        <tr>
            <td>Camara trước:</td>
            <td><input type="text" value="` +
    sp.detail.camaraFront +
    `"></td>
        </tr>
        <tr>
            <td>CPU:</td>
            <td><input type="text" value="` +
    sp.detail.cpu +
    `"></td>
        </tr>
        <tr>
            <td>RAM:</td>
            <td><input type="text" value="` +
    sp.detail.ram +
    `"></td>
        </tr>
        <tr>
            <td>Màu sắc:</td>
            <td><input type="text" value="` +
    sp.detail.color +
    `"></td>
        </tr>
        <tr>
            <td>Bộ nhớ trong:</td>
            <td><input type="text" value="` +
    sp.detail.rom +
    `"></td>
        </tr>
        <tr>
            <td>Thẻ nhớ:</td>
            <td><input type="text" value="` +
    sp.detail.microUSB +
    `"></td>
        </tr>
        <tr>
            <td>Dung lượng Pin:</td>
            <td><input type="text" value="` +
    sp.detail.battery +
    `"></td>
        </tr>
        <tr>
            <td>Loại sản phẩm:</td>
            <td><input type="text" value="` +
    sp.detail.loai +
    `"></td>
        </tr>
        <tr>
            <td colspan="2"  class="table-footer"> <button onclick="suaSanPham1('` +
    sp.masp +
    `','` +
    sp.name +
    `')">SỬA</button> </td>
        </tr>
    </table>`;
  var khung = document.getElementById("khungSuaSanPham1");
  khung.innerHTML = s;
  khung.style.transform = "scale(1)";
}
function addKhungSuaSanPham2(masp) {
  var sp;
  for (var p of list_products2) {
    if (p.masp == masp) {
      sp = p;
    }
  }

  var s =
    `<span class="close" onclick="this.parentElement.style.transform = 'scale(0)';">&times;</span>
    <table class="overlayTable table-outline table-content table-header">
        <tr>
            <th colspan="2">` +
    sp.name +
    `</th>
        </tr>
        <tr>
            <td>Mã sản phẩm:</td>
            <td><input type="text" value="` +
    sp.masp +
    `"></td>
        </tr>
        <tr>
            <td>Tên sẩn phẩm:</td>
            <td><input type="text" value="` +
    sp.name +
    `"></td>
        </tr>
        <tr>
            <td>Hãng:</td>
            <td>
                <select>`;

  var company = [
    "lenovo",
    "macbook",
    "dell",
    "hp",
    "asus",
    "acer",
    "msi",
    "itel",
    "gigabyte",
    "surface",
    "masstel",
    "lg",
  ];
  for (var c of company) {
    if (sp.company == c)
      s += `<option value="` + c + `" selected>` + c + `</option>`;
    else s += `<option value="` + c + `">` + c + `</option>`;
  }

  s +=
    `
                </select>
            </td>
        </tr>
        <tr>
            <td>Hình:</td>
            <td>
                <img class="hinhDaiDien" id="anhDaiDienSanPhamSua" src="` +
    sp.img +
    `">
                <input type="file" accept="image/*" onchange="capNhatAnhSanPham(this.files, 'anhDaiDienSanPhamSua')">
            </td>
        </tr>
        <tr>
            <td>Giá tiền (số nguyên):</td>
            <td><input type="text" value="` +
    stringToNum(sp.price) +
    `"></td>
        </tr>
        <tr>
            <td>Số lượng:</td>
            <td><input type="text" type="text" value="` +
    sp.count +
    `"/></td>
          </tr>
        <tr>
            <td>Số sao (số nguyên 0->5):</td>
            <td><input type="text" value="` +
    sp.star +
    `"></td>
        </tr>
        <tr>
            <td>Đánh giá (số nguyên):</td>
            <td><input type="text" value="` +
    sp.rateCount +
    `"></td>
        </tr>
        <tr>
            <td>Khuyến mãi:</td>
            <td>
                <select>
                    <option value="">Không</option>
                    <option value="tragop" ` +
    (sp.promo.name == "tragop" ? "selected" : "") +
    `>Trả góp</option>
                    <option value="giamgia" ` +
    (sp.promo.name == "giamgia" ? "selected" : "") +
    `>Giảm giá</option>
                    <option value="giareonline" ` +
    (sp.promo.name == "giareonline" ? "selected" : "") +
    `>Giá rẻ online</option>
                    <option value="moiramat" ` +
    (sp.promo.name == "moiramat" ? "selected" : "") +
    `>Mới ra mắt</option>
                </select>
            </td>
        </tr>
        <tr>
            <td>Giá trị khuyến mãi:</td>
            <td><input type="text" value="` +
    sp.promo.value +
    `"></td>
        </tr>
        <tr>
            <th colspan="2">Thông số kĩ thuật</th>
        </tr>
        <tr>
            <td>Màn hình:</td>
            <td><input type="text" value="` +
    sp.detail.screen +
    `"></td>
        </tr>
        <tr>
            <td>Hệ điều hành:</td>
            <td><input type="text" value="` +
    sp.detail.os +
    `"></td>
        </tr>
        <tr>
            <td>Camara sau:</td>
            <td><input type="text" value="` +
    sp.detail.camara +
    `"></td>
        </tr>
        <tr>
            <td>Camara trước:</td>
            <td><input type="text" value="` +
    sp.detail.camaraFront +
    `"></td>
        </tr>
        <tr>
            <td>CPU:</td>
            <td><input type="text" value="` +
    sp.detail.cpu +
    `"></td>
        </tr>
        <tr>
            <td>RAM:</td>
            <td><input type="text" value="` +
    sp.detail.ram +
    `"></td>
        </tr>
        <tr>
            <td>Màu sắc:</td>
            <td><input type="text" value="` +
    sp.detail.color +
    `"></td>
        </tr>
        <tr>
            <td>Bộ nhớ trong:</td>
            <td><input type="text" value="` +
    sp.detail.rom +
    `"></td>
        </tr>
        <tr>
            <td>Thẻ nhớ:</td>
            <td><input type="text" value="` +
    sp.detail.microUSB +
    `"></td>
        </tr>
        <tr>
            <td>Dung lượng Pin:</td>
            <td><input type="text" value="` +
    sp.detail.battery +
    `"></td>
        </tr>
        <tr>
            <td>Loại sản phẩm:</td>
            <td><input type="text" value="` +
    sp.detail.loai +
    `"></td>
        </tr>
        <tr>
            <td colspan="2"  class="table-footer"> <button onclick="suaSanPham2('` +
    sp.masp +
    `','` +
    sp.name +
    `')">SỬA</button> </td>
        </tr>
    </table>`;
  var khung = document.getElementById("khungSuaSanPham2");
  khung.innerHTML = s;
  khung.style.transform = "scale(1)";
}
// Cập nhật ảnh sản phẩm
function capNhatAnhSanPham(files, id) {
  const reader = new FileReader();
  reader.addEventListener(
    "load",
    function () {
      // convert image file to base64 string
      previewSrc = reader.result;
      document.getElementById(id).src = previewSrc;
    },
    false
  );

  if (files[0]) {
    reader.readAsDataURL(files[0]);
  }
}

// Sắp Xếp sản phẩm
function sortProductsTable(loai) {
  var list = document
    .getElementsByClassName("sanpham")[0]
    .getElementsByClassName("table-content")[0];
  var tr = list.getElementsByTagName("tr");

  quickSort(tr, 0, tr.length - 1, loai, getValueOfTypeInTable_SanPham); // type cho phép lựa chọn sort theo mã hoặc tên hoặc giá ...
  decrease = !decrease;
}
function sortProductsTable1(loai) {
  var list = document
    .getElementsByClassName("sanpham1")[0]
    .getElementsByClassName("table-content")[0];
  var tr = list.getElementsByTagName("tr");

  quickSort(tr, 0, tr.length - 1, loai, getValueOfTypeInTable_SanPham); // type cho phép lựa chọn sort theo mã hoặc tên hoặc giá ...
  decrease = !decrease;
}
function sortProductsTable2(loai) {
  var list = document
    .getElementsByClassName("sanpham2")[0]
    .getElementsByClassName("table-content")[0];
  var tr = list.getElementsByTagName("tr");
  quickSort(tr, 0, tr.length - 1, loai, getValueOfTypeInTable_SanPham); // type cho phép lựa chọn sort theo mã hoặc tên hoặc giá ...
  decrease = !decrease;
}

// Lấy giá trị của loại(cột) dữ liệu nào đó trong bảng
function getValueOfTypeInTable_SanPham(tr, loai) {
  var td = tr.getElementsByTagName("td");

  switch (loai) {
    case "stt":
      return Number(td[0].innerHTML);
    case "masp":
      return td[1].innerHTML.toLowerCase();
    case "ten":
      return td[2].innerHTML.toLowerCase();
    case "sl":
      return Number(td[3].innerHTML);
    case "gia":
      return stringToNum(td[4].innerHTML);
    case "giacon":
      return stringToNum(td[5].innerHTML.replace(/[^\d.-]/g, ""));
    case "khuyenmai":
      return td[6].innerHTML.toLowerCase();
  }
  return false;
}

// ========================= Đơn Hàng ===========================
// Vẽ bảng
function addTableDonHang() {
  var tc = document
    .getElementsByClassName("donhang")[0]
    .getElementsByClassName("table-content")[0];
  var s = `<table class="table-outline hideImg">`;

  var listDH = getListDonHang();

  TONGTIEN = 0;
  for (var i = 0; i < listDH.length; i++) {
    var d = listDH[i];
    s +=
      `<tr>
            <td style="width: 5%">` +
      (i + 1) +
      `</td>
            <td style="width: 10%">` +
      d.madon +
      `<button class="copy-btn" onclick="copyContent(this)"></button>` + // Thêm nút Copy
      `</td>
            <td style="width: 10%">` +
      d.khach +
      `<button class="copy-btn" onclick="copyContent(this)"></button>` + // Thêm nút Copy
      `</td>
            <td style="width: 15%">` +
      d.sp +
      `<button class="copy-btn" onclick="copyContent(this)"></button>` + // Thêm nút Copy
      `</td>
            <td style="width: 10%">` +
      d.tongtien +
      `<button class="copy-btn" onclick="copyContent(this)"></button>` + // Thêm nút Copy
      `</td>
            <td style="width: 10%">` +
      d.ngaygio +
      `<button class="copy-btn" onclick="copyContent(this)"></button>` + // Thêm nút Copy
      `</td>
            <td style="width: 21%">` +
      d.thongtin +
      `<button class="copy-btn" onclick="copyContent(this)"></button>` + // Thêm nút Copy
      `</td>
            <td style="width: 7%">` +
      d.tinhTrang +
      `<button class="copy-btn" onclick="copyContent(this)"></button>` + // Thêm nút Copy
      `</td>
            <td style="width: 7%">
                <div class="tooltip">
                    <i class="fa fa-check" onclick="duyet('` +
      d.madon +
      `', true)"></i>
                    <span class="tooltiptext">Duyệt</span>
                </div>
                <div class="tooltip">
                    <i class="fa fa-remove" onclick="duyet('` +
      d.madon +
      `', false)"></i>
                    <span class="tooltiptext">Hủy</span>
                </div>
                
            </td>
        </tr>`;
    TONGTIEN += stringToNum(d.tongtien);
  }

  s += `</table>`;
  tc.innerHTML = s;
}

// Hàm copyContent để sao chép nội dung của ô khi nhấp vào nút Copy
function copyContent(button) {
  var td = button.parentNode;
  var content = td.textContent.trim();
  var textarea = document.createElement("textarea");
  textarea.value = content;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
  alert("Đã sao chép nội dung: " + content);
}

function getListDonHang(traVeDanhSachSanPham = false) {
  var u = getListUser();
  var result = [];
  for (var i = 0; i < u.length; i++) {
    for (var j = 0; j < u[i].donhang.length; j++) {
      // Tổng tiền
      var tongtien = 0;
      for (var s of u[i].donhang[j].sp) {
        var timsp = timKiemTheoMa(list_products, s.ma);
        if (timsp.promo.name == "giareonline")
          tongtien += stringToNum(timsp.promo.value);
        else tongtien += stringToNum(timsp.price);
      }
      // Ngày giờ
      var x = new Date(u[i].donhang[j].ngaymua).toLocaleString();
      if (u[i].donhang[j].thongtin.magiamgia == "giam10%") {
        tongtien -= tongtien / 10;
      }
      if (u[i].donhang[j].thongtin.magiamgia == "giam20%") {
        tongtien -= (tongtien / 100) * 20;
      }
      if (u[i].donhang[j].thongtin.magiamgia == "giam30%") {
        tongtien -= (tongtien / 100) * 30;
      }
      if (u[i].donhang[j].thongtin.magiamgia == "giam40%") {
        tongtien -= (tongtien / 100) * 40;
      }
      if (u[i].donhang[j].thongtin.magiamgia == "giam50%") {
        tongtien -= tongtien / 2;
      }
      if (u[i].donhang[j].thongtin.magiamgia == "giam100%") {
        tongtien = 0;
      }
      // Các sản phẩm - dạng html
      var sps = "";
      for (var s of u[i].donhang[j].sp) {
        sps +=
          `<p style="text-align: center">` +
          (timKiemTheoMa(list_products, s.ma).name +
            " " +
            s.mausac +
            " " +
            s.rom +
            " [" +
            s.soluong +
            "]") +
          `</p>`;
      }

      // Các sản phẩm - dạng mảng
      var danhSachSanPham = [];
      for (var s of u[i].donhang[j].sp) {
        danhSachSanPham.push({
          sanPham: timKiemTheoMa(list_products, s.ma),
          soLuong: s.soluong,
        });
      }
      console.log(u[i].donhang[j].madon);
      // Lưu vào result
      result.push({
        madon: u[i].donhang[j].madon,
        khach: u[i].username,
        sp: traVeDanhSachSanPham ? danhSachSanPham : sps,
        tongtien: numToString(tongtien),
        ngaygio: x,
        thongtin: `Họ tên: ${u[i].donhang[j].thongtin.hoTen}, Email: ${u[i].donhang[j].thongtin.email}, Số điện thoại: ${u[i].donhang[j].thongtin.soDienThoai},
         Địa chỉ: ${u[i].donhang[j].thongtin.tinh}-${u[i].donhang[j].thongtin.huyen}-${u[i].donhang[j].thongtin.xa},số nhà ${u[i].donhang[j].thongtin.diaChi},Lời Nhắn ${u[i].donhang[j].thongtin.loiNhan},${u[i].donhang[j].thongtin.phuongthuc},Mã giảm giá :${u[i].donhang[j].thongtin.magiamgia}`,
        tinhTrang: u[i].donhang[j].tinhTrang,
      });
    }
  }
  return result;
}

// Duyệt
function duyet(maDonHang, duyetDon) {
  var u = getListUser();
  for (var i = 0; i < u.length; i++) {
    for (var j = 0; j < u[i].donhang.length; j++) {
      if (u[i].donhang[j].madon == maDonHang) {
        if (duyetDon) {
          if (u[i].donhang[j].tinhTrang == "Đang chờ xử lý") {
            u[i].donhang[j].tinhTrang = "Đã giao hàng";
            var requestData = {
              madon: maDonHang,
              tinhTrang: duyetDon ? "Đã giao hàng" : "Đã hủy",
            };

            // Gửi yêu cầu HTTP POST đến tệp PHP để cập nhật trạng thái
            fetch("./data/updatestatus.php", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(requestData),
            })
              .then((response) => response.text())
              .then((data) => {
                console.log(data);
                setListUser(u);
                addTableDonHang();
                addThongKe();
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          } else if (u[i].donhang[j].tinhTrang == "Đã hủy") {
            alert("Không thể duyệt đơn đã hủy !");
            return;
          }
        } else {
          if (u[i].donhang[j].tinhTrang == "Đang chờ xử lý") {
            if (
              window.confirm(
                "Bạn có chắc muốn hủy đơn hàng này. Hành động này sẽ không thể khôi phục lại !"
              )
            ) {
              u[i].donhang[j].tinhTrang = "Đã hủy";
              var requestData = {
                madon: maDonHang,
                tinhTrang: duyetDon ? "Đã giao hàng" : "Đã hủy",
              };

              // Gửi yêu cầu HTTP POST đến tệp PHP để cập nhật trạng thái
              fetch("./data/updatestatus.php", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
              })
                .then((response) => response.text())
                .then((data) => {
                  console.log(data);
                  setListUser(u);
                  addTableDonHang();
                  addThongKe();
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
              break; // Thêm break để dừng vòng lặp sau khi xử lý xong
            }
          } else if (u[i].donhang[j].tinhTrang == "Đã giao hàng") {
            alert("Không thể hủy đơn hàng đã giao !");
            return;
          } else if (u[i].donhang[j].tinhTrang == "Đã hủy") {
            if (window.confirm("Đồng ý xóa đơn hàng !")) {
              var requestData = {
                madon: maDonHang,
              };
              fetch("./data/deletestatus.php", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
              })
                .then((response) => response.text())
                .then((data) => {
                  console.log(data);
                  console.log("Đơn hàng được chọn để xóa:", u[i].donhang[j]);
                  u[i].donhang.splice(j, 1);

                  setListUser(u);
                  addTableDonHang();
                  addThongKe();
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
            }
            return;
          }
        }
        break;
      }
    }
  }
  // lưu lại
  setListUser(u);
  // vẽ lại
  addTableDonHang();
}

function locDonHangTheoKhoangNgay() {
  var from = document.getElementById("fromDate").valueAsDate;
  var to = document.getElementById("toDate").valueAsDate;
  console.log(from);
  console.log(to);
  if (!from || !to) {
    alert("Vui lòng nhập cả ngày bắt đầu và ngày kết thúc");
    return; // Dừng hàm nếu không nhập đủ ngày
  }
  if (from > to) {
    alert("Ngày bắt đầu không thể lớn hơn ngày kết thúc");
    return; // Dừng hàm nếu ngày bắt đầu lớn hơn ngày kết thúc
  }

  var listTr_table = document
    .getElementsByClassName("donhang")[0]
    .getElementsByClassName("table-content")[0]
    .getElementsByTagName("tr");
  for (var tr of listTr_table) {
    var td = tr.getElementsByTagName("td")[5].innerHTML;
    console.log(td);
    // Tách chuỗi thành ngày và thời gian
    var dateTimeParts = td.split(" ");
    var timePart = dateTimeParts[0];
    var datePart = dateTimeParts[1];

    // Tách ngày, tháng và năm từ phần datePart
    var dateParts = datePart.split("/");
    var day = parseInt(dateParts[0]);
    var month = parseInt(dateParts[1]) - 1; // Lưu ý: Tháng trong JavaScript bắt đầu từ 0 (0 - 11)
    var year = parseInt(dateParts[2]);

    // Tách giờ, phút và giây từ phần timePart
    var timeParts = timePart.split(":");
    var hours = parseInt(timeParts[0]);
    var minutes = parseInt(timeParts[1]);
    var seconds = parseInt(timeParts[2]);

    // Tạo đối tượng Date từ các phần tách được
    var d = new Date(year, month, day, hours, minutes, seconds);
    console.log(d);
    if (d >= from && d <= to) {
      tr.style.display = "";
    } else {
      tr.style.display = "none";
    }
  }
}

function timKiemDonHang(inp) {
  var kieuTim = document.getElementsByName("kieuTimDonHang")[0].value;
  var text = inp.value;

  // Lọc
  var vitriKieuTim = { ma: 1, khachhang: 2, trangThai: 7 };

  var listTr_table = document
    .getElementsByClassName("donhang")[0]
    .getElementsByClassName("table-content")[0]
    .getElementsByTagName("tr");
  for (var tr of listTr_table) {
    var td = tr
      .getElementsByTagName("td")
      [vitriKieuTim[kieuTim]].innerHTML.toLowerCase();

    if (td.indexOf(text.toLowerCase()) < 0) {
      tr.style.display = "none";
    } else {
      tr.style.display = "";
    }
  }
}

// Sắp xếp
function sortDonHangTable(loai) {
  var list = document
    .getElementsByClassName("donhang")[0]
    .getElementsByClassName("table-content")[0];
  var tr = list.getElementsByTagName("tr");

  quickSort(tr, 0, tr.length - 1, loai, getValueOfTypeInTable_DonHang);
  decrease = !decrease;
}

// Lấy giá trị của loại(cột) dữ liệu nào đó trong bảng
function getValueOfTypeInTable_DonHang(tr, loai) {
  var td = tr.getElementsByTagName("td");
  switch (loai) {
    case "stt":
      return Number(td[0].innerHTML);
    case "ma":
      return new Date(td[1].innerHTML); // chuyển về dạng ngày để so sánh ngày
    case "khach":
      return td[2].innerHTML.toLowerCase(); // lấy tên khách
    case "sanpham":
      return td[3].children.length; // lấy số lượng hàng trong đơn này, length ở đây là số lượng <p>
    case "tongtien":
      return stringToNum(td[4].innerHTML); // trả về dạng giá tiền
    case "ngaygio":
      return new Date(td[5].innerHTML); // chuyển về ngày
    case "trangthai":
      return td[7].innerHTML.toLowerCase(); //
  }
  return false;
}

// ====================== Khách Hàng =============================
// Vẽ bảng
function addTableKhachHang() {
  var tc = document
    .getElementsByClassName("khachhang")[0]
    .getElementsByClassName("table-content")[0];
  var s = `<table class="table-outline hideImg">`;

  var listUser = getListUser();

  for (var i = 0; i < listUser.length; i++) {
    var u = listUser[i];
    s +=
      `<tr>
            <td style="width: 5%">` +
      (i + 1) +
      `</td>
            <td style="width: 17%">` +
      u.ho +
      " " +
      u.ten +
      `</td>
            <td style="width: 22%">` +
      u.email +
      `</td>
            <td style="width: 16%">` +
      u.username +
      `</td>
            <td style="width: 31%">` +
      u.pass +
      `</td>
            <td style="width: 9%">
                <div class="tooltip">
                    <label class="switch">
                        <input type="checkbox" ` +
      (u.locker == "T" ? "" : "checked") +
      ` onclick="voHieuHoaNguoiDung(this, '` +
      u.username +
      `')">
                        <span class="slider round"></span>
                    </label>
                    <span class="tooltiptext">` +
      (u.locker == "T" ? "Mở" : "Khóa") +
      `</span>
                </div>
                <div class="tooltip">
                    <i class="fa fa-remove" onclick="xoaNguoiDung('` +
      u.username +
      `')"></i>
                    <span class="tooltiptext">Xóa</span>
                </div>
            </td>
        </tr>`;
  }

  s += `</table>`;
  tc.innerHTML = s;
}

// Tìm kiếm
function timKiemNguoiDung(inp) {
  var kieuTim = document.getElementsByName("kieuTimKhachHang")[0].value;
  var text = inp.value;

  // Lọc
  var vitriKieuTim = { ten: 1, email: 2, taikhoan: 3 };

  var listTr_table = document
    .getElementsByClassName("khachhang")[0]
    .getElementsByClassName("table-content")[0]
    .getElementsByTagName("tr");
  for (var tr of listTr_table) {
    var td = tr
      .getElementsByTagName("td")
      [vitriKieuTim[kieuTim]].innerHTML.toLowerCase();

    if (td.indexOf(text.toLowerCase()) < 0) {
      tr.style.display = "none";
    } else {
      tr.style.display = "";
    }
  }
}

// vô hiệu hóa người dùng (tạm dừng, không cho đăng nhập vào)
function voHieuHoaNguoiDung(inp, taikhoan) {
  var listUser = getListUser();
  for (var u of listUser) {
    if (u.username == taikhoan) {
      if (inp.checked) {
        // Thay đổi từ inp.locker thành inp.checked
        u.locker = "F";
      } else {
        u.locker = "T";
      }
      setListUser(u);
      var requestData = {
        old_email: u.email,
        user: u,
      };
      fetch("./data/updateuser.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.text())
        .then((data) => {
          setTimeout(
            () =>
              alert(
                `${inp.checked ? "Mở khóa" : "Khoá"} tài khoản ${
                  u.username
                } thành công.`
              ),
            500
          );
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      break;
    }
  }
  var span = inp.parentElement.nextElementSibling;
  span.innerHTML = inp.checked ? "Khóa" : "Mở";
}

// Xóa người dùng
function xoaNguoiDung(taikhoan) {
  if (
    window.confirm(
      "Xác nhận xóa " +
        taikhoan +
        "? \nMọi dữ liệu về " +
        taikhoan +
        " sẽ mất! Bao gồm cả những đơn hàng của " +
        taikhoan
    )
  ) {
    var listuser = getListUser();
    fetch("./data/deleteuser.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taikhoan: taikhoan }),
    })
      .then((response) => response.text())
      .then((data) => {
        for (var i = 0; i < listuser.length; i++) {
          if (listuser[i].username == taikhoan) {
            listuser.splice(i, 1); // xóa
            setListUser(listuser); // lưu thay đổi
            localStorage.removeItem("CurrentUser"); // đăng xuất khỏi tài khoản hiện tại (current user)
            addTableKhachHang(); // vẽ lại bảng khách hàng
            addTableDonHang(); // vẽ lại bảng đơn hàng
            return;
          }
        }
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error("Lỗi khi xóa sản phẩm:", error);
        alert("Đã xảy ra lỗi khi xóa sản phẩm");
      });
  }
}

// Sắp xếp
function sortKhachHangTable(loai) {
  var list = document
    .getElementsByClassName("khachhang")[0]
    .getElementsByClassName("table-content")[0];
  var tr = list.getElementsByTagName("tr");

  quickSort(tr, 0, tr.length - 1, loai, getValueOfTypeInTable_KhachHang);
  decrease = !decrease;
}

function getValueOfTypeInTable_KhachHang(tr, loai) {
  var td = tr.getElementsByTagName("td");
  switch (loai) {
    case "stt":
      return Number(td[0].innerHTML);
    case "hoten":
      return td[1].innerHTML.toLowerCase();
    case "email":
      return td[2].innerHTML.toLowerCase();
    case "taikhoan":
      return td[3].innerHTML.toLowerCase();
    case "matkhau":
      return td[4].innerHTML.toLowerCase();
  }
  return false;
}
function addTableTinTuc() {
  var tc = document
    .getElementsByClassName("tintuc")[0]
    .getElementsByClassName("table-content")[0];
  var s = `<table class="table-outline hideImg">`;

  var listNew = listNews;
  console.log(listNew);
  for (var i = 0; i < listNew.length; i++) {
    var u = listNew[i];
    s +=
      `
    <tr>
      <td style="width: 5%">${i + 1}</td>
      <td style="width: 10%;padding:10px"><img src="${
        u.image
      }" alt="Image" style="width: 150px; height: 100%; "></td>
      <td style="width: 25%">${u.title}</td>
      <td style="width: 30%"><a href="${u.link}" target="_blank">${
        u.link
      }</a></td>
      <td style="width: 10%">${u.web}</td>
      <td style="width: 10%">${u.time}</td>
      <td style="width: 15%">
        <div class="tooltip">
          <i class="fa fa-wrench" onclick="addKhungSuaTinTuc('` +
      u.title +
      `')"></i>
          <span class="tooltiptext">Sửa</span>
        </div>
        <div class="tooltip">
        <i class="fa fa-trash" onclick="xoaTinTuc('` +
      u.title +
      `')"></i>
          <span class="tooltiptext">Xóa</span>
        </div>
      </td>
    </tr>
`;
  }

  s += `</table>`;
  tc.innerHTML = s;
}
// ================== Sort ====================

var decrease = true; // Sắp xếp giảm dần

// loại là tên cột, func là hàm giúp lấy giá trị từ cột loai
function quickSort(arr, left, right, loai, func) {
  var pivot, partitionIndex;

  if (left < right) {
    pivot = right;
    partitionIndex = partition(arr, pivot, left, right, loai, func);

    //sort left and right
    quickSort(arr, left, partitionIndex - 1, loai, func);
    quickSort(arr, partitionIndex + 1, right, loai, func);
  }
  return arr;
}
// hàm của sắp xếp
function partition(arr, pivot, left, right, loai, func) {
  var pivotValue = func(arr[pivot], loai),
    partitionIndex = left;

  for (var i = left; i < right; i++) {
    if (
      (decrease && func(arr[i], loai) > pivotValue) ||
      (!decrease && func(arr[i], loai) < pivotValue)
    ) {
      swap(arr, i, partitionIndex);
      partitionIndex++;
    }
  }
  swap(arr, right, partitionIndex);
  return partitionIndex;
}

function swap(arr, i, j) {
  var tempi = arr[i].cloneNode(true);
  var tempj = arr[j].cloneNode(true);
  arr[i].parentNode.replaceChild(tempj, arr[i]);
  arr[j].parentNode.replaceChild(tempi, arr[j]);
}

// ================= các hàm thêm ====================
// Chuyển khuyến mãi vễ dạng chuỗi tiếng việt
function promoToStringValue(pr) {
  switch (pr.name) {
    case "tragop":
      return "Góp " + pr.value + "%";
    case "giamgia":
      return "Giảm " + pr.value;
    case "giareonline":
      return "Online (" + pr.value + ")";
    case "moiramat":
      return "Mới";
  }
  return "";
}

function progress(percent, bg, width, height) {
  return (
    `<div class="progress" style="width: ` +
    width +
    `; height:` +
    height +
    `">
                <div class="progress-bar bg-info" style="width: ` +
    percent +
    `%; background-color:` +
    bg +
    `"></div>
            </div>`
  );
}
function ThemtaiKhoan() {
  var u = getListUser();
  var NewTk = layThongTinTaiKhoanTuTable("KhungThemTaiKhoan");
  if (!NewTk) return;

  // Kiểm tra điều kiện đúng kiểu email
  var emailRegex = /^[a-zA-Z0-9._%+-]+@gmail.com$/;
  if (!emailRegex.test(NewTk.email)) {
    alert("Vui lòng nhập địa chỉ email hợp lệ (@gmail.com).");
    return;
  }

  // Kiểm tra mật khẩu tối thiểu 8 ký tự, phải có ít nhất một chữ hoa, một chữ thường và một số
  var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordRegex.test(NewTk.pass)) {
    alert(
      "Mật khẩu phải tối thiểu 8 ký tự và bao gồm ít nhất một chữ cái viết hoa, một chữ cái viết thường và một số."
    );
    return;
  }
  sha256(NewTk.pass).then(function (hashedPass) {
    var userData = new User(
      NewTk.username,
      hashedPass,
      NewTk.ho,
      NewTk.ten,
      NewTk.email
    );
    fetch("./data/adduser.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.text())
      .then((data) => {
        u.push(userData);
        // Lưu vào localstorage
        setListUser(u);
        addTableKhachHang();
        clearInputFields();
        alert('Thêm tài khoản "' + userData.ten + '" thành công.');
        document.getElementById("KhungThemTaiKhoan").style.transform =
          "scale(0)";
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error("Lỗi khi xóa sản phẩm:", error);
        alert("Đã xảy ra lỗi khi xóa sản phẩm");
      });
  });
  // Them tài khoản vào danh sách
}
function clearInputFields() {
  document.getElementById("ho").value = ""; // Thay "ho" bằng id của input họ
  document.getElementById("ten").value = ""; // Thay "ten" bằng id của input tên
  document.getElementById("email").value = ""; // Thay "email" bằng id của input email
  document.getElementById("user1").value = ""; // Thay "newUser" bằng id của input tên đăng nhập
  document.getElementById("pass").value = ""; // Thay "newPass" bằng id của input mật khẩu
}

function layThongTinTaiKhoanTuTable(id) {
  var khung = document.getElementById(id);
  var tr = khung.getElementsByTagName("tr");

  var ho = tr[1]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("input")[0].value;
  var ten = tr[2]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("input")[0].value;
  var email = tr[3]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("input")[0].value;
  var username = tr[4]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("input")[0].value;
  var pass = tr[5]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("input")[0].value;

  if (!ho || !ten || !email || !username || !pass) {
    alert("Vui lòng điền đầy đủ thông tin.");
    return false;
  }

  return {
    donhang: [],
    email: email,
    ho: ho,
    pass: pass,
    products: [],
    ten: ten,
    username: username,
  };
}
function ThemTinTuc() {
  var News = layThongTinTinTucTuTable("KhungThemTinTuc");
  if (!News) return;
  for (var p of listNews) {
    if (p.title == News.title) {
      alert("Tiêu đề bị trùng !!");
      return false;
    }
  }
  fetch("./data/addnews.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ news: News }),
  })
    .then((response) => response.text())
    .then((data) => {
      // Thực hiện các hành động sau khi dữ liệu đã được thêm thành công
      listNews.push(News);
      console.log(listNews);
      // Lưu vào localstorage
      addTableTinTuc();
      alert('Thêm tin tức "' + News.title + '" thành công.');
      document.getElementById("KhungThemTinTuc").style.transform = "scale(0)";
      clearInputNews();
      // Vẽ lại bảng nếu cần
    })
    .catch((error) => {
      console.error("Lỗi:", error); // Log lỗi nếu có
    });
}
function clearInputNews() {
  document.getElementById("title").value = ""; // Thay "ho" bằng id của input họ
  document.getElementById("link").value = ""; // Thay "ten" bằng id của input tên
  document.getElementById("web").value = ""; // Thay "email" bằng id của input email
}
function layThongTinTinTucTuTable(id) {
  var khung = document.getElementById(id);
  var tr = khung.getElementsByTagName("tr");

  var img = tr[1]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("img")[0].src;
  var title = tr[2]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("input")[0].value;
  var link = tr[3]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("input")[0].value;
  var web = tr[4]
    .getElementsByTagName("td")[1]
    .getElementsByTagName("input")[0].value;

  // if (!ho || !ten || !email || !username || !pass) {
  //   alert("Vui lòng điền đầy đủ thông tin.");
  //   return false;
  // }

  return {
    title: title,
    image: img,
    link: link,
    time: formatTimeTinTuc(),
    web: web,
  };
}
function formatTimeTinTuc() {
  // Chuyển đổi chuỗi thời gian sang đối tượng Date
  const dateTime = new Date();

  // Lấy các thành phần của thời gian
  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần cộng thêm 1
  const date = dateTime.getDate();
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();
  const seconds = dateTime.getSeconds();

  // Tạo chuỗi định dạng mới
  const formattedTime = `${year}-${month < 10 ? "0" + month : month}-${
    date < 10 ? "0" + date : date
  } ${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }:${seconds < 10 ? "0" + seconds : seconds}`;

  return formattedTime;
}
function xoaTinTuc(title) {
  if (window.confirm("Bạn có chắc muốn xóa tin tức " + title)) {
    // Xóa
    var requestData = {
      title: title,
    };

    // Gửi yêu cầu POST đến tệp PHP xử lý việc xóa sản phẩm
    fetch("./data/deletenews.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.text())
      .then((data) => {
        // Hiển thị thông báo kết quả
        fetch("./data/news.php")
          .then((response) => response.json())
          .then((data) => {
            // Cập nhật lại dữ liệu list_products0 với dữ liệu mới
            listNews = data;
            // Hiển thị lại bảng sản phẩm sau khi cập nhật dữ liệu
            alert("Xóa " + title + " thành công");
            addTableTinTuc();
          })
          .catch((error) => {
            console.error("Lỗi khi lấy dữ liệu mới:", error);
            alert(
              "Xóa " +
                title +
                " thành công, nhưng không thể cập nhật dữ liệu mới."
            );
          });
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error("Lỗi khi xóa sản phẩm:", error);
        alert("Đã xảy ra lỗi khi xóa sản phẩm");
      });
  }
}
function addKhungSuaTinTuc(title) {
  var tt;
  for (var p of listNews) {
    if (p.title == title) {
      tt = p;
    }
  }
  var s =
    `<span class="close" onclick="this.parentElement.style.transform = 'scale(0)';">&times;</span>
  <table class="overlayTable table-outline table-content table-header">
  <tr>
            <th colspan="2">` +
    tt.title +
    `</th>
        </tr>
     <tr>
        <td>Hình:</td>
        <td>
           <img class="hinhDaiDien" id="anhTinTucSua" src="` +
    tt.image +
    `">
           <input type="file" accept="image/*" onchange="capNhatAnhSanPham(this.files, 'anhTinTucSua')">
        </td>
     </tr>
     <tr>
            <td>Tiêu đề:</td>
            <td><input type="text" value="` +
    tt.title +
    `"></td>
        </tr>
        <tr>
            <td>Link:</td>
            <td><input type="text" value="` +
    tt.link +
    `"></td>
        </tr>
        <tr>
            <td>Web:</td>
            <td><input type="text" value="` +
    tt.web +
    `"></td>
        
     <tr>
        <td colspan="2"  class="table-footer"> <button onclick="suaTinTuc('` +
    tt.title +
    `')">SỬA</button> </td>
     </tr>
  </table>
  `;
  var khung = document.getElementById("khungSuaTinTuc");
  khung.innerHTML = s;
  khung.style.transform = "scale(1)";
}
function suaTinTuc(title) {
  var tt = layThongTinTinTucTuTable("khungSuaTinTuc");
  if (!tt) return;
  for (var p of listNews) {
    if (tt.title != title && p.title == tt.title) {
      alert("Title bị trùng !!");
      return false;
    }
  }
  var requestData = {
    old_title: title,
    new_title: tt.title,
    news: tt,
  };
  fetch("./data/updatenews.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => response.text())
    .then((data) => {
      fetch("./data/news.php")
        .then((response) => response.json())
        .then((data) => {
          // Cập nhật lại dữ liệu list_products0 với dữ liệu mới
          listNews = data;

          addTableTinTuc();
          alert("Sửa " + title + " thành công");

          document.getElementById("khungSuaTinTuc").style.transform =
            "scale(0)";

          // Hiển thị lại bảng sản phẩm sau khi cập nhật dữ liệu
        })
        .catch((error) => {
          console.error("Lỗi khi lấy dữ liệu mới:", error);
          alert(
            "Sửa " +
              title +
              " thành công, nhưng không thể cập nhật dữ liệu mới."
          );
        });
    })
    // Thực hiện các hành động sau khi dữ liệu đã được thêm thành công

    .catch((error) => {
      console.error("Lỗi:", error); // Log lỗi nếu có
    });
}
function sortNewsTable(loai) {
  var list = document
    .getElementsByClassName("tintuc")[0]
    .getElementsByClassName("table-content")[0];

  var tr = list.getElementsByTagName("tr");
  var td = tr.getElementsByTagName("td");

  quickSort(tr, 0, tr.length - 1, loai, Number(td[0].innerHTML)); // type cho phép lựa chọn sort theo mã hoặc tên hoặc giá ...
  decrease = !decrease;
}
function sortNewsTable(loai) {
  var list = document
    .getElementsByClassName("tintuc")[0]
    .getElementsByClassName("table-content")[0];
  var tr = list.getElementsByTagName("tr");
  quickSort(tr, 0, tr.length - 1, loai, getValueOfTypeInTable_TinTuc); // type cho phép lựa chọn sort theo mã hoặc tên hoặc giá ...
  decrease = !decrease;
}

// Lấy giá trị của loại(cột) dữ liệu nào đó trong bảng
function getValueOfTypeInTable_TinTuc(tr, loai) {
  var td = tr.getElementsByTagName("td");
  switch (loai) {
    case "stt":
      return Number(td[0].innerHTML);
    case "title":
      return td[2].innerHTML.toLowerCase();
    case "link":
      return td[3].innerHTML.toLowerCase();
    case "web":
      return td[4].innerHTML.toLowerCase();
    case "time":
      return td[5].innerHTML.toLowerCase();
  }
  return false;
}
function timKiemTinTuc(inp) {
  var kieuTim = document.getElementsByName("kieutimtintuc")[0].value;
  var text = inp.value;
  // Lọc
  var vitriKieuTim = { title: 2, link: 3, web: 4 };

  var listTr_table = document
    .getElementsByClassName("tintuc")[0]
    .getElementsByClassName("table-content")[0]
    .getElementsByTagName("tr");
  for (var tr of listTr_table) {
    var td = tr
      .getElementsByTagName("td")
      [vitriKieuTim[kieuTim]].innerHTML.toLowerCase();
    if (td.indexOf(text.toLowerCase()) < 0) {
      tr.style.display = "none";
    } else {
      tr.style.display = "";
    }
  }
}
function addSoLuong1(differentElements111) {
  for (var i = 0; i < list_products1.length; i++) {
    var p = list_products1[i];

    for (let tenDT in differentElements111) {
      if (tenDT == p.name) {
        p.count -= differentElements111[tenDT].soLuongBanRa;
        console.log(p.count);
      }
    }
    list_products1[i] = p;
  }
  setListProducts1(list_products1);
}
function addSoLuong0(differentElements111) {
  console.log(differentElements111);
  for (var i = 0; i < list_products0.length; i++) {
    var p = list_products0[i];

    for (let tenDT in differentElements111) {
      if (tenDT == p.name) {
        p.count -= differentElements111[tenDT].soLuongBanRa;
        console.log(p.count);
      }
    }
    list_products0[i] = p;
  }
  setListProducts(list_products0);
}
function addSoLuong2(differentElements111) {
  for (var i = 0; i < list_products2.length; i++) {
    var p = list_products2[i];

    for (let tenDT in differentElements111) {
      if (tenDT == p.name) {
        p.count -= differentElements111[tenDT].soLuongBanRa;
        console.log(p.count);
      }
    }
    list_products2[i] = p;
  }
  setListProducts2(list_products2);
}
function addSoLuong() {
  var danhSachDonHang = getListDonHang(true);

  // Thống kê hãng

  danhSachDonHang.forEach((donHang) => {
    // Nếu đơn hàng bị huỷ thì không tính vào số lượng bán ra
    if (donHang.tinhTrang === "Đã hủy") return;

    // Lặp qua từng sản phẩm trong đơn hàng
    donHang.sp.forEach((sanPhamTrongDonHang) => {
      let tenDT = sanPhamTrongDonHang.sanPham.name;
      let soLuong = sanPhamTrongDonHang.soLuong;

      if (!thongKeDT[tenDT]) {
        thongKeDT[tenDT] = {
          soLuongBanRa: 0,
        };
      }
      thongKeDT[tenDT].soLuongBanRa += soLuong;
    });
  });
  return thongKeDT;
}
function locBieuDoTheoKhoangNgay() {
  var fromDateInput = new Date(document.getElementById("fromDate1").value);
  var toDateInput = new Date(document.getElementById("toDate1").value);
  if (fromDateInput > toDateInput) {
    alert("Ngày bắt đầu không thể lớn hơn ngày kết thúc");
    return; // Dừng hàm nếu ngày bắt đầu lớn hơn ngày kết thúc
  }
  if (fromDateInput == "Invalid Date" || toDateInput == "Invalid Date") {
    alert("Vui lòng nhập cả ngày bắt đầu và ngày kết thúc");
    return; // Dừng hàm nếu không nhập đủ ngày
  }
  var danhSachDonHang = getListDonHang(true);

  // Lọc đơn hàng theo khoảng ngày
  var filteredDonHang = danhSachDonHang.filter((donHang) => {
    // Kiểm tra xem có ngày giờ không
    var dateTimeParts = donHang.ngaygio.split(" ");
    var datePart = dateTimeParts[1]; // Chỉ lấy phần ngày, bỏ qua phần thời gian
    var timePart = dateTimeParts[0];

    var dateParts = datePart.split("/");
    var day = parseInt(dateParts[0]);
    var month = parseInt(dateParts[1]) - 1;
    var year = parseInt(dateParts[2]);

    var timeParts = timePart.split(":");
    var hours = parseInt(timeParts[0]);
    var minutes = parseInt(timeParts[1]);
    var seconds = parseInt(timeParts[2]);

    var d = new Date(year, month, day, hours, minutes, seconds);

    return d >= fromDateInput && d <= toDateInput;
  });

  var thongKeHang = {}; // Thống kê hãng

  filteredDonHang.forEach((donHang) => {
    if (donHang.tinhTrang === "Đã hủy") return;
    donHang.sp.forEach((sanPhamTrongDonHang) => {
      let tenHang = sanPhamTrongDonHang.sanPham.company;
      let soLuong = sanPhamTrongDonHang.soLuong;
      let donGia = stringToNum(sanPhamTrongDonHang.sanPham.price);
      let thanhTien = soLuong * donGia;

      if (!thongKeHang[tenHang]) {
        thongKeHang[tenHang] = {
          soLuongBanRa: 0,
          doanhThu: 0,
        };
      }

      thongKeHang[tenHang].soLuongBanRa += soLuong;
      thongKeHang[tenHang].doanhThu += thanhTien;
    });
  });

  let tongDoanhThu = 0;
  let tongBan = 0;
  for (let tenHang in thongKeHang) {
    tongDoanhThu += thongKeHang[tenHang].doanhThu;
    tongBan += thongKeHang[tenHang].soLuongBanRa;
  }
  document.getElementById("addtotal").innerHTML = "";
  var divThongKe = document.getElementById("addtotal");
  divThongKe.innerHTML = `
    <p>Tổng số lượng bán ra: ${tongBan} sản phẩm</p>
    <p>Tổng doanh thu: ${tongDoanhThu.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    })}</p>
  `;

  let colors = getListRandomColor(Object.keys(thongKeHang).length);

  // Xóa các biểu đồ cũ
  var chart1 = document.getElementById("myChart1");
  var chart2 = document.getElementById("myChart2");

  if (chart1) {
    var context1 = chart1.getContext("2d");
    context1.clearRect(0, 0, chart1.width, chart1.height);
    var chart1Clone = chart1.cloneNode(true); // Tạo một bản sao của canvas
    chart1.parentNode.replaceChild(chart1Clone, chart1); // Thay thế canvas hiện tại bằng bản sao
  }

  if (chart2) {
    var context2 = chart2.getContext("2d");
    context2.clearRect(0, 0, chart2.width, chart2.height);
    var chart2Clone = chart2.cloneNode(true); // Tạo một bản sao của canvas
    chart2.parentNode.replaceChild(chart2Clone, chart2); // Thay thế canvas hiện tại bằng bản sao
  }
  // Thêm thống kê và vẽ biểu đồ mới
  addChart(
    "myChart1",
    createChartConfigbar(
      "Số lượng bán ra",
      "bar",
      Object.keys(thongKeHang),
      Object.values(thongKeHang).map((_) => _.soLuongBanRa),
      colors
    )
  );

  addChart(
    "myChart2",
    createChartConfig(
      "Doanh thu",
      "doughnut",
      Object.keys(thongKeHang),
      Object.values(thongKeHang).map((_) => _.doanhThu),
      colors
    )
  );
}
function suaSanPham(masp, name) {
  var sp = layThongTinSanPhamTuTable("khungSuaSanPham");
  if (!sp) return;

  // Check for duplicate entry before updating
  for (var p of list_products0) {
    if (sp.masp !== masp && p.masp === sp.masp) {
      alert("Mã sản phẩm bị trùng !!");
      return;
    }
    if (sp.name !== name && p.name === sp.name) {
      alert("Tên sản phẩm bị trùng !!");
      return;
    }
  }

  // Prepare the data to be sent in the request body
  var requestData = {
    old_masp: masp,
    new_masp: sp.masp,
    product: sp,
    table: "product",
    table1: "companies", // Adjust the table name accordingly
  };

  // Make a POST request to the PHP script to update the product information
  fetch("./data/updateproduct.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => response.text())
    .then((data) => {
      // Nếu cập nhật thành công, gọi lại API để lấy dữ liệu mới
      fetch("./data/product.php")
        .then((response) => response.json())
        .then((data) => {
          // Cập nhật lại dữ liệu list_products0 với dữ liệu mới
          list_products0 = data;
          // Hiển thị lại bảng sản phẩm sau khi cập nhật dữ liệu
          alert("Sửa " + sp.name + " thành công");
          addTableProducts();
          addTableProducts1();
          addTableProducts2();

          document.getElementById("khungSuaSanPham").style.transform =
            "scale(0)";
        })
        .catch((error) => {
          console.error("Lỗi khi lấy dữ liệu mới:", error);
          alert(
            "Sửa " +
              sp.name +
              " thành công, nhưng không thể cập nhật dữ liệu mới."
          );
        });
    })
    .catch((error) => {
      // Handle any errors that occur during the fetch operation
      console.error("Error updating product:", error);
      alert("An error occurred while updating the product");
    });
}
function suaSanPham1(masp, name) {
  var sp = layThongTinSanPhamTuTable("khungSuaSanPham1");
  if (!sp) return;

  // Check for duplicate entry before updating
  for (var p of list_products1) {
    if (sp.masp != masp && p.masp == sp.masp) {
      alert("Mã sản phẩm bị trùng !!");
      return false;
    }

    if (sp.name != name && p.name == sp.name) {
      alert("Tên sản phẩm bị trùng !!");
      return false;
    }
  }

  // Prepare the data to be sent in the request body
  var requestData = {
    old_masp: masp,
    new_masp: sp.masp,
    product: sp,
    table: "product1",
    table1: "companies1", // Adjust the table name accordingly
  };

  // Make a POST request to the PHP script to update the product information
  fetch("./data/updateproduct.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => response.text())
    .then((data) => {
      // Nếu cập nhật thành công, gọi lại API để lấy dữ liệu mới
      fetch("./data/product1.php")
        .then((response) => response.json())
        .then((data) => {
          // Cập nhật lại dữ liệu list_products0 với dữ liệu mới
          list_products1 = data;
          // Hiển thị lại bảng sản phẩm sau khi cập nhật dữ liệu
          alert("Sửa " + sp.name + " thành công");
          addTableProducts();
          addTableProducts1();
          addTableProducts2();

          document.getElementById("khungSuaSanPham1").style.transform =
            "scale(0)";
        })
        .catch((error) => {
          console.error("Lỗi khi lấy dữ liệu mới:", error);
          alert(
            "Sửa " +
              sp.name +
              " thành công, nhưng không thể cập nhật dữ liệu mới."
          );
        });
    })
    .catch((error) => {
      // Handle any errors that occur during the fetch operation
      console.error("Error updating product:", error);
      alert("An error occurred while updating the product");
    });
}
function suaSanPham2(masp, name) {
  var sp = layThongTinSanPhamTuTable("khungSuaSanPham2");
  if (!sp) return;

  // Check for duplicate entry before updating
  for (var p of list_products2) {
    if (sp.masp != masp && p.masp == sp.masp) {
      alert("Mã sản phẩm bị trùng !!");
      return false;
    }

    if (sp.name != name && p.name == sp.name) {
      alert("Tên sản phẩm bị trùng !!");
      return false;
    }
  }

  // Prepare the data to be sent in the request body
  var requestData = {
    old_masp: masp,
    new_masp: sp.masp,
    product: sp,
    table: "product2",
    table1: "companies2", // Adjust the table name accordingly
  };

  // Make a POST request to the PHP script to update the product information
  fetch("./data/updateproduct.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => response.text())
    .then((data) => {
      // Nếu cập nhật thành công, gọi lại API để lấy dữ liệu mới
      fetch("./data/product2.php")
        .then((response) => response.json())
        .then((data) => {
          // Cập nhật lại dữ liệu list_products0 với dữ liệu mới
          list_products2 = data;
          // Hiển thị lại bảng sản phẩm sau khi cập nhật dữ liệu
          alert("Sửa " + sp.name + " thành công");
          addTableProducts();
          addTableProducts1();
          addTableProducts2();

          document.getElementById("khungSuaSanPham2").style.transform =
            "scale(0)";
        })
        .catch((error) => {
          console.error("Lỗi khi lấy dữ liệu mới:", error);
          alert(
            "Sửa " +
              sp.name +
              " thành công, nhưng không thể cập nhật dữ liệu mới."
          );
        });
    })
    .catch((error) => {
      // Handle any errors that occur during the fetch operation
      console.error("Error updating product:", error);
      alert("An error occurred while updating the product");
    });
}
// function suaSanPham2(masp, name) {
//   var sp = layThongTinSanPhamTuTable("khungSuaSanPham2");
//   if (!sp) return;
//   for (var p of list_products2) {
//     if (sp.masp != masp && p.masp == sp.masp) {
//       alert("Mã sản phẩm bị trùng !!");
//       return false;
//     }

//     if (sp.name != name && p.name == sp.name) {
//       alert("Tên sản phẩm bị trùng !!");
//       return false;
//     }
//   }
//   // Sửa
//   for (var i = 0; i < list_products2.length; i++) {
//     if (list_products2[i].masp == masp) {
//       list_products2[i] = sp;
//     }
//   }

//   // Lưu vào localstorage
//   setListProducts2(list_products2);

//   // Vẽ lại table
//   addTableProducts();
//   addTableProducts1();
//   addTableProducts2();

//   alert("Sửa " + sp.name + " thành công");

//   document.getElementById("khungSuaSanPham2").style.transform = "scale(0)";
// }
function thongBao() {
  var tb = "";
  for (let sp of list_products) {
    if (sp.count <= 0) {
      tb += sp.name + " ; ";
    }
  }
  if (tb.length > 0) {
    alert("Các sản phẩm đã hết hàng là: " + tb);
  }
}
