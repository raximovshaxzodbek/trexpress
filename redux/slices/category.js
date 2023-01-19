import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosService from "../../services/axios";
export const getCategory = createAsyncThunk(
  "category/getCategory",
  async () => {
    const response = await axiosService.get("/api/v1/rest/categories/paginate");
    return {
      data: response.data.data,
    };
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categoryList: [],
    total: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.categoryList = action.payload.data;
      state.total = action.payload.totalPages;
    });
  },
});

export default categorySlice.reducer;
