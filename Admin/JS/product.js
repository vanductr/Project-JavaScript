// Lấy giá trị của thẻ div chứa form
const formNhapTT = document.getElementById('formNhapTT')
const formTitle = document.getElementById("form-title")// đổi tên form khi thêm hoặc sửa

const inputSearch = document.getElementById("text-search") 

// Lấy các giá trị của Form
const productName = document.getElementById('productName') // Tên sản phẩm
const category = document.getElementById('categoryLocal') // Tên danh mục
const price = document.getElementById('price') // Giá sản phẩm
const quantity = document.getElementById('quantity') // Số lượng
const createdDate = document.getElementById('createdDate') // Ngày tạo
const updatedDate = document.getElementById('updatedDate') // Ngày cập nhật
const changeImg = document.getElementById('changeImg') // Lấy ảnh

// Lấy các danh mục đã được tạo bên Category.
let categoryLocal = JSON.parse(localStorage.getItem("category")) || []

// Tạo 1 Mảng copy để hiển thị ra.
let renderCategoy = [...categoryLocal]

// select chiều sắp xếp : tăng, giảm, ban đầu
const selectDirectionSort = document.getElementById("select-direction-sort")

// select trường sắp xếp: Theo SL Tồn kho, Theo ngày tạo.
const selectFields = document.getElementById("select-fields")

// select số dòng một trang: 5, 10, 15
const selectPageSize = document.getElementById("select-page-size")

// Mảng lấy thông tin từ Local về, nếu không có, tạo mảng rỗng.
const productItems = JSON.parse(localStorage.getItem("productItem")) || []
let renderProduct = [...productItems] // Tạo 1 mảng copy.

let currentPage = 1 // trang muốn hiển thị                                                            
let pageSize = +selectPageSize.value // số dòng hiển thị trên một trang                                         
let totalPage = Math.ceil(renderProduct.length / pageSize) || 0 // tổng số trang

let directionSort = selectDirectionSort.value // chiều sắp xếp
let fields = selectFields.value  // trường sắp xếp


let categoryEdit = null // Thông tin đối tượng cần sửa.

// ======== Các Hàm xử lí chức năng =============================

let productImg = "";
// hàm upload ảnh
function changeImage(element) {
  var file = element.files[0];
  var reader = new FileReader();
  reader.onloadend = function () {
    localStorage.setItem("image", reader.result);
    productImg = reader.result;
    document.getElementById("changeImg").src = productImg;
  };
  reader.readAsDataURL(file);
}

// Hàm xoá trắng thông tin form
function resetForm() {
    productName.value = "" // Xoá thông tin ở ô điền tên
    // category.value = "" // Xoá thông tin ở ô danh mục
    price.value = "" // Xoá thông tin ở ô giá sản phẩm
    quantity.value = "" // Xoá thông tin ở ô số lượng
    createdDate.value = "" // Xoá thông tin ngày tạo
    updatedDate.value = "" // Xoá thông tin ngày cập nhật
    changeImg.src = "" // Xoá thông tin ảnh.
    categoryEdit = null // Xoá thông tin sản phẩm cần sửa
}

// Hàm bật tắt form
function toggleForm(id) {
    resetForm()
    formNhapTT.classList.toggle('hidden')
    formTitle.innerHTML = id ? "Sửa T.T Sản phẩm" : "Thêm Sản phẩm"

    // Vòng for để hiển thị ra các danh mục trên form
    let stringHTML = ""
    for (let i = 0; i < renderCategoy.length; i++) {
        stringHTML += `
            <option value=${renderCategoy[i].categoryname}>${renderCategoy[i].categoryname}</option>
        `
    }
    document.getElementById("categoryLocal").innerHTML = stringHTML
}

// Hàm Thêm/ Sửa Sản phẩm.
function submitForm() {
    // Lấy các giá trị của Form và gán vào biến
    const productname = productName.value.trim()

    // Lấy giá trị thông tin của Danh mục.
    
    const priceValue = price.value
    const quantityValue = +quantity.value
    const createdDateValue = createdDate.value
    const updateDateValue = updatedDate.value
    let e = document.getElementById("categoryLocal");
    let categoryname = e.options[e.selectedIndex].text;
    // nếu có thông tin nào không điền thì:
    if (!productname || !priceValue || !quantityValue || !createdDateValue || !updateDateValue) {
        alert("Không lưu được, hãy kiểm tra lại !!!") // thông báo lỗi
        return // thoát hàm
    }

    // Nếu có thông tin của sản phẩm cần sửa
    if(categoryEdit) {
        const product = {
            ...categoryEdit,
            productname,
            categoryname,
            priceValue,
            quantityValue,
            createdDateValue,
            updateDateValue,
            productImg 
        }
        // Tìm vị trí của sản phẩm trong mảng
        const indexUpdate = productItems.findIndex(product => product.id == categoryEdit.id)
        // Cập nhật lại thông tin sản phẩm.
        productItems[indexUpdate] = { ...product }
    }else { // Nếu không có thông tin sản phẩm cần sửa, tạo 1 sp mới. 

        // Tạo 1 đối tượng để lấy giá trị của Form.
        const product = {
            id: Math.floor(Math.random() * 999999),
            productname,
            categoryname,
            priceValue,
            quantityValue,
            createdDateValue,
            updateDateValue,
            productImg,
            status: true
        }
        // Thêm đối tượng product vào Mảng productItem
        productItems.push(product)

        // chọn trang lớn nhất để xem thông tin mới nhất
        currentPage = totalPage = Math.ceil(productItems.length / pageSize)
    }

    // Copy lại mảng vừa thêm được
    renderProduct = [...productItems]

    // Đưa lên Local
    localStorage.setItem("productItem", JSON.stringify(productItems))
    
    // Đóng form
    toggleForm()

    // Gọi lại hàm vẽ
    renderProducts()
}

