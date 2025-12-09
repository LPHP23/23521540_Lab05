import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for applying discount code
export const applyDiscountCode = createAsyncThunk(
  "cart/applyDiscount",
  async (code, { rejectWithValue }) => {
    try {
      // Simulate API call to validate discount code
      const response = await fetch(`/api/discounts/${code}`);
      if (!response.ok) throw new Error("Invalid discount code");
      const data = await response.json();
      return data.discount; // e.g., { percentage: 0.1, code: "SAVE10" }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: { 
    items: [], 
    totalAmount: 0, 
    discount: null,
    isLoading: false,
    error: null
  },
  reducers: {
    addItem(state, action) {
      const item = action.payload;
      
      // Validation
      if (!item || !item.id || typeof item.price !== "number" || item.price < 0) {
        state.error = "Invalid item data";
        return;
      }
      
      const existing = state.items.find(i => i.id === item.id);
      if (existing) {
        existing.qty++;
      } else {
        state.items.push({ ...item, qty: 1 });
      }
      state.totalAmount = parseFloat((state.totalAmount + item.price).toFixed(2));
      state.error = null;
    },
    removeItem(state, action) {
      const id = action.payload;
      const existing = state.items.find(i => i.id === id);
      
      if (!existing) {
        state.error = "Item not found in cart";
        return;
      }
      
      state.totalAmount = parseFloat((state.totalAmount - existing.price).toFixed(2));
      
      if (existing.qty === 1) {
        state.items = state.items.filter(i => i.id !== id);
      } else {
        existing.qty--;
      }
      state.error = null;
    },
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
      state.discount = null;
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyDiscountCode.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(applyDiscountCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.discount = action.payload;
      })
      .addCase(applyDiscountCode.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to apply discount";
      });
  },
});

export const { addItem, removeItem, clearCart, clearError } = cartSlice.actions;
export default cartSlice.reducer;

// Memoized selectors for better performance
export const selectCartItems = (state) => state.cart.items;
export const selectTotalAmount = (state) => state.cart.totalAmount;
export const selectDiscount = (state) => state.cart.discount;

export const selectCartTax = createSelector(
  [selectTotalAmount],
  (total) => parseFloat((total * 0.1).toFixed(2))
);

export const selectCartTotal = createSelector(
  [selectTotalAmount, selectCartTax, selectDiscount],
  (subtotal, tax, discount) => {
    const discountAmount = discount ? subtotal * discount.percentage : 0;
    return parseFloat((subtotal + tax - discountAmount).toFixed(2));
  }
);

export const selectCartItemCount = createSelector(
  [selectCartItems],
  (items) => items.reduce((count, item) => count + item.qty, 0)
);
