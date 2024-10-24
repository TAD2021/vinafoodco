export const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleDateString('vi-VN');
}