// Hàm vẽ thông tin ra Bảng
function renderProducts() {
    search() // Gọi hàm search(nếu có thì search)
    changeSort() // Gọi hàm sắp xếp
    changePageSize() // Gọi hàm số dòng trên trang.

    totalPage = Math.ceil(renderProduct.length / pageSize) || 0 // tính tổng số trang
    currentPage = Math.max(currentPage > totalPage ? totalPage : currentPage, 1) // 1 <= curentPage <= totalPage
    let start = (currentPage - 1) * pageSize // tính vị trí bắt đầu cần in
    let end = start + pageSize // tính vị trí kết thúc in
    // Math.min(): đảm bảo rằng end không vượt quá độ dài của Mảng
    end = Math.min(end, renderProduct.length) 

    // In ra HTML
    let stringHtml = ""
    for (let i = start; i < end; i++) {
        let formattedAmount = formatCurrency(renderProduct[i].priceValue);
        stringHtml += `
            <tr>
                <td>${i + 1}</td>
                <td>${renderProduct[i].id}</td>
                <td><img src="${renderProduct[i].productImg}" alt="Product Image"></td>
                <td class="${renderProduct[i].status ? "" : "text-through"}">${renderProduct[i].productname}</td>
                <td >${renderProduct[i].categoryname}</td> 
                <td>${formattedAmount}</td>
                <td>${renderProduct[i].quantityValue}</td>
                <td>${renderProduct[i].createdDateValue}</td>
                <td>${renderProduct[i].updateDateValue}</td>
                <td class="${renderProduct[i].status ? "" : "text-color"}">${renderProduct[i].status ? "Còn hàng" : "Hết hàng"}</td>
                <td>
                    <button onclick="clickEdit(${renderProduct[i].id})">Sửa</button>
                    <button onclick="clickDelete(${renderProduct[i].id})">Xoá</button>
                    <button onclick="changeStatus(${renderProduct[i].id})">${renderProduct[i].status ? "Hết hàng" : "Còn hàng"}</button>
                </td>
            </tr> 
        `
    }
    document.getElementById("tbody").innerHTML = stringHtml

    // Gọi hàm vẽ phân trang.
    renderPagination()

}
renderProducts() // Gọi hàm khi trang được tải.

// Hàm vẽ phân trang
function renderPagination() {
    let stringHTML = ""
    for (let i = 1; i <= totalPage; i++) {
        if (i == currentPage) {
            stringHTML += `<li class="page-choose" onclick="changeCurrentPage(${i})">${i}</li>`
            continue
        }
        stringHTML += `<li onclick="changeCurrentPage(${i})">${i}</li>`
    }
    document.getElementById("pagination1").innerHTML = stringHTML
}

// Hàm click thay đổi trang (chọn số trang)
function changeCurrentPage(index) {
    currentPage = index // cập nhật giá trị trang hiện tại
    renderProducts()
}

// hàm thay đổi status của một sản phẩm dựa theo id
function changeStatus(id) {
    const indexChange = productItems.findIndex(student => student.id == id) // tìm vị trí sản phẩm đó theo id
    productItems[indexChange].status = !productItems[indexChange].status // đổi status
    productItems[indexChange].quantityValue = 0 // Số lượng tồn kho = 0
    renderProduct = [...productItems]// cập nhật dữ liệu cần in
    localStorage.setItem("productItem", JSON.stringify(productItems))// lưu vào local
    renderProducts()
}

