export type LoginPayload = {
  username: string;
  password: string;
};

export type RecouverPasswordUser = {
  employeeId: number;
  userId: number;
  username: string;
  recoveryToken?: string;
};
