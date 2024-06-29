import { useRecoilValue } from "recoil";

import { searchResultState } from "../../store/atoms";
export function ListCard() {
  const searchMeta = useRecoilValue(searchResultState);
  return (
    <div className=" max-w-2xl ">
      {searchMeta.map((content) => (
        <div key={content.id.videoId} className=" flex  p-3 text-start">
          <img
            className=" rounded-md"
            src={content.snippet.thumbnails.default.url}
            alt="e"
            height="120px"
            width="120px"
          />
          <div className=" px-2 flex flex-col">
            <span className=" text-md">{content.snippet.title}</span>
            <span className=" text-xs py-1 font-light">
              {content.snippet.publishedAt.toDateString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
