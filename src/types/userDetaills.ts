type Room = {
  id: number;
  title: string;
  ownerId: number;
  roomKey: string;
  maxUsers: number;
  isValidKey: boolean;
  createdAt: string;
};

type User = {
  name: string;
  ownedRooms: Room[];
};
