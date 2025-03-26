import { IsNotEmpty, IsUUID, IsString, IsOptional } from 'class-validator';

export class CreateSessionDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsOptional()
  deviceInfo?: string;

  @IsString()
  @IsOptional()
  ipAddress?: string;
}