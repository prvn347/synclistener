import { RoomForm, roomType } from "./RoomForm";

export function JoinRoom() {
  return (
    <div>
      <RoomForm
        Room={{
          Room: roomType.JOIN,
        }}
      />
    </div>
  );
}
