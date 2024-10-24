import CartItems from "@/components/orders/CartItem";
import CustomerInfo from "@/components/orders/CustomerInfo";
import OrderInfo from "@/components/orders/OrderInfo";

export default function Checkout() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row justify-between">
        <CustomerInfo />
        <OrderInfo />
        <CartItems />
      </div>
    </div>
  );
}