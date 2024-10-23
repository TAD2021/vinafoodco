const { PrismaClient, DisplayType } = require('@prisma/client')
const slugify = require('slugify');

const prisma = new PrismaClient();

// async function createCategories() {
//   const categories = await prisma.category.createMany({
//     data: [
//       { name: 'Trà Sâm' },
//       { name: 'Dược Liệu' },
//       { name: 'Bột Thực Phẩm' },
//       { name: 'Yến Sào' },
//     ],
//   });

//   console.log(categories);
// }

// createCategories();

// async function createUser(email, password, name) {
//   const user = await prisma.user.create({
//     data: {
//       email,
//       password,
//       name,
//     },
//   });
//   console.log('User created:', user);
// }

// createUser('admin@gmail.com', 'password123', 'John Doe')
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//   });

async function main() {
  const userId = 1; // ID người dùng
  const categoryId = 1; // ID danh mục

  const name = 'Trà sâm thái nguyên ww2';
  const slug = slugify(name, { lower: true });

  // Danh sách tên thẻ
  const tagNames = ['Trà sâm', 'tree sâm'];

  // Tìm hoặc tạo thẻ
  const tags = await Promise.all(tagNames.map(async (tagName) => {
      let tag = await prisma.tag.findUnique({
          where: { name: tagName },
      });

      if (!tag) {
          tag = await prisma.tag.create({
              data: { name: tagName },
          });
      }

      return tag;
  }));

  // Tạo một sản phẩm mới
  const newProduct = await prisma.product.create({
      data: {
          name,
          description: 'Trà sâm thái nguyên',
          price: 200000,
          slug,
          userId: userId,
          categoryId: categoryId,
          tags: {
              connect: tags.map(tag => ({ id: tag.id })), // Kết nối với thẻ đã tìm thấy hoặc tạo mới
          },
          images: {
              create: [
                  { url: 'https://i.pinimg.com/564x/50/06/87/500687e92f063c19bdb0d6d8174c80ba.jpg' },
                  { url: 'https://i.pinimg.com/enabled_hi/564x/67/0e/c3/670ec3fd3cb5e64b4a67e4cce9714047.jpg' },
                  { url: 'https://i.pinimg.com/enabled_hi/564x/67/0e/c3/670ec3fd3cb5e64b4a67e4cce9714047.jpg' }
              ], // Thêm hình ảnh
          },
          attributes: {
              create: [
                  {
                      attributeName: 'Thành phần',
                      attributeValue: 'Đậu đỏ, Đậu xanh, Đậu đen, Đậu nành, Gạo lứt đã được rang chín.',
                      sortOrder: 1,
                      displayType: 'SINGLE_LINE', // Sửa lại nếu cần
                  },
                  {
                      attributeName: 'Công dụng',
                      attributeValue: `
                        <li>Bồi dưỡng cơ thể, trợ tiêu hóa, nhuận trường.</li>
                        <li>Là bữa ăn sáng, ăn xế với đầy đủ dưỡng chất.</li>
                        <li>Rất thích hợp cho người mới ốm dậy, biếng ăn, người lớn tuổi, khả năng ăn kém.</li>
                        <li>Rất tốt cho phụ nữ mang thai và cho con bú. Kokkoh dùng thay sữa mẹ nếu mẹ không đủ sữa. Sử dụng làm bột ăn dặm cho trẻ em.</li>
                        <li>Là bữa ăn thay thế để giảm cân hoặc tăng cân.</li>
                      `,
                      sortOrder: 2,
                      displayType: 'LIST', // Sửa lại nếu cần
                  },
              ], // Thêm thuộc tính
          },
      },
  });

  console.log(`Đã thêm sản phẩm: ${newProduct.name}`);
}

main()
  .catch(e => {
      console.error(e);
      process.exit(1);
  })
  .finally(async () => {
      await prisma.$disconnect();
  });