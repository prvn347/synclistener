import { useRecoilValue, useSetRecoilState } from "recoil";
import { formatDistanceToNow } from "date-fns";
import { searchResultState, videoIdState, wsState } from "../../store/atoms";
export function ListCard() {
  const searchMeta = useRecoilValue(searchResultState);
  const setVideoId = useSetRecoilState(videoIdState);
  const wss = useRecoilValue(wsState);
  // console.log(" checking websocket connection" + wss);
  return (
    <div className=" max-w-xl max-h-96 scroll-smooth  overflow-y-scroll ">
      {searchMeta.map((content) => {
        const publishedAtDate = new Date(content.snippet.publishedAt);
        const timeAgo = formatDistanceToNow(publishedAtDate, {
          addSuffix: true,
        });
        return (
          <div
            key={content.id.videoId}
            onClick={() => {
              const videoId = content.id.videoId || "2g811Eo7K8U";
              setVideoId(videoId);
              console.log("sending videi id" + videoId);
              wss?.send(JSON.stringify({ type: "videoId", videoId }));
            }}
            className=" flex  p-3 text-start cursor-pointer hover:bg-slate-900"
          >
            <img
              className=" rounded-md contain-content"
              src={content.snippet.thumbnails.default.url}
              alt={content.snippet.title}
              height={content.snippet.thumbnails.default.height}
              width={content.snippet.thumbnails.default.width}
            />
            <div className=" ps-2 flex flex-col">
              <span className=" text-md">{content.snippet.title}</span>
              <span className=" text-xs py-1 font-light">{timeAgo}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
