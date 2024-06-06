// src/hooks/useWork.ts
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { uploadWorkRecord, fetchWorkRecords } from '../redux/slices/workSlice';
import { useState } from 'react';

export const useWork = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { workRecords, loading, error } = useSelector((state: RootState) => state.work);
  const [estimatedPay, setEstimatedPay] = useState(0);

  const calculatePay = (type: "연장근무" | "무급휴가" | "휴일근무", details: any) => {
    let pay = 0;
    if (type === "연장근무" || type === "휴일근무") {
      const start = new Date(`1970-01-01T${details.startTime}:00`);
      const end = new Date(`1970-01-01T${details.endTime}:00`);
      const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
      if (hours > 5 && type === "연장근무") {
        alert("연장근무는 5시간을 초과할 수 없습니다.");
        return;
      }
      if (hours > 2 && type === "휴일근무") {
        alert("휴일근무는 2일을 초과할 수 없습니다.");
        return;
      }
      pay = hours * 50000;
    }
    setEstimatedPay(pay);
  };

  const uploadWork = (workRecord: any) => {
    dispatch(uploadWorkRecord(workRecord));
  };

  const fetchWork = () => {
    dispatch(fetchWorkRecords());
  };

  return {
    workRecords,
    loading,
    error,
    uploadWork,
    fetchWork,
    estimatedPay,
    calculatePay,
  };
};
