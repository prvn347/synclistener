import YouTube, { YouTubeProps } from "react-youtube";
import { useRecoilState } from "recoil";
import { videoIdState, wsState } from "../../store/atoms";
import { useEffect } from "react";

export function VideoPlayer() {
  const [socket, setSocket] = useRecoilState(wsState);
  const [videoId, setVideoId] = useRecoilState(videoIdState);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3001");
    ws.onopen = () => {
      console.log("Connection established");
    };
    ws.onmessage = (message) => {
      console.log("Message received:", message.data);
      setVideoId(message.data);
    };
    setSocket(ws);
    return () => ws.close();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.onmessage = (message) => {
        console.log("Message received:", message.data);
        setVideoId(message.data);
      };
    }
  }, [videoId]);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // Access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

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
      {videoId}
      <YouTube
        className="rounded-md"
        videoId={videoId}
        opts={opts}
        onReady={onPlayerReady}
      />
    </div>
  );
}
