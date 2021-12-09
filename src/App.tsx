import Header from "./components/Header/Header";
import Colorbar from "./components/ColorBar/Colorbar";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./redux/store";
import CreateModal from "./components/Modal/CreateModal";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import socket from "./config/socket";
import {setRedoList, setRoomId, setUndoList} from "./redux/canvasSlice";
import {colors} from "./utils/constants";
import {useLocation, useNavigate} from "react-router-dom";
import {uid} from "./utils/uid";


function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
  const canvasState = useSelector((state: RootState) => state.canvas);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let location = useLocation();


  /**
   * Join the room if it's set in the url
   * */
  useEffect(() => {
    console.log('pathnaem', location.pathname)

    const roomIdInUrl = location.pathname.substring(1);
    console.log('id url', roomIdInUrl)

    if (roomIdInUrl) {
      navigate(roomIdInUrl);
      dispatch(setRoomId(roomIdInUrl));
      socket.emit("join room", roomIdInUrl);
    } else {
      const roomId = uid();
      dispatch(setRoomId(roomId));
    }
  }, []);

  /**
   * Canvas First setup
   * */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.current = canvas.getContext('2d');
    ctx.current!.imageSmoothingEnabled = true;
  }, []);

  /**
   * Setup line configuration
   * */
  useEffect(() => {
    if (!ctx.current) return;
    ctx.current.lineCap = 'round';
    ctx.current.strokeStyle = colors[canvasState.penColor];
    ctx.current.lineWidth = canvasState.lineWidth;
  }, [canvasState.penColor, canvasState.lineWidth]);

  /**
   * Setup event listener to handle window resize
   * */
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
      ctx.current.strokeStyle = colors[canvasState.penColor];
      ctx.current.lineWidth = canvasState.lineWidth;
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  /**
   * Manage draw history
   * */
  const history = useMemo(() => ({
    saveState: function (c: HTMLCanvasElement | null) {
      dispatch(setUndoList([...canvasState.undoList, c!.toDataURL()]));
      dispatch(setRedoList([]));
    },
    undo: function (canvas: HTMLCanvasElement | null, ctx: CanvasRenderingContext2D | null) {
      this.undoState(canvas!, ctx!);
      socket.emit('undo', [canvasState.roomId]);
    },
    redo: function (canvas: HTMLCanvasElement | null, ctx: CanvasRenderingContext2D | null) {
      this.restoreState(canvas!, ctx!);
      socket.emit('redo', [canvasState.roomId]);
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
  }), [canvasState.redoList, canvasState.roomId, canvasState.undoList, dispatch]);

  /**
   * On pointer down
   * */
  const onStartDrawing = ({nativeEvent}: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const {offsetX, offsetY} = nativeEvent;
    setIsDrawing(true);
    setMousePosition({x: offsetX, y: offsetY});
  }


  /**
   * On pointer move
   * */
  const onMove = ({nativeEvent}: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!isDrawing) return;
    const {offsetX, offsetY} = nativeEvent;
    const prevPosition = mousePosition;
    setMousePosition({x: offsetX, y: offsetY});
    history.saveState(canvasRef.current);

    socket.emit('draw', {
      fromX: prevPosition.x,
      fromY: prevPosition.y,
      toX: offsetX,
      toY: offsetY,
      penColor: canvasState.penColor,
      lineWidth: canvasState.lineWidth,
      roomId: canvasState.roomId,
    });
    draw(
      prevPosition.x,
      prevPosition.y,
      offsetX,
      offsetY,
      canvasState.penColor,
      canvasState.lineWidth
    );
  }

  /**
   * Draw a line over the canvas element
   */

  const draw = useCallback((fromX: number, fromY: number, toX: number, toY: number, penColor: number, lineWidth: number) => {
    ctx.current!.beginPath();
    ctx.current!.lineWidth = lineWidth;
    ctx.current!.strokeStyle = colors[penColor];
    ctx.current!.lineJoin = "round";
    ctx.current!.moveTo(fromX, fromY);
    ctx.current!.lineTo(toX, toY);
    ctx.current!.stroke();
  }, []);


  const onFinishDrawing = () => {
    setIsDrawing(false);
  }

  /**
   * Clean the Canvas the canvas element and emit the clean event to the server
   */
  const onCleanCanvas = () => {
    socket.emit('clean canvas', canvasState.roomId);
    cleanCanvas();
  }

  const cleanCanvas = useCallback(() => {
    ctx.current!.fillStyle = '#FFFFFF';
    ctx.current!.clearRect(0, 0, window.innerWidth, window.innerHeight);
    dispatch(setUndoList([]));
    dispatch(setRedoList([]));
  }, [dispatch]);

  /**
   * Download the draw
   * */
  const downloadSketch = useCallback(() => {
      const link = document.createElement('a');
      link.download = 'sketch.png';
      link.href = ctx.current!.canvas.toDataURL();
      link.click();
    }, []);


/** Socket listeners */
useEffect(() => {
  socket.on('connect', () => {
    console.log('Connected to server');
  });
  socket.on("drawing", ({fromX, fromY, toX, toY, penColor, lineWidth}) => {
    draw(fromX, fromY, toX, toY, penColor, lineWidth);
  });
  socket.on("cleaning canvas", () => {
    cleanCanvas();
  });
  socket.on("undoing", () => {
    history.undoState(canvasRef.current!, ctx.current!);
  });
  socket.on("redoing", () => {
    history.restoreState(canvasRef.current!, ctx.current!);
  });
}, [draw, cleanCanvas, history]);

return (
  <>
    {canvasState.createModalState && <CreateModal/>}
    <Header
      downloadSketch={downloadSketch}
      cleanCanvas={onCleanCanvas}
      undo={() => history.undo(canvasRef.current, ctx.current)}
      redo={() => history.redo(canvasRef.current, ctx.current)}
    />
    <canvas
      id="canvas"
      style={{touchAction: 'none'}}
      onPointerDown={onStartDrawing}
      onPointerMove={onMove}
      onPointerUp={onFinishDrawing}
      ref={canvasRef}
    />
    <Colorbar/>
  </>
);
}

export default App;
