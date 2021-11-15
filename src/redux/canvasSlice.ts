import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface CanvasState {
  penColor: string;
  lineWidth: number;
  redoList: string[];
  undoList: string[];
  joinModalState: boolean;
  createModalState: boolean;
  roomId: string;
}

const initialState: CanvasState = {
  penColor: '#001622',
  lineWidth: 5,
  redoList: [],
  undoList: [],
  joinModalState: false,
  createModalState: false,
  roomId: '123'
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
    setJoinModalState: (state, action: PayloadAction<boolean>) => {
      state.joinModalState = action.payload
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
  setRedoList,
  setUndoList,
  setJoinModalState,
  setCreateModalState,
  setRoomId
} = canvasSlice.actions;

export default canvasSlice.reducer;
