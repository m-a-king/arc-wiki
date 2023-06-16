import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export default function Logo() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <Button onClick={handleClick}>
      <img
        src={`/img/arcteryx_logo_w.png`}
        alt="logo"
        loading="lazy"
        style={{ width: '80px' }}
      />
    </Button>
  );
}