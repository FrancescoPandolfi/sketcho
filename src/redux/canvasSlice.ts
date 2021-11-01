import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CanvasState {
  penColor: string;
  lineWidth: number;
  redoList: string[];
  undoList: string[];
}

const initialState: CanvasState = {
  penColor: '#001622',
  lineWidth: 5,
  redoList: [],
  undoList: []
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
  }
});

// Action creators are generated for each case reducer function
export const { changePenColor, setRedoList, setUndoList } = canvasSlice.actions;

export default canvasSlice.reducer;
