import { useRouter } from "next/router";
import React from "react";
import { PaystackConsumer } from "react-paystack";
import { useDispatch, useSelector } from "react-redux";
import { TransactionsApi } from "../../../api/main/transactions";
import { clearCart, clearOrderShops } from "../../../redux/slices/cart";
import { clearOrder } from "../../../redux/slices/order";

function Paystack({
  createdOrderData,
  createOrder,
  payment,
  setCheckoutContent,
}) {
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const router = useRouter();
  // you can call this function anything
  const handleSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    TransactionsApi.create(createdOrderData.id, {
      payment_sys_id: payment.id,
    })
      .then(() => {
        dispatch(clearOrderShops());
        dispatch(clearCart());
        dispatch(clearOrder());
        setCheckoutContent("status");
      })
      .catch((error) => {
        console.error(error);
      });

    console.log("reference", reference);
  };

  // you can call this function anything
  const handleClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    dispatch(clearOrderShops());
    dispatch(clearCart());
    dispatch(clearOrder());
    router.push("/order-history");
    toast.success(
      "Your order created successfully! You can pay later on the order history page"
    );
    console.log("closed");
  };
  const config = {
    reference: new Date().getTime().toString(),
    email: user.email,
    amount: parseFloat(createdOrderData?.price?.toFixed(2)) * 100,
    publicKey: payment?.client_id,
    currency: "ZAR",
    order_id: createdOrderData?.id,
  };
  const componentProps = {
    ...config,
    text: "Paystack Button Implementation",
    onSuccess: (reference) => handleSuccess(reference),
    onClose: handleClose,
  };

  return (
    <>
      {Object.keys(createdOrderData).length ? (
        <PaystackConsumer {...componentProps}>
          {({ initializePayment }) => (
            <button
              className="btn-dark"
              onClick={() => initializePayment(handleSuccess, handleClose)}
            >
              Paystack
            </button>
          )}
        </PaystackConsumer>
      ) : (
        <button className="btn-dark" onClick={createOrder}>
          Pay
        </button>
      )}
    </>
  );
}

export default Paystack;
