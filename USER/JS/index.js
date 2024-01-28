// ============= Bật - Tắt thanh Menu khi màn hình được thu nhỏ =======
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
        console.log("Đã ăn hàm open");
    })
}

if(close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active')
        console.log("Đã ăn hàm close");
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

  document.getElementById("iconCartSpan").innerHTML = "0"
}

// ===== Cập nhật số lượng giỏ hàng khi người dùng ấn mua =====
// Lấy thẻ span
let iconCartSpan = document.getElementById("iconCartSpan")

function printIconCartSpan() {
    // Đặt số lượng trong giỏ hàng ban đầu = 0
    let totalQuantity = 0

    // Lấy dữ liệu của người dùng trên Local
    let userLogin = JSON.parse(localStorage.getItem("userLogin"))

    if(!userLogin){
        return
    }

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

































// ===== Test Chức năng đăng nhập cho Admin ======

// Tạo danh sách các tài khoản của Admin
// const listAccount = [
//     {
//         username: "admin",
//         password: "adminpass"
//     },
//     {
//         username: "admin2",
//         password: "adminpass"
//     },
//     {
//         username: "admin3",
//         password: "adminpass"
//     }
// ]

// Kiểm tra trạng thái đăng nhập
// Bình thường khi bắt đầu vào trang thì trạng thái đăng nhập là false
// Còn khi đăng nhập thành công thì sẽ đưa biến này thành true.
// let isLogin = !!localStorage.getItem('username')

// Hàm luôn luôn kiểm tra isLogin(đã có hay chưa)
// function CheckLoginWindow() {
    
//     // Nếu mà có isLogin
//     if(isLogin) {
//         // Hỏi xem có cần vào trang hay không
//         let confirmation = confirm("Tài khoản đã được đăng nhập từ trước, chuyển sang admin")
//         if(confirmation) {
//             // Thì chuyển sang trang admin.
//             window.location.href = "../../Admin/HTML/AdminDashboard.html"
//         }
//     }
// }

// // Hàm kiểm tra điều kiện để đăng nhập.
// function loginUser() {
//     // Lấy giá trị nhập vào từ trường username
//     let loginUsername = document.getElementById("loginUsername").value

//     // Lấy giá trị nhập vào từ trường password
//     let loginPassword = document.getElementById("loginPassword").value

//     // Kiểm tra dữ liệu dùng hàm some(). Hàm này trả về true hoặc false.
//     let checkLogin = listAccount.some(
//         value => value.username === loginUsername && value.password === loginPassword
//     )
    
//     // Kiểm tra đăng nhập: Nếu đúng thì lưu thông tin đăng nhập
//     // để lần sau người ta vào thì không cần phải đăng nhập lại nữa.
//     if(checkLogin) {
//         // Lưu thông tin đăng nhập lên Local
//         localStorage.setItem('username', loginUsername)

//         // Đưa giá trị của isLogin thành true
//         isLogin = true

//         // Thì chuyển sang trang admin.
//         window.location.href = "../../Admin/HTML/AdminDashboard.html"
//     } else {
//         alert('Tài khoản hoặc mật khẩu không đúng! Hãy kiểm tra lại.')
//     }

// }




// Nếu đăng nhập thành công thì chuyển hướng đến trang admin.