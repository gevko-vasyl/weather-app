import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppDispatch } from '../store';
import { appActions } from '../store/slice/appSlice';

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(appActions, dispatch);
};
