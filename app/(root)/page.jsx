import { Fragment } from "react";
import ImageSlider from "../../components/ImageSlider";
import ProductSlider from "../../components/ProductSlider";
import NewsSlider from "../../components/NewsSlider";

export default function Home() {
  const images = [
    "https://media.loveitopcdn.com/22751/thumb/6912x3456/green-natural-healthy-food-menu-banner-4.jpg?zc=1",
    "https://via.placeholder.com/1200x600.png?text=Second+Image",
    "https://via.placeholder.com/1200x600.png?text=Third+Image",
  ];

  const teaProducts = [
    {
      title: "Trà thảo dược thanh lọc",
      imgSrc:
        "https://storage.googleapis.com/a1aa/image/lex7aEHW7MRzTi08pE6pxZlHC5mAcADyl4eC57PfqO37QRLnA.jpg",
      price: "60.000₫",
    },
    {
      title: "Trà 5 thực dưỡng",
      imgSrc:
        "https://storage.googleapis.com/a1aa/image/SdinWLJyfqwSD6O0zpxgLE1571rBWkFjCy8RYSNkAQpVU0yJA.jpg",
      price: "60.000₫",
    },
    {
      title: "Trà sữa yến mạch Thuận Hòa 300g",
      imgSrc:
        "https://storage.googleapis.com/a1aa/image/CjDoCIAvsn7FC53eCRNHaaQ7zNzM58LvMkMZ3eso4gvhoolTA.jpg",
      price: "60.000₫",
    },
    {
      title: "Trà thảo dược thanh lọc",
      imgSrc:
        "https://storage.googleapis.com/a1aa/image/lex7aEHW7MRzTi08pE6pxZlHC5mAcADyl4eC57PfqO37QRLnA.jpg",
      price: "60.000₫",
    },
    // Add more products as needed
  ];

  const powderProducts = [
    {
      title: "Bột gạo lứt đậu đỏ",
      imgSrc:
        "https://storage.googleapis.com/a1aa/image/D448Z5W4ByoPIdFKEnOP5vqDQoyq6P8RDIcu2TU9QHmKKa5E.jpg",
      price: "60.000₫",
    },
    {
      title: "Bột ngũ cốc kê lắc kê",
      imgSrc:
        "https://storage.googleapis.com/a1aa/image/Z7Zw6qsULz71DpSePCgswgwvzM7VFtawfDelBNbpQixyQRLnA.jpg",
      price: "60.000₫",
    },
    {
      title: "Bột gạo lứt mè đen",
      imgSrc:
        "https://storage.googleapis.com/a1aa/image/93ldhj6rvvIeQCtvn2vShCA0WI90pfwdcs4XVvv7ypdkoolTA.jpg",
      price: "60.000₫",
    },
    // Add more powder products here
  ];

  const nutritionPowderProducts = [
    {
      title: "Bột gạo lứt mè đen đậu xanh lòng",
      imgSrc:
        "https://storage.googleapis.com/a1aa/image/Ooaf4b30eVuGkEkefbXyFlFzf7EIift2ls28mrjRIYreTU0yJA.jpg",
      price: "60.000₫",
    },
    {
      title: "Bột dưỡng sinh thuận hòa",
      imgSrc:
        "https://storage.googleapis.com/a1aa/image/MkLoyEgVsS63NlrYUY06HySbCTFifBTce2FfV7cLsLfiiiWOB.jpg",
      price: "60.000₫",
    },
    {
      title: "Bột đậu xanh lòng",
      imgSrc:
        "https://storage.googleapis.com/a1aa/image/rNqqD28qWm4tKpKGkLmEsrbOILnBj2gRfOep3z1afOiBRRLnA.jpg",
      price: "60.000₫",
    },
    {
      title: "Bột đậu",
      imgSrc:
        "https://storage.googleapis.com/a1aa/image/ePbECoIuHqw2TCVexNB1VtDnff8AeCZC6DMDvORetG38LKa5E.jpg",
      price: "60.000₫",
    },
    // Add more products if needed
  ];

  const newsItems = [
    {
      title: "6 SẢN PHẨM ĐẠT OCOP 4 SAO",
      imgSrc:
        "https://storage.googleapis.com/a1aa/image/BcXfQyfx2VrxJUwPDmUvr5BYfB5JFl7kGTVi0Cr9bPZmRRLnA.jpg",
      description:
        "CEO - KTS. Lê Văn Cảnh đã vinh dự nhận giấy chứng nhận sản phẩm OCOP Cần Thơ với 6 sản phẩm đạt 4 sao.",
      date: "2023-10-01",
      views: 150,
    },
    {
      title: "HƯỞNG ỨNG KẾT NỐI GIAO THƯƠNG",
      imgSrc:
        "https://storage.googleapis.com/a1aa/image/4bXN3iPskW4LFhwzcMVaHaxTlX08uyUn6PBwH1qUFHSMKa5E.jpg",
      description: "Hưởng ứng kết nối giao thương vùng ĐBSCL cùng công ty.",
      date: "2023-09-25",
      views: 230,
    },
    {
      title: "THUẬN HÒA FOOD TẠI HỘI CHỢ",
      imgSrc:
        "https://storage.googleapis.com/a1aa/image/CBj3uhNexZ0nEaTtt0fCEXtBd4McPfL4bP6CWLivwSeXiiWOB.jpg",
      description: "Thuận Hòa Food đã tham gia hội chợ tại TP. Cần Thơ.",
      date: "2023-09-25",
      views: 230,
    },
    {
      title: "NÂNG TẦM SẢN PHẨM OCOP",
      imgSrc:
        "https://storage.googleapis.com/a1aa/image/xGrbPFpPV1baEFJHXUAelzc1PstaPLMstnJPvwLeEATsoolTA.jpg",
      description: "Nâng tầm sản phẩm OCOP Cần Thơ.",
      date: "2023-09-25",
      views: 230,
    },
  ];

  return (
    <Fragment>
      <div className="container mx-auto flex flex-wrap px-6">
        <aside className="lg:w-1/4 lg:block p-4 hidden">
          <h2 className="text-lg font-bold mb-4"></h2>
          <ul className="space-y-2"></ul>
        </aside>
        <div className="lg:w-3/4 p-4 w-full">
          <ImageSlider images={images} />
        </div>
      </div>
      <div className="container mx-auto flex">
        <main className="w-full p-4">
          <ProductSlider title="TRÀ THANH LỌC" products={teaProducts} />
          <ProductSlider title="BỘT THỰC DƯỠNG" products={powderProducts} />
          <ProductSlider
            title="BỘT DINH DƯỠNG BỔ SUNG"
            products={nutritionPowderProducts}
          />
          <NewsSlider title="TIN TỨC" newsItems={newsItems} />
        </main>
      </div>
    </Fragment>
  );
}
