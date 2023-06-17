import './assets/app.css';
import Router from './router';
import AuthProvider from './stores/authContext';

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}