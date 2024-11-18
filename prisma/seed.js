const { PrismaClient, DisplayType } = require('@prisma/client');
const slugify = require('slugify');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

// async function createCategories() {
//   const categories = await prisma.category.createMany({
//     data: [
//       { name: 'Trà Sâm', slug: slugify('Trà Sâm', { lower: true }) },
//       { name: 'Dược Liệu', slug: slugify('Dược Liệu', { lower: true }) },
//       {
//         name: 'Bột Thực Phẩm',
//         slug: slugify('Bột Thực Phẩm', { lower: true }),
//       },
//       { name: 'Yến Sào', slug: slugify('Yến Sào', { lower: true }) },
//     ],
//   });

//   console.log(categories);
// }

// createCategories();

// async function createUser (email, password, name) {
//   // Hash password
//   const hashedPassword = await bcrypt.hash(password, 10); // 10 là số lần hash

//   // Tạo người dùng mới
//   const user = await prisma.user.create({
//     data: {
//       email,
//       password: hashedPassword, // Sử dụng mật khẩu đã hash
//       name,
//     },
//   });

//   console.log('User  created:', user);
// }

// // Gọi hàm createUser
// createUser ('admin@gmail.com', 'password123', 'John Doe')
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//   });

// async function createProduct() {
//   const userId = 1; // ID người dùng
//   const categoryId = 1; // ID danh mục

//   const name = 'Trà sâm thái nguyên ww2';
//   const slug = slugify(name, { lower: true });

//   // Danh sách tên thẻ
//   const tagNames = ['Trà sâm', 'tree sâm'];

//   // Tìm hoặc tạo thẻ
//   const tags = await Promise.all(
//     tagNames.map(async (tagName) => {
//       let tag = await prisma.tag.findUnique({
//         where: { name: tagName },
//       });

//       if (!tag) {
//         tag = await prisma.tag.create({
//           data: { name: tagName },
//         });
//       }

//       return tag;
//     })
//   );

//   // Tạo một sản phẩm mới
//   const newProduct = await prisma.product.create({
//     data: {
//       name,
//       description: 'Trà sâm thái nguyên',
//       price: 200000,
//       slug,
//       userId: userId,
//       stock: 100,
//       categoryId: categoryId,
//       tags: {
//         connect: tags.map((tag) => ({ id: tag.id })), // Kết nối với thẻ đã tìm thấy hoặc tạo mới
//       },
//       images: {
//         create: [
//           {
//             url: 'https://i.pinimg.com/564x/50/06/87/500687e92f063c19bdb0d6d8174c80ba.jpg',
//           },
//           {
//             url: 'https://i.pinimg.com/enabled_hi/564x/67/0e/c3/670ec3fd3cb5e64b4a67e4cce9714047.jpg',
//           },
//           {
//             url: 'https://i.pinimg.com/enabled_hi/564x/67/0e/c3/670ec3fd3cb5e64b4a67e4cce9714047.jpg',
//           },
//         ], // Thêm hình ảnh
//       },
//       attributes: {
//         create: [
//           {
//             attributeName: 'Thành phần',
//             attributeValue:
//               'Đậu đỏ, Đậu xanh, Đậu đen, Đậu nành, Gạo lứt đã được rang chín.',
//             sortOrder: 1,
//             displayType: 'SINGLE_LINE', // Sửa lại nếu cần
//           },
//           {
//             attributeName: 'Công dụng',
//             attributeValue: `
//                         <li>Bồi dưỡng cơ thể, trợ tiêu hóa, nhuận trường.</li>
//                         <li>Là bữa ăn sáng, ăn xế với đầy đủ dưỡng chất.</li>
//                         <li>Rất thích hợp cho người mới ốm dậy, biếng ăn, người lớn tuổi, khả năng ăn kém.</li>
//                         <li>Rất tốt cho phụ nữ mang thai và cho con bú. Kokkoh dùng thay sữa mẹ nếu mẹ không đủ sữa. Sử dụng làm bột ăn dặm cho trẻ em.</li>
//                         <li>Là bữa ăn thay thế để giảm cân hoặc tăng cân.</li>
//                       `,
//             sortOrder: 2,
//             displayType: 'LIST', // Sửa lại nếu cần
//           },
//         ], // Thêm thuộc tính
//       },
//     },
//   });

//   console.log(`Đã thêm sản phẩm: ${newProduct.name}`);
// }

// createProduct()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

