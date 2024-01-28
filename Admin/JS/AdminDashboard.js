// Lấy dữ liệu của người dùng đã đăng kí trên Local về
let listUser = JSON.parse(localStorage.getItem("users"))

// Hàm vẽ thông tin user
function renderListUser() {
    let counter = 1; // Biến đếm số thứ tự

    // dùng map() lặp qua và trả về các danh sách user
    document.getElementById("tbody").innerHTML = listUser.map((item) => {
        let {id, email, username, role, satatus} = item
        if(item.role == 1) {
            return (`
                <tr>
                    <td>${counter++}</td>
                    <td>${id}</td>
                    <td class = ${satatus == true ? "" : "strikethrough-line"}>${username}</td>
                    <td>${email}</td>
                    <td class = ${satatus == true ? "" : "text-color"}>${satatus == true ? "Đang hoạt động" : "Đã bị chặn"}</td>
                    <td>
                        <button onclick = "blockUser(${id})">${satatus == true ? "Chặn" : "Bỏ chặn"}</button>
                        <button onclick = "deleteUser(${id})">Xoá</button>
                        <button>Chi tiết</button>
                    </td>
                </tr>
            `)
        }
    }).join("")
}
renderListUser()

// === Hàm xoá user ============================================
function deleteUser(id) {
    // Dùng for lặp qua danh sách User
    for (let i = 0; i < listUser.length; i++) {
        if (listUser[i].id === id) {
            listUser.splice(i, 1)
            break // Dừng vòng lặp
        }
    }
    // Đưa lên Local thông tin mới nhất.
    localStorage.setItem("users", JSON.stringify(listUser))

    renderListUser()
}

// === Hàm chặn user ============================================
function blockUser(id) {
    for (let i = 0; i < listUser.length; i++) {
        if(listUser[i].id === id) {
            if(listUser[i].satatus === true) {
                listUser[i].satatus = false
                break
            } else if(listUser[i].satatus === false) {
                listUser[i].satatus = true
                break
            }
        }
    }
    // Đưa lên Local thông tin mới nhất.
    localStorage.setItem("users", JSON.stringify(listUser))

    renderListUser()
}

// ===== hàm Đăng Xuất ==========================================
let bPopup = document.getElementById("popup");

function fOpenPopup() {
    bPopup.classList.add("oppen-popup");
}

function logOut() {
    window.location.href = "../../USER/HTML/login.html"
}
function fClosePopup() {
    bPopup.classList.remove("oppen-popup");
}