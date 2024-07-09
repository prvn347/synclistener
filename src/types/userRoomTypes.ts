export type RoomDetailType = {
  id: number;
  title: string;
  ownerId: number;
  roomKey: string;
  maxUsers: number;
  isValidKey: boolean;
  createdAt: Date;
};
