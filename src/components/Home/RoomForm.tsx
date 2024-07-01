export enum roomType {
  JOIN,
  CREATE,
}
interface RoomFormProps {
  Room: { Room: roomType };
}
export function RoomForm({ Room }: RoomFormProps) {
  const isJoin = Room.Room === roomType.JOIN;
  return (
    <div className="form-container">
      <h2 className="text-2xl font-bold mb-4">
        {isJoin ? "Join a Room " : "Create a Room"}
      </h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">
            {isJoin ? "Enter Room Key" : "Room Name"}
          </label>
          <input
            type="text"
            className="mt-1 p-2 block w-full border rounded-md"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
}
