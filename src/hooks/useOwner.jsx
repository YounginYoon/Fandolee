import { doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { db, storage } from "../config/firebase";

const useOwner = (uid) => {
  const [owner, setOwner] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const getOwner = async () => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    try {
      if (docSnap.exists()) {
        setOwner(docSnap.data());
      }
    } catch (err) {
      console.log("useOwner error: ", err);
    }
  };
  const getImage = async () => {
    try {
      const imageRef = ref(storage, `profile_image/${uid}`);
      await getDownloadURL(imageRef).then((url) => {
        setProfileImage(url);
      });
    } catch (err) {
      console.log("useOwner profileImage err: ", err);
    }
  };

  useEffect(() => {
    getOwner();
    getImage();
  }, [uid]);

  return [owner, profileImage];
};

export default useOwner;
