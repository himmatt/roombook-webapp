import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
  mode: '',
  data: null,
}

const modalSlice = createSlice({
  name: 'modal',

  initialState,

  reducers: {
    openModal: (state, action) => {
      state.isOpen = true
      state.mode = action.payload?.mode || ''
      state.data = action.payload?.data || null
    },

    closeModal: (state) => {
      state.isOpen = false
      state.mode = ''
      state.data = null
    },
  },
})

export const { openModal, closeModal } = modalSlice.actions

export const selectModalState = (state) => state.modal.isOpen

export const selectModalMode = (state) => state.modal.mode

export default modalSlice.reducer
