// === Lưu giữ các biến JS để liên kết HTML ===
const form = document.getElementById("formThemSua") // Bật tắt form
const formTitle = document.getElementById("form-title")  // Tiêu đề form
const inputCategoryName = document.getElementById('categoryName') // input danh mục
const inputProductCount = document.getElementById('productCount') // input số lượng
const creationDate = document.getElementById('creationDate') // ngày tạo
const updateDate = document.getElementById('updateDate') // ngày cập nhật

const inputSearch = document.getElementById("text-search") // ô input

//  Mảng lấy thông tin trên Local về, nếu không có thì là mảng rỗng.
const category = JSON.parse(localStorage.getItem("category")) || []
console.log("Đây là mảng lấy được từ local: ", category);

let renderCategory = [...category]

// Hàm tắt mở form
function toggleForm(id) {
    // resetForm()    // gọi hàm resetForm để xóa hết thông tin
    form.classList.toggle("hidden") // đóng / mở form
    formTitle.innerHTML = id ? "Sửa Danh mục SP" : "Thêm Danh mục SP"   // sửa tên form để phù hợp với lúc thêm / sửa
}

// Hàm Thêm/ Sửa sản phẩm
function themSuaSp() {
    // Lấy giá trị của ô danh mục // trim(): loại bỏ khoảng trắng 2 đầu chuỗi.
    const categoryname = inputCategoryName.value.trim()

    // Lấy giá trị của ô ngày tạo
    const creationdate = creationDate.value

    // Lấy giá trị của ô ngày cập nhật
    const updatedate = updateDate.value

    // Khởi tạo đối tượng chứa thông tin của danh mục.
    const categori = {
        id: Math.floor(Math.random() * 99999999),
        categoryname,
        creationdate,
        updatedate
    }

    // Thêm đối tượng trên vào Mảng.
    category.push(categori)

    // Tạo bản sao của mảng, giống ở trên 
    renderCategory = [...category]

    // Đưa lên LocalStrongae
    localStorage.setItem("category", JSON.stringify(category))

    // Gọi hàm vẽ thông tin
    renderCategoryData()

    // Đóng form.
    toggleForm()
}

// Hàm vẽ thông tin ra bảng.
function renderCategoryData() {
    // Tạo 1 chuỗi rỗng
    let stringHtml = ""
    for (let i = 0; i < renderCategory.length; i++) {
        stringHtml += `
            <tr>
                <td>${i + 1}</td>
                <td>${renderCategory[i].id}</td>
                <td>${renderCategory[i].categoryname}</td>
                <td>${renderCategory[i].creationdate}</td>
                <td>${renderCategory[i].updatedate}</td>
                <td>
                    <button>Sửa</button>
                    <button>Xoá</button>
                </td>
            </tr>
        ` 
    }
    document.getElementById("tbody").innerHTML = stringHtml
}
// Gọi hàm vẽ thông tin
renderCategoryData()