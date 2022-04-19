import { db } from "./firebase";
import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";

const orderCollectionRef = collection(db, "orders");
class OrderDataService {
    addOrder = (newOrder) => {
        return addDoc(orderCollectionRef, newOrder);
    };

    updateBook = (id, updatedOrder) => {
        const orderDoc = doc(db, "orders", id);
        return updateDoc(orderDoc, updatedOrder);
    };

    deleteOrder = (id) => {
        const OrderDoc = doc(db, "orders", id);
        return deleteDoc(OrderDoc);
    };

    getAllOrders = () => {
        return getDocs(orderCollectionRef);
    };

    getOrder = (id) => {
        const orderDoc = doc(db, "orders", id);
        return getDoc(orderDoc);
    };
}

export default new OrderDataService();