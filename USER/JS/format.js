function formatCurrency(amount) {
    // Kiểm tra xem amount có phải là số hay không
    if (isNaN(amount)) {
        return "Không phải là số";
    }

    // Sử dụng Intl.NumberFormat để định dạng số và chuyển đổi thành chuỗi tiền tệ
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0, // Số lẻ tối thiểu là 0
    });

    return formatter.format(amount);
}

// Ví dụ sử dụng hàm
// let amount = 1234567.89;
// let formattedAmount = formatCurrency(amount);
// console.log(formattedAmount);  // Output: "1.234.567,89 ₫"