import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface CanvasState {
  penColor: number;
  lineWidth: number;
  redoList: string[];
  undoList: string[];
  createModalState: boolean;
  roomId: string | null;
}

const initialState: CanvasState = {
  penColor: 0,
  lineWidth: 0,
  redoList: [],
  undoList: [],
  createModalState: false,
  roomId: null
}

export const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    changePenColor: (state, action: PayloadAction<number>) => {
      state.penColor = action.payload
    },
    changeLineWidth: (state, action: PayloadAction<number>) => {
      state.lineWidth = action.payload
    },
    setRedoList: (state, action: PayloadAction<string[]>) => {
      state.redoList = action.payload
    },
    setUndoList: (state, action: PayloadAction<string[]>) => {
      state.undoList = action.payload
    },
    setCreateModalState: (state, action: PayloadAction<boolean>) => {
      state.createModalState = action.payload
    },
    setRoomId: (state, action: PayloadAction<string>) => {
      state.roomId = action.payload
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  changePenColor,
  changeLineWidth,
  setRedoList,
  setUndoList,
  setCreateModalState,
  setRoomId
} = canvasSlice.actions;

export default canvasSlice.reducer;
