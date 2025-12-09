import { configureStore } from "@reduxjs/toolkit";
import cartReducer, {
  addItem,
  removeItem,
  clearCart,
  selectCartTax,
  selectCartTotal,
  selectCartItemCount,
} from "./cartSlice";

describe("cartSlice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        cart: cartReducer,
      },
    });
  });

  test("should handle initial state", () => {
    expect(store.getState().cart).toEqual({
      items: [],
      totalAmount: 0,
      discount: null,
      isLoading: false,
      error: null,
    });
  });

  test("should handle addItem", () => {
    const item = { id: 1, name: "Test Item", price: 10.99 };
    store.dispatch(addItem(item));

    const state = store.getState().cart;
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual({ ...item, qty: 1 });
    expect(state.totalAmount).toBe(10.99);
  });

  test("should increment quantity when adding existing item", () => {
    const item = { id: 1, name: "Test Item", price: 10.99 };
    store.dispatch(addItem(item));
    store.dispatch(addItem(item));

    const state = store.getState().cart;
    expect(state.items).toHaveLength(1);
    expect(state.items[0].qty).toBe(2);
    expect(state.totalAmount).toBe(21.98);
  });

  test("should handle removeItem", () => {
    const item = { id: 1, name: "Test Item", price: 10.99 };
    store.dispatch(addItem(item));
    store.dispatch(addItem(item));
    store.dispatch(removeItem(1));

    const state = store.getState().cart;
    expect(state.items[0].qty).toBe(1);
    expect(state.totalAmount).toBe(10.99);
  });

  test("should remove item completely when qty is 1", () => {
    const item = { id: 1, name: "Test Item", price: 10.99 };
    store.dispatch(addItem(item));
    store.dispatch(removeItem(1));

    const state = store.getState().cart;
    expect(state.items).toHaveLength(0);
    expect(state.totalAmount).toBe(0);
  });

  test("should handle clearCart", () => {
    const item = { id: 1, name: "Test Item", price: 10.99 };
    store.dispatch(addItem(item));
    store.dispatch(clearCart());

    const state = store.getState().cart;
    expect(state.items).toHaveLength(0);
    expect(state.totalAmount).toBe(0);
  });

  test("should set error for invalid item", () => {
    const invalidItem = { id: 1 }; // Missing price
    store.dispatch(addItem(invalidItem));

    const state = store.getState().cart;
    expect(state.error).toBeTruthy();
  });

  test("selectCartTax should calculate 10% tax", () => {
    const item = { id: 1, name: "Test Item", price: 100 };
    store.dispatch(addItem(item));

    const tax = selectCartTax(store.getState());
    expect(tax).toBe(10);
  });

  test("selectCartItemCount should count total items", () => {
    store.dispatch(addItem({ id: 1, name: "Item 1", price: 10 }));
    store.dispatch(addItem({ id: 1, name: "Item 1", price: 10 }));
    store.dispatch(addItem({ id: 2, name: "Item 2", price: 20 }));

    const count = selectCartItemCount(store.getState());
    expect(count).toBe(3); // 2 of item 1, 1 of item 2
  });
});
