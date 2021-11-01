import {useEffect, useRef, useState} from 'react';
import Header from "./components/Header/Header";
import Colorbar from "./components/ColorBar/Colorbar";
import socket from "./config/socket";
import {BrowserRouter as Router} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./redux/store";
import {setRedoList, setUndoList} from "./redux/canvasSlice";


function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const ctx = useRef<CanvasRenderingContext2D | null>(null)
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const canvasState = useSelector((state: RootState) => state.canvas);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('connect', () => console.log('connected'))
    socket.on("start drawing", ([x, y]) => {
      startDrawing(x, y);
    });
    socket.on("drawing", ([x, y]) => {
      draw(x, y);
    });
    socket.on("finish drawing", () => {
      finishDrawing();
    });
  }, []);

  /** First setup  */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    ctx.current = canvas.getContext('2d');

  }, []);

  /** Setup line configuration*/
  useEffect(() => {
    if (!ctx.current) return;
    ctx.current.lineCap = 'round';
    ctx.current.strokeStyle = canvasState.penColor;
    ctx.current.lineWidth = canvasState.lineWidth;
  }, [canvasState.penColor, canvasState.lineWidth]);

  /** Setup event listener to handle window resize*/
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const canvasCtx = canvas.getContext('2d');
      if (!canvasCtx) return;
      const imageData = canvasCtx.getImageData(0, 0, canvas.width, canvas.height);

      // Resize Canvas
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      canvasCtx.putImageData(imageData, 0, 0);
      ctx.current = canvasCtx!;
      ctx.current.lineCap = 'round';
      ctx.current.strokeStyle = canvasState.penColor;
      ctx.current.lineWidth = canvasState.lineWidth;
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  const history = {
    saveState: function (c: HTMLCanvasElement | null) {
      dispatch(setUndoList([...canvasState.undoList, c!.toDataURL()]));
      dispatch(setRedoList([]));
    },
    undo: function (canvas: HTMLCanvasElement | null, ctx: CanvasRenderingContext2D | null) {
      this.undoState(canvas!, ctx!);
    },
    redo: function (canvas: HTMLCanvasElement | null, ctx: CanvasRenderingContext2D | null) {
      this.restoreState(canvas!, ctx!);
    },
    undoState: function (c: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        const undoUrl = canvasState.undoList.filter((v, i) => i === canvasState.undoList.length - 1)[0];
        dispatch(setUndoList(canvasState.undoList.filter((v, i) => i !== canvasState.undoList.length - 1)));
        dispatch(setRedoList([...canvasState.redoList, c.toDataURL()]));
        this.renderImage(undoUrl, ctx);
    },
    restoreState: function (c: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        const redoUrl = canvasState.redoList.filter((value, i) => i === canvasState.redoList.length - 1)[0];
        dispatch(setUndoList([...canvasState.undoList, c.toDataURL()]));
        dispatch(setRedoList(canvasState.redoList.filter((v, i) => i !== canvasState.redoList.length - 1)));
        this.renderImage(redoUrl, ctx);
    },
    renderImage: (undoUrl: string, ctx: CanvasRenderingContext2D) => {
      const img: HTMLImageElement = document.createElement('img');
      const [W, H] = [window.innerWidth, window.innerHeight];
      img.src = undoUrl;
      img.onload = () => {
        ctx.clearRect(0, 0, W, H);
        ctx.drawImage(img, 0, 0, W, H, 0, 0, W, H);
      }
    }
  }


  /** Start drawing */
  const onStartDrawing = ({nativeEvent}: any) => {
    const {offsetX, offsetY} = nativeEvent;
    socket.emit('start draw', [offsetX, offsetY]);
    startDrawing(offsetX, offsetY);
  }
  const startDrawing = (offsetX: number, offsetY: number) => {
    history.saveState(canvasRef.current);
    ctx.current?.beginPath();
    ctx.current?.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  }

  /** while drawing*/
  const onDraw = ({nativeEvent}: any) => {
    if (!isDrawing) return;
    const {offsetX, offsetY} = nativeEvent;
    socket.emit('draw', [offsetX, offsetY]);
    draw(offsetX, offsetY);
  }

  const draw = (offsetX: number, offsetY: number) => {
    ctx.current!.lineTo(offsetX, offsetY);
    ctx.current!.stroke();
  }

  /** Finish drawing */
  const onFinishDrawing = () => {
    socket.emit('finish draw');
    finishDrawing();
  }

  const finishDrawing = () => {
    ctx.current?.closePath();
    setIsDrawing(false);
  }

  /** Clean the Canvas */
  const cleanCanvas = () => {
    ctx.current!.fillStyle = '#FFFFFF';
    ctx.current!.clearRect(0, 0, window.innerWidth, window.innerHeight);
    dispatch(setUndoList([]));
    dispatch(setRedoList([]));
  }

  /** Download the draw */
  const downloadSketch = () => {
    const link = document.createElement('a');
    link.download = 'sketch.png';
    link.href = ctx.current!.canvas.toDataURL();
    link.click();
  }

  return (
    <Router>
      <Header
        downloadSketch={downloadSketch}
        cleanCanvas={cleanCanvas}
        undo={() => history.undo(canvasRef.current, ctx.current)}
        redo={() => history.redo(canvasRef.current, ctx.current)}
      />
      <canvas
        id="canvas"
        onMouseDown={onStartDrawing}
        onMouseUp={onFinishDrawing}
        onMouseMove={onDraw}
        ref={canvasRef}
      />
      <Colorbar/>
    </Router>
  );
}

export default App;
