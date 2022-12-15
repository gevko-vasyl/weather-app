import { useState, FC, ChangeEvent } from 'react';
import AddIcon from '@mui/icons-material/Add';
import {
  TextField,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import axios from 'axios';
import { useAppActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { WeatherData } from '../../types';
import Loader from '../Loader/Loader';

const AddCityDialog: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [city, setCity] = useState<WeatherData | null>(null);
  const { cities, error, loading } = useTypedSelector(state => state);
  const { addCity, setError } = useAppActions();

  const fetchCity = async (q: string) => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${process.env.REACT_APP_API_KEY}`,
      );

      const isCityExist = cities.some(el => el.name === response.data.name);
      if (isCityExist) {
        setError('This city is already exist. Please choose another.');
        return;
      }

      setCity(response.data);
    } catch (e) {
      setError('Invalid city name');
      console.log(e);
    }
  };

  const search = async (e: ChangeEvent<HTMLInputElement>) => {
    setCity(null);
    setError('');
    setQuery(e.target.value);
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(async () => {
        await fetchCity(e.target.value);
      }, 1000),
    );
  };

  const saveChanges = () => {
    if (city) {
      addCity(city);
    }
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    setCity(null);
    setError('');
    setQuery('');
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Typography component="div">
      <IconButton size="large" onClick={() => setOpen(true)}>
        <AddIcon sx={{ fontSize: 40, color: '#211a03c1' }} />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          To add city to list, type city name. And confirm your changes.
        </DialogTitle>
        <DialogContent sx={{ minHeight: '84px' }}>
          <TextField
            autoFocus
            autoComplete="off"
            margin="dense"
            id="name"
            label="Search city by name"
            type="text"
            fullWidth
            variant="standard"
            value={query}
            onChange={search}
            error={!!error}
            helperText={error}
          />
          {!error && city && (
            <DialogContentText>
              Add {city?.name}({city?.sys?.country}) to list?
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={!!error || query === ''} onClick={saveChanges}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Typography>
  );
};

export default AddCityDialog;
