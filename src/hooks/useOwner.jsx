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
        const data = docSnap.data();
        const uid = docSnap.id;
        // console.log({ ...data, uid });
        setOwner({ ...data, uid });
      }
    } catch (err) {
      console.log("useOwner error: ", err);
    }
  };
  const getImage = async () => {
    let url = "";
    try {
      const imageRef = ref(storage, `profile_image/${uid}`);
      url = await getDownloadURL(imageRef);
      setProfileImage(url);
    } catch (err) {
      console.log("useOwner profileImage err: ", err);
      console.log("url: ", url);
    }
  };

  useEffect(() => {
    getOwner();
    getImage();
  }, [uid]);

  return [owner, profileImage];
};

export default useOwner;
