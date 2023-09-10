export interface UserInfo {
    id: string,
    lastSignInTime: string,
    email: string,
    fullName: string,
    bio: string,
}


export interface Order {
    vendorID: number;
    number: number;
    time: string;
    total: string;
    description: string;
  }