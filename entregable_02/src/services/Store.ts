export interface iContainerElement{
    _id?: string
}

export interface iContenedor <T extends iContainerElement>{
    save(object:any):Promise<T>
    getByID(id:string):Promise<T>
    getAll():Promise<T[]>
    count():Promise<number>
    deleteById(id:string):Promise<T>
    deleteAll():Promise<void>
    update(object: T):Promise<T>
}

export interface iContainerConstructor<T extends iContainerElement>{
    new (name:string, schema:object):iContenedor<T>
  }