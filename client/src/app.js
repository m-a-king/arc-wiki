import './assets/app.css';
import Router from './router';
import AuthProvider from './authContext';

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}