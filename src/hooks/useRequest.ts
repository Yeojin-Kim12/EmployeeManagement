import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

interface Request {
  id: string;
  type: string;
  startDate?: string;
  startTime?: string;
  endTime?: string;
  endDate?: string;
  additionalInfo: string;
  estimatedPay?: number;
  status: string;
}

interface UseRequestReturn {
  requests: Request[];
  handleUpdateStatus: (id: string, status: string) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
}

export function useRequest(): UseRequestReturn {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const querySnapshot = await getDocs(collection(db, "corrections"));
      const requestData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setRequests(requestData as Request[]);
    };

    fetchRequests();
  }, []);

  const handleUpdateStatus = async (id: string, status: string) => {
    const requestDoc = doc(db, "corrections", id);
    await updateDoc(requestDoc, { status });
    setRequests((prevRequests) =>
      prevRequests.map((req) => (req.id === id ? { ...req, status } : req))
    );
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "corrections", id));
    setRequests((prevRequests) => prevRequests.filter((req) => req.id !== id));
  };

  return { requests, handleUpdateStatus, handleDelete };
}
