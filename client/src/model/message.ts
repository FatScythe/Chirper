export interface IMessage {
  id: number;
  text: string;
  sender: number;
  createdAt?: string | null;
  updatedAt?: string | null;
}
