import { useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import { store, RootState } from './store';
import { MobileFrame } from './components/MobileFrame';
import { LoginScreen } from './screens/LoginScreen';
import { HomeScreen } from './screens/HomeScreen';
import { DetailScreen } from './screens/DetailScreen';

function AppContent() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  if (selectedProductId !== null) {
    return (
      <DetailScreen 
        productId={selectedProductId} 
        onBack={() => setSelectedProductId(null)} 
      />
    );
  }

  return <HomeScreen onSelectProduct={(id) => setSelectedProductId(id)} />;
}

export default function App() {
  return (
    <Provider store={store}>
      <MobileFrame>
        <AppContent />
      </MobileFrame>
    </Provider>
  );
}
