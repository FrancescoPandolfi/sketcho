import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CanvasState {
  penColor: string;
  lineWidth: number;
  redoList: string[];
  undoList: string[];
  modalState: boolean;
}

const initialState: CanvasState = {
  penColor: '#001622',
  lineWidth: 5,
  redoList: [],
  undoList: [],
  modalState: false
}

export const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    changePenColor: (state, action: PayloadAction<string>) => {
      state.penColor = action.payload
    },
    setRedoList: (state, action: PayloadAction<string[]>) => {
      state.redoList = action.payload
    },
    setUndoList: (state, action: PayloadAction<string[]>) => {
      state.undoList = action.payload
    },
    setModalState: (state, action: PayloadAction<boolean>) => {
      state.modalState = action.payload
    }
  }
});

// Action creators are generated for each case reducer function
export const { changePenColor, setRedoList, setUndoList, setModalState } = canvasSlice.actions;

export default canvasSlice.reducer;
