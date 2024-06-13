import http from "@/lib/http";

const orderRequest = {
  cancelOrder: (orderId: string) =>
    http.put(`/list-orders/cancel/${orderId}`, {}, { token: true }),
};

export default orderRequest;
