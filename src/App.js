import { CssBaseline } from '@mui/material';
import { useRoutes } from "react-router-dom";

import routes from './routes';

const App = () => {
  const content = useRoutes(routes);

  return (
    <div className="App">
      <CssBaseline />
      {content}
    </div>
  );
}

export default App;
