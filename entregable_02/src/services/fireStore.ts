import { iContainerElement, iContenedor } from './Store'
import { initializeApp } from "firebase/app";
import { updateDoc, getFirestore, getDocs, collection, doc, getDoc, addDoc, CollectionReference, deleteDoc } from 'firebase/firestore'
import {firebaseConfig} from '../config'

export default class Contenedor<T extends iContainerElement> implements iContenedor<T> {
    private collection: CollectionReference
    private app = initializeApp(firebaseConfig);
    
    constructor(collectionName: string) {
        const DB = getFirestore(this.app)
        this.collection = collection(DB, collectionName)
    }

    async save(object: any): Promise<T> {
        
        const docRef = await addDoc(this.collection, object);
        console.debug(`fireStore.save: New Doc Created ${JSON.stringify(docRef.id)}`)
        return { _id: docRef.id } as T
    }

    async getByID(id: string): Promise<T> {
        const docRef = doc(this.collection, id);
        const returnDoc = await getDoc(docRef)
        return { _id: returnDoc.id, ...returnDoc.data() } as T
    }

    async getAll(): Promise<T[]> {
        const snapshot = await getDocs(this.collection)
        const docData = snapshot.docs.map(doc => {
            return { ...doc.data(), id_: doc.id }
        })
        return docData as unknown as T[]
    }

    count(): Promise<number> {
        throw new Error('Method not implemented.');
    }
    
    async deleteById(id: string): Promise<T> {
        const returnDoc = await this.getByID(id)
        const docRef = doc(this.collection, id);
        await deleteDoc(docRef)
        return returnDoc
    }

    deleteAll(): Promise<void> {
        throw new Error('Method not implemented.');
    }

    async update(object: T): Promise<T> {
        const docRef = doc(this.collection, object._id);
        const newDoc = {...object}
        delete newDoc["_id"]
        const update = await updateDoc(docRef,{...newDoc} as object)
        return this.getByID(object._id as string)
    }

}

