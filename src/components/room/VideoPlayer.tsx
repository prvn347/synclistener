import YouTube, { YouTubeProps } from "react-youtube";
import { useRecoilState } from "recoil";
import { videoIdState, wsState } from "../../store/atoms";
import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
declare global {
  interface Window {
    YT: any;
  }
}

export function VideoPlayer() {
  const [socket, setSocket] = useRecoilState(wsState);
  const [videoId, setVideoId] = useRecoilState(videoIdState);
  const [play, setPlay] = useState(false);
  const playerRef = useRef<any>(null);
  const [currentTime, setCurrentTime] = useState(0);
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3001");
    ws.onopen = () => {
      console.log("Connection established");
    };
    ws.onmessage = (message) => {
      console.log("Message received:", message.data);
      const data = JSON.parse(message.data);

      if (data.type === "play") {
        setPlay(true);
      } else if (data.type === "pause") {
        setPlay(false);
      } else if (data.type === "seek") {
        setCurrentTime(data.time);
      } else if (data.type === "videoId") {
        setVideoId(data.videoId);
      }
    };
    setSocket(ws);
    return () => ws.close();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.onmessage = (message) => {
        console.log("Message received:", message.data);

        const data = JSON.parse(message.data);

        if (data.type === "play") {
          setPlay(true);
        } else if (data.type === "pause") {
          setPlay(false);
        } else if (data.type === "seek") {
          setCurrentTime(data.time);
        } else if (data.type === "videoId") {
          setVideoId(data.videoId);
        }
      };
    }
  }, [videoId]);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    playerRef.current = event.target;
    event.target.pauseVideo();
  };

  const onPlayerPlay: YouTubeProps["onPlay"] = (event) => {
    console.log("play");
    if (playerRef.current) {
      const time = playerRef.current.getCurrentTime();
      socket?.send(JSON.stringify({ type: "play", time }));
    }
  };

  const onPlayerPause: YouTubeProps["onPause"] = (event) => {
    console.log("pause");
    if (playerRef.current) {
      const time = playerRef.current.getCurrentTime();
      socket?.send(JSON.stringify({ type: "pause", time }));
    }
  };
  const onPlayerStateChange: YouTubeProps["onStateChange"] = debounce(
    (event) => {
      if (
        event.data === window.YT.PlayerState.PAUSED ||
        event.data === window.YT.PlayerState.PLAYING
      ) {
        const time = playerRef.current.getCurrentTime();
        socket?.send(JSON.stringify({ type: "seek", time }));
      }
    },
    1000
  );
  useEffect(() => {
    if (playerRef.current) {
      if (play) {
        console.log("playing video");
        playerRef.current.playVideo();
        playerRef.current.seekTo(currentTime, true);
      } else {
        console.log("pausing video");
        playerRef.current.pauseVideo();
        playerRef.current.seekTo(currentTime, true);
      }
    }
  }, [play, currentTime]);
  const opts: YouTubeProps["opts"] = {
    height: "300",
    width: "550",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <div>
      <YouTube
        // className="rounded-md"
        videoId={videoId}
        opts={opts}
        onReady={onPlayerReady}
        onPause={onPlayerPause}
        onPlay={onPlayerPlay}
        onStateChange={onPlayerStateChange}
      />
    </div>
  );
}
