export interface IProduct{
    productId: number;
    productName: string;
    productDescription: string;
    price: number;
    image: string;
    inventory :number;
}
export enum Category{
    General= "general",
    Etico ="Etico",
    Niño= "Niño",
    Adulto = "Adulto",
    Genéricos= "Genérico",
}
export interface rating{
    rate: number;
    count: number;
}