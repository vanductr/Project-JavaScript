// === Bật - Tắt thanh menu khi màn hình nhỏ.
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

// === Ẩn icon Giỏ hàng khi chưa được đăng nhập =====
// Lấy thuộc tính bên HTML bằng cú pháp $
let $ = document.querySelector.bind(document)

// Lấy thông tin của người dùng đang đăng nhập. - type: Object
let loginUserAT = JSON.parse(localStorage.getItem("userLogin")) || {};

// Ẩn icon Giỏ hàng đi
$("#lg-bag").innerHTML = ``

// === Chuyển từ Đăng nhập sang đăng kí và ngược lại. ===
var x = document.getElementById("login");
var y = document.getElementById("register");
var z = document.getElementById("btn");
function register() {
    x.style.left = "-400px";
    y.style.left = "50px";
    z.style.left = "110px";
}
function login() {
    x.style.left = "50px";
    y.style.left = "450px";
    z.style.left = "0px";
}

// ======= Đăng nhập - Đăng kí. ==============================
// ======= Hàm lấy thông tin từ user và lưu lên Local(Đăng kí) ========
function saveToLocalStorage() {
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var agree = document.getElementById('agree').checked;

    // Lấy mảng từ Local Storage (nếu tồn tại) hoặc tạo mới nếu không
    var usersArray = JSON.parse(localStorage.getItem('users')) || [];

    if (username === '' || email === '' || password === '' || !agree) {
        alert('Vui lòng điền đầy đủ thông tin và đồng ý với các điều khoản.');
        return false;
    }

    // Tạo đối tượng cho người dùng
    var userObject = {
        id: Math.floor(Math.random() * 99999999),
        username: username,
        email: email,
        password: password,
        cart: [],
        role: 1,
        satatus: true
        // Các thông tin khác nếu cần
    };

    // Kiểm tra xem đã có email hay chưa.
    for (let i = 0; i < usersArray.length; i++) {
        if(usersArray[i].email == userObject.email) {
            console.log("Email đã bị trùng!")
            return
        }
    }

    // Thêm đối tượng người dùng vào mảng
    usersArray.push(userObject);

    // Lưu mảng vào Local Storage
    localStorage.setItem('users', JSON.stringify(usersArray));

    // Reset form
    document.getElementById('register').reset();

    // Chuyển sang Đăng nhập
    login()

    return true;
}    

// Hàm kiểm tra đăng nhập =========
function loginUser() {
    var userEmail = document.getElementById('loginEmail').value;
    var password = document.getElementById('loginPassword').value;

    // Lấy mảng từ Local Storage (nếu tồn tại)
    var usersArray = JSON.parse(localStorage.getItem('users')) || [];

    // Tìm kiếm người dùng với tên đăng nhập và mật khẩu khớp
    var loggedInUser = usersArray.find(function(user) {
        return user.email === userEmail && user.password === password;
    });

    if(loggedInUser.satatus == false) {
        alert("Tài khoản của bạn đã bị chặn!")
        return
    }

    if(loggedInUser) {
        // Lưu lên local thông tin đã đăng nhập
        localStorage.setItem('userLogin', JSON.stringify(loggedInUser))
    } else {
        alert("Email hoặc mật khẩu không đúng, Hãy kiểm tra lại!")
        document.getElementById('loginPassword').value = ""
        return
    }

    let loginUserAT = JSON.parse(localStorage.getItem("userLogin")) || {};

    if (loginUserAT) {
        if (loginUserAT.role === 1) {
            // Trước khi chuyển trang thì lưu 1 thông tin user trên local.
            window.location.href = "../../USER/HTML/index.html"
        } else if(loginUserAT.role === 0) {
            window.location.href = "../../Admin/HTML/AdminDashboard.html"
        }
    } else {
        alert('Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng thử lại.');
    }

    // Reset form
    document.getElementById('login').reset();

    return false;
}

// Kiểm tra đã login hay chưa.
// let isLogin = !!localStorage.getItem('userLogin')

// // Hàm luôn luôn kiểm tra isLogin(đã có hay chưa)
// function CheckLoginWindow() {
//     // Nếu mà có isLogin
//     if(isLogin) {
//         // Hỏi xem có cần vào trang hay không
//         let confirmation = confirm("Tài khoản đã được đăng nhập từ trước, chuyển đến Trang chủ.")
//         if(confirmation) {
//             // Thì chuyển sang trang admin.
//             window.location.href = "../../USER/HTML/index.html"
//         }
//     }
// }