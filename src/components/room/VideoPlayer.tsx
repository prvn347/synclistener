import YouTube, { YouTubeProps } from "react-youtube";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  listenerState,
  userState,
  videoIdState,
  wsState,
} from "../../store/atoms";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

declare global {
  interface Window {
    YT: any;
  }
}

export function VideoPlayer() {
  const room = useParams();

  const [socket, setSocket] = useRecoilState(wsState);
  const [videoId, setVideoId] = useRecoilState(videoIdState);
  const [play, setPlay] = useState(false);
  const [audienceName, setAudienceName] = useRecoilState(listenerState);
  const playerRef = useRef<any>(null);
  const userName = useRecoilValue(userState);
  const [currentTime, setCurrentTime] = useState(0);
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3001");
    ws.onopen = () => {
      console.log("Connection established");
      ws.send(
        JSON.stringify({
          type: "join",
          params: { code: room.id, name: userName?.name },
        })
      );
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
      } else if (data.type === "userList") {
        setAudienceName(data.users.map((name: any) => ({ name })));
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
        } else if (data.type === "userList") {
          setAudienceName(data.users.map((name: any) => ({ name })));
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
      event.target.playVideo();
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
  const onPlayerStateChange: YouTubeProps["onStateChange"] = (event) => {
    if (
      event.data === window.YT.PlayerState.PAUSED ||
      event.data === window.YT.PlayerState.PLAYING
    ) {
      const time = playerRef.current.getCurrentTime();
      socket?.send(JSON.stringify({ type: "seek", time }));
    }
  };
  0;

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
      <div className=" inline-block px-3 py-1  mb-2 text-xs bg-blue-600 bg-opacity-15 text-white   rounded-2xl border border-blue-800">
        {" "}
        Tip:After loading the video play/pause for better synchronization.
      </div>
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
