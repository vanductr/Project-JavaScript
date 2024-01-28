// ======== Chức năng Bật - Tắt Menu khi màn hình nhỏ ************
// Lấy giá trị của icon bar(menu)
const bar = document.getElementById('bar')

// Lấy giá trị của nút X(để tắt menu)
const close = document.getElementById('close')

// Lấy giá trị của các đường dẫn trong menu chọn 
const nav = document.getElementById('navbar')

// Hàm để ấn nút menu(câu lệnh điều kiện if chưa hiểu rõ lắm)
if(bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active')
    })
}
if(close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active')
    })
}

// ====== Chức năng đổi giao diện khi đã được Đăng nhập =====
// Tạo 1 hàm để chọn phần tử DOM thông qua document.querySelector
let $ = document.querySelector.bind(document);

// Lấy thông tin của người dùng đang đăng nhập. - type: Object
let loginUserAT = JSON.parse(localStorage.getItem("userLogin")) || {};

// Kiểm tra đã đăng nhập hay chưa để hiển thị ra màn hình.
if (loginUserAT.role === 1) {
    $("#loginUser").innerHTML = `
        <a href="#">${loginUserAT.username}</a>
    `
    $("#logoutUser").innerHTML = `
        <a href="#" class="amado-btn" onclick="logout()">Đ.xuất</a>
    `
} else {
    $("#loginUser").innerHTML = `
        <a href="./login.html">Đ.Kí/Đ.Nhập</a>
    `
}

// Hàm Đăng xuất.
function logout() {
  // Xóa toàn bộ dữ liệu trong Local Storage
  localStorage.removeItem("userLogin");
  $("#loginUser").innerHTML = `
        <a href="./login.html">Đ.Kí/Đ.Nhập</a>
    `
  $("#logoutUser").innerHTML = ``

  printIconCartSpan()
}

// ======== In ra Giỏ hàng ==========****************************************

// Lấy Thông tin của người dùng có Giỏ Hàng từ Local về.
let userLogin = JSON.parse(localStorage.getItem("userLogin"))

// Lấy giỏ hàng của người
let cartUser = userLogin.cart

// Hàm hiển thị ra danh sách sản phẩm(vì sau dùng làm hàm hiển thị 
// kết quả tìm kiếm luôn) nên để tham số. *********************************
const displayItem = (items) => {

    // Hiển thị ra màn hình dùng map() của mảng.
    document.getElementById("tbody").innerHTML = items.map((item) => {

        // Lấy các key trong đối tượng item(vì item là từng phần tử trong mảng categories)
        // Cú pháp Destructuring.
        var {productImg, productname, priceValue, id, quantity} = item

        // Format tiền tệ
        let formattedAmount = formatCurrency(priceValue);
        let totalFormattedAmount = formatCurrency(priceValue * quantity);

        // return ra những thẻ html đã được CSS
        return (
            `
                <tr>
                    <td>
                        <i onclick = "removeItem(${id})" class="fa-regular fa-circle-xmark"></i>
                    </td>
                    <td><img src="${productImg}" alt="" /></td>
                    <td>${productname}</td>
                    <td>${formattedAmount}</td>
                    <td><input type="number" value="${quantity}" onchange="handleQuantityChange(${id}, this.value)"/></td>
                    <td>${totalFormattedAmount}</td>
                </tr>
            `
        )
    }).join('')
}
displayItem(cartUser)

// ===== Hàm bỏ vật phẩm ra khỏi giỏ hàng =============*********************
function removeItem(idItem) {
    for (let i = 0; i < cartUser.length; i++) {
        if (cartUser[i].id === idItem) {
            cartUser.splice(i, 1)

            // Đưa dữ liệu lên Local
            localStorage.setItem("userLogin", JSON.stringify(userLogin))
            displayItem(cartUser)
            break // Dừng vòng lặp.
        }
    }
    totalPrice() //Gọi hàm Tổng tiền
    printIconCartSpan() // Hàm cập nhật số lượng.
}

// ===== Hàm tính tổng tiền trong giỏ hàng. =====****************************
function totalPrice() {

    // Dùng map() lọc qua từng phần tử trong mảng và lấy ra tổng giá.
    let subsidiaryArray = cartUser.map((item) => {

        // Lấy các key trong đối tượng item.
        let {priceValue, quantity} = item

        // Trả về (trả về 1 mảng - phương thức map() ) chứa số tiền của từng sản phẩm
        return quantity * priceValue
    })

    let sum = subsidiaryArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    // Format tiền tệ(Phụ kế)
    let formattedAmount = formatCurrency(sum);

    // Phụ kế
    document.getElementById("phuKe").innerHTML = `${formattedAmount}`

    // Phí vận chuyển
    let formattedAmountPVC = formatCurrency(25000);
    document.getElementById("cuocVC").innerHTML = `${formattedAmountPVC}`

    // Tổng thanh toán
    let formattedAmountTTT = formatCurrency(sum + 25000);
    document.getElementById("tongThanhToan").innerHTML = `${formattedAmountTTT}`
}
totalPrice() //Gọi hàm Tổng tiền


// ===== Cập nhật số lượng giỏ hàng khi người dùng ấn mua =====
function printIconCartSpan() {
    // Đặt số lượng trong giỏ hàng ban đầu = 0
    let totalQuantity = 0

    // Lấy dữ liệu của người dùng trên Local
    let userLogin = JSON.parse(localStorage.getItem("userLogin"))

    // Lấy giỏ hàng của họ ra
    let cartUserLogin = userLogin.cart

    // Dùng map để tạo hàm cho các phần tử trong mảng:cartUserLogin
    let totalQuantityArray = cartUserLogin.map((item) => {
        // Lấy key trong item(item là 1 đối tượng)
        let {quantity} = item

        // Trả về Số lương của từng sản phẩm.
        return quantity
    })

    // Tính tổng số lượng của tất cả sản phẩm
    totalQuantity = totalQuantityArray.reduce((tongHienTai, phanTuDangLap) => tongHienTai + phanTuDangLap, 0)

    // Hiển thị số lượng trong giỏ hàng.
    iconCartSpan.innerHTML = totalQuantity
}
printIconCartSpan()

// ====== Test: Cập nhật tổng tiền khi Tăng - Giảm số lượng sản phẩm.
function handleQuantityChange(itemId, newQuantity) {
    // Lặp qua mảng sản phẩm trong giỏ hàng
    for (let i = 0; i < cartUser.length; i++) {
        // Tìm sản phẩm có id trùng khớp
        if (cartUser[i].id === itemId) {
            // Cập nhật số lượng của sản phẩm- chuyển đổi chuỗi thành số.
            cartUser[i].quantity = parseInt(newQuantity);
            
            // Update dữ liệu lên local
            localStorage.setItem("userLogin", JSON.stringify(userLogin))

            // Gọi lại hàm displayItem để cập nhật giao diện
            displayItem(cartUser);

            // Gọi lại hàm totalPrice để cập nhật tổng tiền
            totalPrice();

            printIconCartSpan() // Hiển thị SL tren icon Cart.
            break;
        }
    }
}