const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // Tạo người dùng
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      password: 'password123',
      name: 'Nguyễn Văn A',
    },
  })

  const user2 = await prisma.user.create({
    data: {
      email: 'user2@example.com',
      password: 'password456',
      name: 'Trần Thị B',
    },
  })

  // Tạo danh mục
  const category1 = await prisma.category.create({
    data: {
      name: 'Điện thoại',
      description: 'Các sản phẩm điện thoại di động',
    },
  })

  const category2 = await prisma.category.create({
    data: {
      name: 'Laptop',
      description: 'Các sản phẩm laptop',
    },
  })

  // Tạo sản phẩm
  const product1 = await prisma.product.create({
    data: {
      name: 'Điện thoại Samsung Galaxy S23',
      description: 'Điện thoại Samsung Galaxy S23 với màn hình 6.1 inch.',
      price: 24990000,
      userId: user1.id,
      categoryId: category1.id,
      images: {
        create: [
          { url: 'https://example.com/samsung-galaxy-s23-1.jpg' },
          { url: 'https://example.com/samsung-galaxy-s23-2.jpg' },
        ],
      },
    },
  })

  const product2 = await prisma.product.create({
    data: {
      name: 'Laptop Dell XPS 13',
      description: 'Laptop Dell XPS 13 với thiết kế mỏng nhẹ.',
      price: 33990000,
      userId: user2.id,
      categoryId: category2.id,
      images: {
        create: [
          { url: 'https://example.com/dell-xps-13-1.jpg' },
          { url: 'https://example.com/dell-xps-13-2.jpg' },
        ],
      },
    },
  })

  // Tạo bài viết
  const post1 = await prisma.post.create({
    data: {
      title: 'Review Samsung Galaxy S23',
      content: 'Chi tiết về sản phẩm Samsung Galaxy S23.',
      authorId: user1.id,
    },
  })

  // Tạo bình luận
  const comment1 = await prisma.comment.create({
    data: {
      content: 'Sản phẩm tuyệt vời!',
      userId: user2.id,
      productId: product1.id,
      postId: post1.id,
    },
  })

  // Tạo giỏ hàng
  const cart = await prisma.cart.create({
    data: {
      userId: user2.id,
      cartItems: {
        create: {
          quantity: 1,
          productId: product1.id,
        },
      },
    },
  })

  // Tạo đơn hàng
  const order = await prisma.order.create({
    data: {
      userId: user1.id,
      totalPrice: product1.price,
      orderItems: {
        create: {
          quantity: 1,
          productId: product1.id,
          price: product1.price,
        },
      },
    },
  })

  // Tạo thanh toán
  await prisma.payment.create({
    data: {
      userId: user1.id,
      orderId: order.id,
      amount: order.totalPrice,
      method: 'CREDIT_CARD',
      status: 'COMPLETED',
    },
  })

  console.log('Dữ liệu đã được tạo thành công!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
