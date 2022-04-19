import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, sendEmailVerification, sendPasswordResetEmail, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, query, getDocs, collection, where, addDoc } from "firebase/firestore";




const firebaseConfig = {
    apiKey: "AIzaSyAfsCPS1WRak-OXxVYBwTqG7pfKAHi_C5o",
    authDomain: "my--clone-authentication.firebaseapp.com",
    projectId: "my--clone-authentication",
    storageBucket: "my--clone-authentication.appspot.com",
    messagingSenderId: "676216192657",
    appId: "1:676216192657:web:8f46115ebc2e7637f68930",
    measurementId: "G-TVTB7FQWRN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async() => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logIn = async(email, password) => {
    try {
        signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}

const registerWithEmail = async(name, email, password, mobileNumber, address, age) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password, mobileNumber, address, age);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
            mobileNumber,
            address,
            age,
        })
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const sendPasswordReset = async(email) => {
    const config = {
        url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
        handleCodeInApp: true,
    };
    try {
        await sendPasswordResetEmail(auth, email, config);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const emailVerification = async() => {
    try {
        sendEmailVerification(auth.currentUser)
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
};


export {
    auth,
    db,
    signInWithGoogle,
    logIn,
    registerWithEmail,
    sendPasswordReset,
    logout,
    emailVerification
};