// Hàm sửa thông tin sản phẩm.
function clickEdit(id) {
    toggleForm(id)  // mở form sửa với thông tin truyền vào

    // categoryEdit: là 1 đối tượng đã được tìm thấy trong Mảng productItems.
    categoryEdit = productItems.find(product => product.id == id)  // lấy thông tin và ghi lên form
    productName.value = categoryEdit.productname // Tên sản phẩm
    price.value = categoryEdit.priceValue // Giá
    quantity.value = categoryEdit.quantityValue // Số lượng
    createdDate.value = categoryEdit.createdDateValue // Ngày tạo
    updatedDate.value = categoryEdit.updateDateValue // Ngày thêm
    changeImg.src = categoryEdit.productImg // Link ảnh

    // Lấy tên của các danh mục.
    let nameOption = categoryEdit.categoryname
    console.log("nameOption: ", nameOption);

    // Tìm vị trí của danh mục trong danh sách các danh mục.
    let index = renderCategoy.findIndex((item) => {
        return item.categoryname == nameOption
    })
    console.log("index", index);

    // Vòng for để hiển thị ra các danh mục trên form
    let stringHTML = ""
    for (let i = 0; i < renderCategoy.length; i++) {
        if (i == index) {
            stringHTML += `
                <option selected value="">${renderCategoy[i].categoryname}</option>
            `
        }else{
            stringHTML += `
                <option value="">${renderCategoy[i].categoryname}</option>
            `
        }
    }
    document.getElementById("categoryLocal").innerHTML = stringHTML
}

// Hàm xoá sản phẩm
function clickDelete(id) {
    if (confirm("Bạn có muốn xoá sản phẩm này ?")) {
        const indexDelete = productItems.findIndex(product => product.id == id)
        productItems.splice(indexDelete, 1)
        renderProduct = [...productItems]
        localStorage.setItem("productItem", JSON.stringify(productItems))
        renderProducts()
    }
}

// Hàm lấy thông tin số dòng trên trang
function changePageSize() {
    // parseInt(): Chuyển đổi chuỗi thành số nguyên.
    pageSize = parseInt(selectPageSize.value)
}

// Hàm tiến >< lùi - Tham khảo của anh Thịnh.(quá hay)
function luiTien(value) {
    currentPage = currentPage + value
    renderProducts()
}

// lọc thông tin khi search
function search() {
    textSearch = inputSearch.value.trim().toLowerCase()
    renderProduct = productItems.filter(product => product.productname.toLowerCase().includes(textSearch))
}

// sắp xếp dữ liệu
function changeSort() {
    directionSort = +selectDirectionSort.value // lấy thông tin chiều sắp xếp
    fields = selectFields.value // lấy thông tin trường sắp xếp 
    if (directionSort != 0) {   // sắp xếp
        renderProduct = renderProduct.sort((a, b) => {
            if (typeof a[fields] === 'number' && typeof b[fields] === 'number') {
                return directionSort == 1 ? a[fields] - b[fields] : b[fields] - a[fields];
            }
            return directionSort == 1 ? a.categoryname.localeCompare(b.categoryname) : b.categoryname.localeCompare(a.categoryname);
        });
    }
}











// // Hàm đưa ảnh lên Local
// function changeImage(element) {
//     var file = element.files[0];
//     console.log("Giá trị của file: ", file);

//     // new FileReader(): đọc dữ liệu từ 1 tập tin được chọn thông qua 1 thẻ <input type="file">
//     // Sau khi đọc xong dùng onloadend để xử lí dữ liệu đã đạt được.
//     var reader = new FileReader();
//     reader.onloadend = function () {
//       console.log("Giá trị reader.result: ", reader.result);
//       localStorage.setItem("image", reader.result);
//       readerImage();
//     };
//     reader.readAsDataURL(file);
// }

// // Hàm lấy link trên local về và hiển thị ra.
// function readerImage() {
//     let result = localStorage.getItem("image");
//     console.log("Đường dẫn ảnh trên Local: ", result);
//     document.getElementById("changeImg").src = result;
// }
// readerImage();












// Ghi chú: Mình mới chỉ làm 1 chút về logic mà thôi, chưa nhiều chức năng lắm
// Trong tối nay cố gắng thêm 1 chút về các chức năng giống với file của Thầy Long 
// đưa ra.

// Danh sách việc cần làm tối nay.
// b1: HTML và CSS cho phân trang.


// === Việc đã làm được cho trang Product (Trang admin Quản lí sản phẩm.)
// 1. Thêm - sửa - xoá sản phẩm (chưa làm với ảnh).
// 2. Đầy đủ chức năng Phân trang (Chọn số trang, Tiến - Lùi, Chọn Size trang)
// 3. Thay đổi tình trạng Còn hàng - Hết hàng.
// 4. Chức năng tìm kiếm
// 5. Chức năng sắp xếp (Sắp xếp theo số lượng, và sắp xếp theo ngày thêm)
// --- Buổi chiều:
// 1. Có thể upload ảnh, chỉnh sửa ảnh.
// 2. Danh mục ở trang quản lí category phải khớp với danh mục quản lí ở product.

// *** Những việc cần làm tiếp theo:
// 2. Logic của trang User. (quản lí user)