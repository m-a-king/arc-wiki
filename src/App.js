import './assets/App.css';
import Router from './Router';
import AuthProvider from './AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}