// async function createPost() {
//   // Create Posts
//   const post1 = await prisma.post.create({
//     data: {
//       title: 'First Post',
//       content: `<Image
//               alt="Hội nghị đánh giá và xếp hạng sản phẩm OCOP"
//               className="w-full mb-4"
//               height="400"
//               src="https://storage.googleapis.com/a1aa/image/xstACz8PTH5EGNt9BuLlIk05xeEwLCiUNJPMnhU5FheOTTmTA.jpg"
//               width="800"
//             />
//             <p className="text-sm text-center text-gray-600 mb-4">
//               Các đại biểu tham dự hội nghị
//             </p>
//             <p className="mb-4">
//               Tại hội nghị, sau khi nghe các báo cáo, đánh giá và kết quả chấm
//               điểm của Hội đồng đánh giá và xếp hạng sản phẩm OCOP cấp quận,
//               huyện, các thành viên Hội đồng cấp thành phố đã tham gia đánh giá,
//               thảo luận, góp ý để giúp các chủ thể hoàn thiện sản phẩm. Đồng
//               thời, tiến hành chấm điểm, xếp hạng sao cho các sản phẩm.
//             </p>
//             <p className="mb-4">
//               Kết quả, 6 sản phẩm của Cơ sở Thuận Hòa được Hội đồng OCOP thành
//               phố chấm điểm đạt từ 80,5-81 điểm, đủ điều được xếp hạng sản phẩm
//               OCOP 4 sao. Sản phẩm trà hòa tan dinh dưỡng Hằng Ngày của Công ty
//               TNHH một thành viên Hygie &amp; Panacee đạt 92 điểm, trà hòa tan
//               tốt cho Huyết áp đạt 94 điểm. 2 sản phẩm này được Hội đồng OCOP
//               thành phố công nhận sản phẩm OCOP 4 sao và Hội đồng thành phố
//               thống nhất sẽ làm hồ sơ gửi về Hội đồng OCOP Trung ương để đề nghị
//               đánh giá, xếp hạng sản phẩm OCOP 5 sao cho 2 sản phẩm này. Riêng 6
//               sản phẩm của huyện Cờ Đỏ, được Hội đồng OCOP thành phố đề nghị
//               chỉnh sửa nhằm nâng mức độ bổ sung, hoàn thiện hồ sơ để đánh giá,
//               xếp hạng đợt sau.
//             </p>
//             <p className="mb-4">Tin, ảnh: KHÁNH TRUNG</p>`,
//       thumbnail:
//         'https://i.pinimg.com/564x/d7/40/ff/d740ffcfed14385c70b70c326cfe7d0d.jpg',
//       slug: slugify('First Post', { lower: true }),
//       type: 'tin-tuc',
//       authorId: 1,
//     },
//   });

//   const post2 = await prisma.post.create({
//     data: {
//       title: 'Second Post',
//       content: 'This is the content of the second post.',
//       thumbnail:
//         'https://i.pinimg.com/enabled_hi/564x/90/dd/3f/90dd3f2ef158e6c34afa09ff68729ddb.jpg',
//       slug: slugify('Second Post', { lower: true }),
//       type: 'gioi-thieu',
//       authorId: 1,
//     },
//   });

//   const post3 = await prisma.post.create({
//     data: {
//       title: 'Third Post',
//       content: 'This is the content of the third post.',
//       thumbnail:
//         'https://i.pinimg.com/enabled_hi/564x/2d/81/7f/2d817f94a758568b07c69faa5c9e5e7e.jpg',
//       slug: slugify('Third Post'),
//       type: 'tin-tuc',
//       authorId: 1,
//     },
//   });

//   console.log({ post1, post2, post3 });
// }

// createPost()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

// async function createPaymentMethod() {
//   const paymentMethods = [
//     {
//       name: 'Chuyển Khoản Qua Ngân Hàng',
//       code: 'BANK_TRANSFER',
//       description: `Bạn chuyển khoản qua các ngân hàng dưới đây, nội dung chuyển khoản: tên - số điện thoại - mã đơn hàng.
//         Chủ tài khoản: Trần Quang Hiển, Ngân hàng Sacombank, số tài khoản 2726259373- phòng giao dịch Bình Hoà.`,
//     },
//     {
//       name: 'Thu Tiền Tận Nơi - COD',
//       code: 'COD',
//       description: `Chúng tôi giao hàng và thu tiền tận nơi của bạn.`,
//     },
//   ];

//   for (const method of paymentMethods) {
//     await prisma.paymentMethod.create({
//       data: method,
//     });
//   }

//   console.log('Các phương thức thanh toán đã được thêm thành công!');
// }

// createPaymentMethod()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

async function main() {
  // Tạo một số tag mẫu
  const tags = [
    { name: 'Electronics' },
    { name: 'Fashion' },
    { name: 'Home Appliances' },
    { name: 'Books' },
    { name: 'Toys' },
  ];

  for (const tag of tags) {
    await prisma.tag.create({
      data: tag,
    });
  }

  console.log('Tags created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
