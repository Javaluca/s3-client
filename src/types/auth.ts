import type { S3 } from "@aws-sdk/client-s3";

export interface User {
  host: string;
  accesskey: string;
  secretKey: string;
}

export interface AuthContextType {
  user: User | null;
  login: (host: string, accesskey: string, secretkey: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  s3Client: S3 | null;
}
