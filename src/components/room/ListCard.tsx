import { useRecoilValue, useSetRecoilState } from "recoil";
import { formatDistanceToNow } from "date-fns";
import { searchResultState, videoIdState, wsState } from "../../store/atoms";
export function ListCard() {
  const searchMeta = useRecoilValue(searchResultState);
  const setVideoId = useSetRecoilState(videoIdState);
  const wss = useRecoilValue(wsState);

  return (
    <div className=" max-w-2xl ">
      {searchMeta.map((content) => {
        const publishedAtDate = new Date(content.snippet.publishedAt);
        const timeAgo = formatDistanceToNow(publishedAtDate, {
          addSuffix: true,
        });
        return (
          <div
            key={content.id.videoId}
            onClick={() => {
              setVideoId(content.id.videoId || "2g811Eo7K8U");
              wss?.send(content.id.videoId || "2g811Eo7K8U");
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
            <div className=" px-2 flex flex-col">
              <span className=" text-md">{content.snippet.title}</span>
              <span className=" text-xs py-1 font-light">{timeAgo}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
