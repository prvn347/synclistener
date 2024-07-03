interface Owner {
  id: number;
  username: string;
  email: string;
  password: string;
  name: string;
  createdAt: string;
}

interface Result {
  title: string;
  owner: Owner;
  users: any[]; // You can replace `any` with a more specific type if you know the structure of users
  maxUsers: number;
}

interface ApiResponse {
  result: Result;
}
