import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from './firebase';
import Header from './Header';
import { collection, query, getDocs, } from "firebase/firestore";
import Order from "./Order.js";

function Orders() {
  const [user] = useAuthState(auth);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if(user) {
      const userData = async () => {
        const q = query(collection(db, "users", user.uid, "orders"));
        const querySnapshot = await getDocs(q);
         setOrders(querySnapshot.docs.map((doc) => ({
          ...doc.data(),
        })));
      };
      userData();  
    } else {
        setOrders([])
    }
  }, [user])
  return (
    <div>
      <Header/>
      {user? (
        <div>
          <div className='orders'>
            <h1>Your Orders</h1>
            <div className='orders__order'>
                {orders?.map(order => (
                    <Order order={order} />
                ))}
            </div>
          </div>
        </div>
      ): (
        <h2>Please Sign in first to see your orders</h2>
      )}
    </div>
  );
};

export default Orders;
