import YouTube, { YouTubeProps } from "react-youtube";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  hostNameState,
  listenerState,
  messageState,
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
  const setAudienceName = useSetRecoilState(listenerState);
  const playerRef = useRef<any>(null);
  const userName = useRecoilValue(userState);
  const [messagee, setMessage] = useRecoilState(messageState);
  const [currentTime, setCurrentTime] = useState(0);
  const setHostName = useSetRecoilState(hostNameState);
  useEffect(() => {
    const ws = new WebSocket("wss://synclistener-backend.onrender.com");
    // const ws = new WebSocket("ws://localhost:3001");
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
        setHostName(data.host);
      } else if (data.type === "message") {
        setMessage((prevMessages) => [...prevMessages, data.params]);
        console.log(messagee);
      } else if (data.type === "transferHost") {
        setHostName(data.params.newHostName);
      }
    };
    setSocket(ws);
    return () => {
      ws.close();
      setMessage([]);
    };
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

          setHostName(data.host);
        } else if (data.type === "message") {
          setMessage((prevMessages) => [...prevMessages, data.params]);
        } else if (data.type === "transferHost") {
          console.log("transferred host is " + data.params.newHostName);
          setHostName(data.params.newHostName);
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

  const onPlayerPause: YouTubeProps["onPause"] = () => {
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
    height: window.innerWidth <= 768 ? "200" : "300", // Adjust as needed
    width: window.innerWidth <= 768 ? "330" : "550",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <div className="">
      <div className=" inline-block px-1 sm:px-3 py-1  mb-2 text-xs bg-blue-600 bg-opacity-15 text-white   rounded-2xl border border-blue-800">
        {" "}
        Tip: Play/pause after loading for better sync.
      </div>
      <YouTube
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
