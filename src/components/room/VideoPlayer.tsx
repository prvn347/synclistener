import YouTube, { YouTubeProps } from "react-youtube";
import { useRecoilState } from "recoil";
import { videoIdState, wsState } from "../../store/atoms";
import { useEffect, useRef, useState } from "react";

export function VideoPlayer() {
  const [socket, setSocket] = useRecoilState(wsState);
  const [videoId, setVideoId] = useRecoilState(videoIdState);
  const [play, setPlay] = useState(false);
  const playerRef = useRef<any>(null);
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3001");
    ws.onopen = () => {
      console.log("Connection established");
    };
    ws.onmessage = (message) => {
      console.log("Message received:", message.data);
      if (message.data === "play") {
        setPlay(true);
      } else if (message.data === "pause") {
        setPlay(false);
      } else {
        setVideoId(message.data);
      }
    };
    setSocket(ws);
    return () => ws.close();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.onmessage = (message) => {
        console.log("Message received:", message.data);

        if (message.data === "play") {
          setPlay(true);
        } else if (message.data === "pause") {
          setPlay(false);
        } else {
          setVideoId(message.data);
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

    socket?.send("play");
  };

  const onPlayerPause: YouTubeProps["onPause"] = (event) => {
    console.log("pause");
    socket?.send("pause");
  };
  useEffect(() => {
    if (playerRef.current) {
      if (play) {
        console.log("playing video");
        playerRef.current.playVideo();
      } else {
        console.log("pausing video");
        playerRef.current.pauseVideo();
      }
    }
  }, [play]);
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
      />
    </div>
  );
}
