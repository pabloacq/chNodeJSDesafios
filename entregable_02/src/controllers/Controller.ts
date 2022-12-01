export abstract class Controller<T>{
   abstract getByID(id:string):Promise<T>
}