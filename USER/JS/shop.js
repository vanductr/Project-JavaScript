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

  printIconCartSpan()
  
  $("#loginUser").innerHTML = `
        <a href="./login.html">Đ.Kí/Đ.Nhập</a>
    `
  $("#logoutUser").innerHTML = ``

}

//=========
// Lấy thẻ span
let iconCartSpan = document.getElementById("iconCartSpan")

// =========== Tự mình làm chức năng hiển thị sản phẩm và chức năng tìm kiếm ====

const product = JSON.parse(localStorage.getItem('productItem'))

// Dùng new Set(câu lệnh này chưa hiểu rõ lắm)
// const categories = [...new Set(product.map((item) => {return item}))]
const categories = [...product]

// // Hàm lọc kết quả tìm kiếm.
// document.getElementById('searchBar').addEventListener('keyup', (e) => {

//     // Lấy giá trị của ô input và chuyển về chữ in thường
//     const searchData = e.target.value.toLowerCase()

//     // Hàm filter tạo 1 mảng mới từ mảng gốc thoả mãn điều kiện 
//     const filterData = categories.filter((item) => {

//         // includes:  kiểm tra xem 1 mảng hoặc chuỗi có chứa 1 giá trị hay không.
//         return (
//             item.productname.toLocaleLowerCase().includes(searchData)
//         )
//     })

//     //Gọi hàm để hiển thị danh sách với đối số là filterData
//     displayItem(filterData)

// })

// ===== Phân trang =====
const itemsPerPage = 8; // Số SP trên 1 trang
let currentPage = 1; // Số trang

// Hàm hiển thị danh sách sản phẩm.
const displayItem = (page) => {

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const productsToShow = categories.slice(startIndex, endIndex);

    // Hiển thị ra màn hình dùng map() của mảng.
    document.getElementById("proContainer").innerHTML = productsToShow.map((item) => {

        // Lấy các key trong đối tượng item
        var {productImg, categoryname, productname, priceValue, id} = item

        // Format tiền tệ
        let formattedAmount = formatCurrency(priceValue);

        // return ra những thẻ html đã được CSS
        return (
            `
                <div class="pro" >
                    <img onclick="window.location.href='sproduct.html';" src="${productImg}" alt="" />
                    <div class="des">
                        <span>${categoryname}</span>
                        <h5>${productname}</h5>
                        <div class="star">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star-half"></i>
                        </div>
                        <h4>${formattedAmount}</h4>
                    </div>

                    <a onclick="addToCart(${id})"><i class="fa-solid fa-cart-plus cart"></i></a>
                </div>
            `
        )
    }).join('')
}

// Hàm hiển thị danh sách sản phẩm đã lọc.
function displayItemSearch(products) {
    document.getElementById("proContainer").innerHTML = products.map((item) => {
        var { productImg, categoryname, productname, priceValue, id } = item;
        let formattedAmount = formatCurrency(priceValue);

        return (
            `<div class="pro" >
                <img onclick="window.location.href='sproduct.html';" src="${productImg}" alt="" />
                <div class="des">
                    <span>${categoryname}</span>
                    <h5>${productname}</h5>
                    <div class="star">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star-half"></i>
                    </div>
                    <h4>${formattedAmount}</h4>
                </div>
                <a onclick="addToCart(${id})"><i class="fa-solid fa-cart-plus cart"></i></a>
            </div>`
        );
    }).join('');
}

// Hàm tìm kiếm sản phẩm.
function searchProduct() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const filteredProducts = categories.filter(item => item.productname.toLowerCase().includes(searchInput));

    // Hiển thị danh sách sản phẩm đã lọc.
    displayItemSearch(filteredProducts);
    // Cập nhật lại phân trang cho danh sách đã lọc.
    displayPagination();
}

// ===== Hiển thị phân trang =====
function displayPagination() {
    // Tính toán số lượng trang
    const totalPage = Math.ceil(categories.length / itemsPerPage);

    // Hiển thị nút phân trang
    let paginationHTML = Array.from({ length: totalPage }, (_, index) => {
        const pageNumber = index + 1;
        return `<span onclick="changePage(${pageNumber})">${pageNumber}</span>`;
    }).join("");

    // Thêm nút trang trước
    paginationHTML = `<span onclick="prevPage()"><i class="fa-solid fa-arrow-left-long"></i></span>` + paginationHTML;

    // Thêm nút trang tiếp theo
    paginationHTML += `<span onclick="nextPage()"><i class="fa-solid fa-arrow-right-long"></i></span>`;

    document.getElementById("pagination").innerHTML = paginationHTML;
}

// ===== Hàm nhận nút click phân trang ====
function changePage(page) {
    currentPage = page;
    displayItem(currentPage);
    displayPagination()
    highlightCurrentPage();
}
// Hàm Trang trước
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayItem(currentPage);
        displayPagination();
        highlightCurrentPage();
    }
}
// Hàm Trang Sau
function nextPage() {
    const totalPage = Math.ceil(categories.length / itemsPerPage);
    if (currentPage < totalPage) {
        currentPage++;
        displayItem(currentPage);
        displayPagination();
        highlightCurrentPage();
    }
}
// Hàm highlight trang hiện tại
function highlightCurrentPage() {
    const pageButtons = document.querySelectorAll("#pagination span");
    pageButtons.forEach((button, index) => {
        if (index === currentPage) {
            button.classList.add("selected");
        } else {
            button.classList.remove("selected");
        }
    });
}

// Khởi đầu hiển thị
displayItem(currentPage)
displayPagination()
highlightCurrentPage();

// ======== Hàm add to cart =============================
// Lấy trên local về thông tin của người dùng đang login.
let userLogin = JSON.parse(localStorage.getItem("userLogin"))

function addToCart(id) {
    // Nếu chưa đăng nhập thì cần phải đăng nhập.
    if(!userLogin) {
        alert("Hãy đăng nhập!")
        window.location.href = "../HTML/login.html"
    }

    if (userLogin.role === 1) {

        // Lấy kết quả được lưu từ local(Danh sách user)
        let userLogin = JSON.parse(localStorage.getItem("userLogin"))

        // Lấy cart của thằng đang login
        let cartUserLogin = userLogin.cart

        // Lấy thông tin sản phẩm.
        for (let i = 0;  i < categories.length; i++) {
            if (categories[i].id == id) {
                let flag = -1
                for (let j = 0; j < cartUserLogin.length; j++) {
                    if(cartUserLogin[j].id == categories[i].id) {
                        flag = j
                        break
                    } 
                }
                if(flag != -1) {
                    cartUserLogin[flag].quantity +=1
                    localStorage.setItem("userLogin", JSON.stringify(userLogin))
                }else{
                    cartUserLogin.push({...categories[i], quantity: 1})
                    localStorage.setItem("userLogin", JSON.stringify(userLogin))
                }
            }
        }
    }
    printIconCartSpan()

    // Hiển thị thông báo sản phẩm đã được thêm vào giỏ hàng.
    fOpenPopup()
}

// ===== Cập nhật số lượng giỏ hàng khi người dùng ấn mua =====
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

// ===== Hiển thị thông báo khi người dùng mua hàng thành công =====
let bPopup = document.getElementById("popup");

function fOpenPopup() {
bPopup.classList.add("oppen-popup");
}

function fClosePopup() {
bPopup.classList.remove("oppen-popup");
}