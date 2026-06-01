import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
  mode: 'add',
  data: null,
}

const modalSlice = createSlice({
  name: 'modal',

  initialState,

  reducers: {
    openModal: (state, action) => {
      state.isOpen = true
      state.mode = action.payload?.mode || 'add'
      state.data = action.payload?.data || null
    },

    closeModal: (state) => {
      state.isOpen = false
      state.mode = 'add'
      state.data = null
    },
  },
})

export const { openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer
