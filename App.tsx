import React from 'react';
import RootLayout from './layout';
import Home from './page';

const App: React.FC = () => {
  return (
    <RootLayout>
      <Home />
    </RootLayout>
  );
};

export default App;