import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { uploadWorkRecord, fetchWorkRecords, uploadSchedule, fetchSchedules } from '../redux/slices/workSlice';

export const useWork = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { workRecords, loading, error } = useSelector((state: RootState) => state.work);

  const uploadWork = (workRecord: any) => {
    dispatch(uploadWorkRecord(workRecord));
  };

  const fetchWork = () => {
    dispatch(fetchWorkRecords());
  };

  const uploadScheduleData = (schedule: any) => {
    dispatch(uploadSchedule(schedule));
  };

  const fetchScheduleData = () => {
    dispatch(fetchSchedules());
  };

  return {
    workRecords,
    loading,
    error,
    uploadWork,
    fetchWork,
    uploadScheduleData,
    fetchScheduleData,
  };
};
