var currentuser; // user hiện tại, biến toàn cục
var arr = [];
window.onload = function () {
  khoiTao();

  // autocomplete cho khung tim kiem
  autocomplete(document.getElementById("search-box"), list_products);

  // thêm tags (từ khóa) vào khung tìm kiếm
  var tags = ["Samsung", "iPhone", "Huawei", "Oppo", "Mobi"];
  for (var t of tags) addTags(t, "index.html?search=" + t);

  currentuser = getCurrentUser();
  addProductToTable(currentuser);
};
function addthanhtoan() {}
function addProductToTable(user) {
  var table = document.getElementsByClassName("listSanPham")[0];

  var s = `
		<tbody>
			<tr>
				<th>STT</th>
				<th>Sản phẩm</th>
				<th>Giá</th>
				<th>Số lượng</th>
				<th>Thành tiền</th>
				<th>Thời gian</th>
				<th>Xóa</th>
			</tr>`;

  if (!user) {
    s += `
			<tr>
				<td colspan="7"> 
					<h1 style="color:red; background-color:white; font-weight:bold; text-align:center; padding: 15px 0;">
						Bạn chưa đăng nhập !!
					</h1> 
				</td>
			</tr>
		`;
    table.innerHTML = s;
    return;
  } else if (user.products.length == 0) {
    s += `
			<tr>
				<td colspan="7"> 
					<h1 style="color:green; background-color:white; font-weight:bold; text-align:center; padding: 15px 0;">
						Giỏ hàng trống !!
					</h1> 
				</td>
			</tr>
		`;
    table.innerHTML = s;
    return;
  }

  var totalPrice = 0;
  for (var i = 0; i < user.products.length; i++) {
    list_products = list_products.concat(list_products1).concat(list_products2);
    var masp = user.products[i].ma;
    var soluongSp = user.products[i].soluong;
    var p = timKiemTheoMa(list_products, masp);
    var price = p.promo.name == "giareonline" ? p.promo.value : p.price;
    var thoigian = new Date(user.products[i].date).toLocaleString();
    var thanhtien = stringToNum(price) * soluongSp;
    var mausac = user.products[i].mausac;
    var rom = user.products[i].rom;
    var madon = user.products[i].madon;
    var concatenatedString =
      p.name + " " + mausac + " " + rom + " Số lượng: " + soluongSp;
    arr.push(concatenatedString);
    s +=
      `
			<tr>
				<td>` +
      (i + 1) +
      `</td>
				<td class="noPadding imgHide">
					<a target="_blank" href="chitietsanpham.html?` +
      p.name.split(" ").join("-") +
      `" title="Xem chi tiết">
						` +
      p.name +
      " " +
      mausac +
      " " +
      rom +
      `
						<img src="` +
      p.img +
      `">
					</a>
				</td>
				<td class="alignRight">` +
      price +
      ` ₫</td>
      <td class="soluong" >
      <button onclick="giamSoLuong('` +
      madon +
      `', '` +
      user.id +
      `')"><i class="fa fa-minus"></i></button>
      <input size="1" onchange="capNhatSoLuongFromInput(this, '` +
      madon +
      `', '` +
      user.id +
      `')" value=` +
      soluongSp +
      `>
      <button onclick="tangSoLuong('` +
      madon +
      `', '` +
      user.id +
      `')"><i class="fa fa-plus"></i></button>
  </td>  
				<td class="alignRight">` +
      numToString(thanhtien) +
      ` ₫</td>
				<td style="text-align: center" >` +
      thoigian +
      `</td>
      <td class="noPadding"> 
      <i class="fa fa-trash" onclick="xoaSanPhamTrongGioHang('${madon}', ${i})"></i> 
    </td>    
			</tr>
		`;
    // Chú ý nháy cho đúng ở giamsoluong, tangsoluong
    totalPrice += thanhtien;
  }

  s +=
    `
			<tr style="font-weight:bold; text-align:center">
				<td colspan="4">TỔNG TIỀN: </td>
				<td class="alignRight">` +
    numToString(totalPrice) +
    ` ₫</td>
	<td class="thanhtoan" onclick="openCheckoutModal()"> Thanh Toán </td>

				<td class="xoaHet" onclick="xoaHet(` +
    user.id +
    `)"> Xóa hết </td>
			</tr>
		</tbody>
	`;
  table.innerHTML = s;
  const end = document.getElementById("infor_end");
  end.innerHTML =
    `
            <div style="padding-bottom:10px ;border-bottom: 2px solid gainsboro;">
              <h3 id="">Đơn hàng của bạn</h3>
            </div>
            <div class="end_infor1">
              <p><b>Tạm tính</b></p>
              <p>` +
    numToString(totalPrice) +
    ` ₫</p>
            </div>
            <div class="end_infor1">
              <p><b>Giao hàng</b></p>
              <p>Giao hàng miễn phí</p>
            </div>
            <div class="end_infor1 hidepro" id="hidepro">
            <p ><b>Số tiền được giảm </b></p>
            <p id="end_total2"></p>  
            </div>
            <div class="end_infor1">
              <p ><b>Tổng </b></p>
              <p id="end_total">
    ` +
    numToString(totalPrice) +
    ` ₫
</p>
            </div>
            <div style="padding-bottom: 10px; border-bottom: 2px solid gainsboro; margin-top: 18px;">
              <p>
                <i class="fa fa-gift"></i> <b>Phiếu ưu đãi</b>
              </p>
            </div>
            <div class="promo">
              <input style=" width: 100%;" type="text" placeholder="Mã ưu đãi" id="magiamgia">
            </div>
            <div class="promo-button">
              <button type="submit" class="confirm" onclick="fromo(` +
    totalPrice +
    `)"><b>ÁP DỤNG</b></button>
            </div>
            <div class="payment-options">
              <label>
                <input type="radio" name="paymentMethod" value="bankTransfer" onclick="showContent('bankTransfer')">
                <b style="margin-left: 10px;">Chuyển khoản ngân hàng</b>
              </label>
              <p id="bankTransferContent" style="display: none;margin-top: 10px;"> Chuyển khoản với nội dung "Thanh
                toán:Họ tên:Sdt tới tài
                khoản 00000000000 Mb" đơn hàng sẽ được giao sau khi chúng tôi nhận được tiền chúc bạn 1 ngày mới tốt lành
              </p>
            </div>
            <div class="payment-options">
              <label>
                <input type="radio" name="paymentMethod" value="cashOnDelivery" onclick="showContent('cashOnDelivery')">
                <b style="margin-left: 10px;">Thanh toán sau khi nhận hàng</b>
              </label>
              <p id="cashOnDeliveryContent" style="display: none;margin-top: 10px;">Bạn sẽ thanh toán cho người giao hàng
                sau khi nhận sản
                phẩm</p>
            </div>
            <div class="" style="margin-top: 10px;">
              <label style="display: flex; align-items: center;">
                <input type="radio" name="paymentMethod" value="qrMomo" onclick="showContent('qrMomo')">
                <b style="margin-left: 10px;">Thanh toán bằng QR Momo</b>
                <img src="./img/logomomo.png" alt="Momo Logo" style="width: 30px; height: 30px; margin-left: 10px;">
              </label>
              <p id="qrMomoContent" style="display: none; margin-top: 10px;">Hãy mở app Momo của bạn và quét mã Momo để
                thanh toán cho đơn hàng của
                bạn.</p>
            </div>
            <div class="thanhtoan-button">
              <button type="submit" class="confirm" onclick="kiemTraThongTin()"><b>ĐẶT HÀNG</b></button>
            </div>
            `;

  const check = document.getElementById("checkoutModal");
  const qrcode = document.createElement("div");

  qrcode.classList.add("qr-div");
  qrcode.id = "qr-code";
  qrcode.innerHTML =
    `
  <div >
    <h2 id="modalLabel">Quét mã để thanh toán</h2>
    <img src="/img/logomomo.png" alt="Momo Logo"
      style="width: 40px; height: 40px; margin-left: 10px;margin-top: 10px">
  </div>
  <div style="background-color:#feefb5;margin-bottom:10px;margin-top:10px;padding:10px">
    <p>Người nhận: <b id="nguoinhan"> </b></p>
    <p>Số điện thoại: <b id="sodt"> </b></p>
    <p>Số tiền: <b id="end_total1">` +
    numToString(totalPrice) +
    ` ₫</b></p>
    Ghi chú chuyển tiền bạn theo thời gian sau: <b style="color:red">` +
    new Date().toLocaleString() +
    `</b>
    </p>
  </div>
  <div>
    <img src="img/qrcode.png" alt="">
    <p style="margin-bottom:10px;color:red">Sử dụng quét mã QR của momo để quét mã thanh toán </p>
    <div class="buttqr">
      <button type="submit" class="unconfirm" onclick="closeCheck()">Hủy</button>
      <button type="submit" class="confirm" onclick="thanhtoanqr()">Xác nhận</button>
    </div>
  </div>
`;
  check.appendChild(qrcode);
}
function thanhToanqr(hoten, soDienThoaiInput) {
  var qrCode = document.getElementById("qr-code");
  var infor_total = document.getElementById("infor_total");
  var nguoinhan = document.getElementById("nguoinhan");
  var sodt = document.getElementById("sodt");
  nguoinhan.textContent = hoten;
  sodt.textContent = soDienThoaiInput;
  qrCode.style.display = "block";
  infor_total.style.display = "none";
}
function fromo(totalPrice) {
  var endTotalElement = document.getElementById("end_total");
  var endTotalElement1 = document.getElementById("end_total1");
  var endTotalElement2 = document.getElementById("end_total2");
  var hidepro = document.getElementById("hidepro");
  var magiamgia = document.getElementById("magiamgia");

  switch (magiamgia.value) {
    case "giam10%":
      hidepro.classList.add("onpro");

      endTotalElement2.textContent =
        "- " + numToString(totalPrice / 10) + " ₫ ";
      totalPrice -= totalPrice / 10;
      endTotalElement.textContent = numToString(totalPrice) + " ₫ ";
      endTotalElement1.textContent = numToString(totalPrice) + " ₫ ";

      alert(
        "Bạn đã áp dụng mã ưu đãi " +
          magiamgia.value +
          " bạn được giảm 10% tổng giá trị đơn hàng"
      );
      break;
    case "giam20%":
      hidepro.classList.add("onpro");
      endTotalElement2.textContent =
        "- " + numToString(totalPrice * 0.2) + " ₫ ";
      totalPrice -= totalPrice * 0.2;
      endTotalElement.textContent = numToString(totalPrice) + " ₫";
      endTotalElement1.textContent = numToString(totalPrice) + " ₫";

      alert(
        "Bạn đã áp dụng mã ưu đãi " +
          magiamgia.value +
          " bạn được giảm 20% tổng giá trị đơn hàng"
      );
      break;
    case "giam30%":
      hidepro.classList.add("onpro");
      endTotalElement2.textContent =
        "- " + numToString(totalPrice * 0.3) + " ₫ ";
      totalPrice -= totalPrice / 0.3;
      endTotalElement.textContent = numToString(totalPrice) + " ₫";
      endTotalElement1.textContent = numToString(totalPrice) + " ₫";

      alert(
        "Bạn đã áp dụng mã ưu đãi " +
          magiamgia.value +
          " bạn được giảm 30% tổng giá trị đơn hàng"
      );
      break;
    case "giam40%":
      hidepro.classList.add("onpro");
      endTotalElement2.textContent =
        "- " + numToString(totalPrice * 0.4) + " ₫ ";
      totalPrice -= totalPrice / 0.4;
      endTotalElement.textContent = numToString(totalPrice) + " ₫";
      endTotalElement1.textContent = numToString(totalPrice) + " ₫";

      alert(
        "Bạn đã áp dụng mã ưu đãi " +
          magiamgia.value +
          " bạn được giảm 40% tổng giá trị đơn hàng"
      );
      break;
    case "giam50%":
      hidepro.classList.add("onpro");
      endTotalElement2.textContent = "- " + numToString(totalPrice / 2) + " ₫ ";
      totalPrice -= totalPrice / 2;
      endTotalElement.textContent = numToString(totalPrice) + " ₫";
      endTotalElement1.textContent = numToString(totalPrice) + " ₫";

      alert(
        "Bạn đã áp dụng mã ưu đãi " +
          magiamgia.value +
          " bạn được giảm 50% tổng giá trị đơn hàng"
      );
      break;
    case "giam100%":
      hidepro.classList.add("onpro");
      endTotalElement2.textContent = "- " + numToString(totalPrice) + " ₫ ";
      totalPrice -= totalPrice;
      endTotalElement.textContent = numToString(totalPrice) + " ₫";
      endTotalElement1.textContent =
        "Số tiền " + numToString(totalPrice) + " ₫";

      alert(
        "Bạn đã áp dụng mã ưu đãi " +
          magiamgia.value +
          " bạn được giảm 100% tổng giá trị đơn hàng"
      );
      break;
    case "":
      alert("Nhập mã ưu đãi của bạn");
      break;
    default: {
      hidepro.classList.remove("onpro");
      alert("Mã ưu đãi không tồn tại hoạc đã quá hạn ưu đãi");
    }
  }
  return totalPrice;
}
function xoaSanPhamTrongGioHang(madon, i) {
  if (window.confirm("Xác nhận xóa sản phẩm khỏi kho hàng")) {
    currentuser.products.splice(i, 1); //loại bỏ từ vị trí i 1 sản phẩm
    capNhatMoiThu();
    var requestData = {
      madon: madon,
    };
    fetch("./data/deletecart.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        capNhatMoiThu();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}
function openCheckoutModal() {
  var checkoutModal = document.getElementById("checkoutModal");
  var infor0 = document.getElementById("infor0");
  capNhatMoiThu1();
  checkoutModal.style.display = "block";
  infor0.style.display = "block";
}
function closeCheck() {
  var checkoutModal = document.getElementById("checkoutModal");
  var infor_total = document.getElementById("infor_total");
  var qrCode = document.getElementById("qr-code");
  checkoutModal.style.display = "none";
  qrCode.style.display = "none";
  infor_total.style.display = "flex";
  var form = document.getElementById("forminf");
  form.reset();
}

function thanhToan() {
  var c_user = getCurrentUser();
  if (c_user.locker == "T") {
    alert("Tài khoản của bạn hiện đang bị khóa nên không thể mua hàng!");
    addAlertBox(
      "Tài khoản của bạn đã bị khóa bởi Admin.",
      "#aa0000",
      "#fff",
      10000
    );
    return;
  }

  if (!currentuser.products.length) {
    addAlertBox(
      "Không có mặt hàng nào cần thanh toán !!",
      "#ffb400",
      "#fff",
      2000
    );
    return;
  }
  var thanhtien = document.getElementById("end_total").innerHTML;
  console.log(thanhtien);
  var hoTen =
    document.getElementById("ho").value +
    " " +
    document.getElementById("ten").value;
  var email = document.getElementById("email").value;
  var soDienThoai = document.getElementById("sodienthoai").value;
  var tinh =
    document.getElementById("city").options[
      document.getElementById("city").selectedIndex
    ].text;
  var huyen =
    document.getElementById("district").options[
      document.getElementById("district").selectedIndex
    ].text;
  var xa =
    document.getElementById("ward").options[
      document.getElementById("ward").selectedIndex
    ].text;
  var diaChi = document.getElementById("sonha").value;
  var loiNhan = document.getElementById("hint").value;
  var selectedPaymentMethodText = getTextOfSelectedPaymentMethod();
  var magiamgia = document.getElementById("magiamgia").value;
  var text = tinh + "-" + huyen + "-" + xa + " , " + diaChi;
  var thanhtien1 = document.getElementById("end_total").innerHTML.trim(); // Lấy giá trị và loại bỏ khoảng trắng ở đầu và cuối chuỗi
  var giaTriSo = thanhtien1.match(/\d[\d,\.]*/)[0]; // Trích xuất phần số từ chuỗi
  // Tạo đối tượng chứa thông tin người mua
  var thongTinMuaHang = {
    ngaymua: formatTime(),
    tinhTrang: "Đang chờ xử lý",
    hoTen: hoTen,
    email: email,
    soDienThoai: soDienThoai,
    tinh: tinh,
    huyen: huyen,
    xa: xa,
    diaChi: diaChi,
    loiNhan: loiNhan,
    phuongThuc: selectedPaymentMethodText,
    magiamgia: magiamgia,
    user_id: c_user.id,
    madon: c_user.id + "_" + formatTime1(),
    tongtien: giaTriSo + "₫",
    products: currentuser.products, // Danh sách sản phẩm trong giỏ hàng
  };

  if (
    window.confirm(
      "Đồng ý thanh toán giỏ hàng bằng phương thức " +
        selectedPaymentMethodText +
        " ?"
    )
  ) {
    fetch("./data/addorder.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(thongTinMuaHang),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        sendDonHang(
          arr,
          hoTen,
          email,
          text,
          soDienThoai,
          selectedPaymentMethodText,
          thanhtien
        );
        var requestData = {
          user_id: c_user.id,
        };

        fetch("./data/deleteallcart.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        })
          .then((response) => response.text())
          .then((data) => {
            console.log(data);
            capNhatMoiThu();
          })
          .catch((error) => {
            console.error("Error:", error);
          });

        currentuser.products = [];
        capNhatMoiThu();
        addAlertBox(
          "Các sản phẩm đã được gửi vào đơn hàng và chờ xử lý.",
          "#17c671",
          "#fff",
          4000
        );
        closeCheck();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}
function formatTime1() {
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
  }-${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }:${seconds < 10 ? "0" + seconds : seconds}`;

  return formattedTime;
}
function formatTime() {
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
function sendDonHang(
  arr,
  hoTen,
  email,
  text,
  soDienThoai,
  selectedPaymentMethodText,
  thanhtien
) {
  emailjs.init("3pFiUGRsvVLOI7ifR");

  var templateParams = {
    arr: arr,
    hoTen: hoTen,
    soDienThoai: soDienThoai,
    phuongthuc: selectedPaymentMethodText,
    to_email: email,
    thanhtien: thanhtien,
    text: text,
  };
  console.log(templateParams);

  // Sử dụng public key thay thế cho User ID
  emailjs
    .send("service_5v2d5e8", "template_rns1l99", templateParams) // Thay your_service_id và your_template_id bằng thông tin tương ứng của bạn
    .then(
      function (response) {
        console.log("Email đã được gửi thành công: ", response);
      },
      function (error) {
        console.log("Lỗi khi gửi email: ", error);
      }
    );
}

function xoaHet(id) {
  if (currentuser.products.length) {
    if (window.confirm("Bạn có chắc chắn muốn xóa hết sản phẩm trong giỏ !!")) {
      currentuser.products = [];
      capNhatMoiThu();
      var requestData = {
        user_id: id,
      };

      fetch("./data/deleteallcart.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.text())
        .then((data) => {
          console.log(data);
          capNhatMoiThu();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }
}

// Cập nhật số lượng lúc nhập số lượng vào input
function capNhatSoLuongFromInput(inp, masp, id) {
  var soLuongMoi = Number(inp.value);
  if (!soLuongMoi || soLuongMoi <= 0) soLuongMoi = 1;
  for (var p of currentuser.products) {
    if (p.madon == masp) {
      p.soluong = soLuongMoi;
    }
  }
  updateCartQuantity(masp, soLuongMoi, id);
  capNhatMoiThu();
}

function tangSoLuong(masp, id) {
  var soLuongHienTai = getCurrentProductQuantity(masp);
  for (var p of currentuser.products) {
    if (p.madon == masp) {
      p.soluong++;
    }
  }
  if (soLuongHienTai !== null) {
    updateCartQuantity(masp, soLuongHienTai + 1, id);
  }
  capNhatMoiThu();
}

function giamSoLuong(masp, id) {
  var soLuongHienTai = getCurrentProductQuantity(masp);
  for (var p of currentuser.products) {
    if (p.madon == masp) {
      if (p.soluong > 1) {
        p.soluong--;
      } else {
        return;
      }
    }
  }
  if (soLuongHienTai !== null && soLuongHienTai > 1) {
    updateCartQuantity(masp, soLuongHienTai - 1, id);
  }
  capNhatMoiThu();
}

function getCurrentProductQuantity(masp) {
  for (var p of currentuser.products) {
    if (p.madon === masp) {
      return p.soluong;
    }
  }
  return null;
}

function updateCartQuantity(masp, newQuantity, id) {
  var requestData = {
    madon: masp,
    soluong: newQuantity,
    user_id: id,
  };

  fetch("./data/updatecart.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
      capNhatMoiThu();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function capNhatMoiThu() {
  // Mọi thứ
  animateCartNumber();
  // cập nhật danh sách sản phẩm trong localstorage
  setCurrentUser(currentuser);
  updateListUser(currentuser);
  // cập nhật danh sách sản phẩm ở table
  addProductToTable(currentuser);
  // Cập nhật trên header
  capNhat_ThongTin_CurrentUser();
}
function capNhatMoiThu1() {
  // Mọi thứ

  // cập nhật danh sách sản phẩm trong localstorage
  setCurrentUser(currentuser);
  updateListUser(currentuser);

  // cập nhật danh sách sản phẩm ở table

  // Cập nhật trên header
  capNhat_ThongTin_CurrentUser();
}
