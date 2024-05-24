import { IsNumber, IsString, MinLength } from "class-validator";

export class CreateNewsDto {
    @IsString()
    @MinLength(3)
    title: string;
    @IsString()
    image: string;
    @IsString()
    @MinLength(20)
    description: string;
    @IsNumber()
    idUser: number;
}
