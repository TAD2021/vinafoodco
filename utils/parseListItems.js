export const parseListItems = (htmlString) => {
    const tempElement = document.createElement('div'); // Tạo một phần tử tạm thời
    tempElement.innerHTML = htmlString; // Gán nội dung HTML vào phần tử tạm
    const listItems = tempElement.getElementsByTagName('li'); // Lấy tất cả các thẻ <li>
    
    return Array.from(listItems).map((item, index) => (
        <li key={index}>{item.innerHTML}</li> // Trả về các thẻ <li> dưới dạng phần tử JSX
    ));
};