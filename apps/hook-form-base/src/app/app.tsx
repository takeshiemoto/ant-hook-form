import React from 'react';
import styled from 'styled-components';
import { Route, Link } from 'react-router-dom';
import ControllerBase from './ControllerBase';

const StyledApp = styled.div`
  padding: 20px;
`;

/**
 * - hook-formのControllerでAntdの挙動が再現できるか
 */

export const App = () => {
  return (
    <StyledApp>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div>
      <Route path="/" exact render={() => <ControllerBase />} />
      <Route
        path="/page-2"
        exact
        render={() => (
          <div>
            <Link to="/">Click here to go back to root page.</Link>
          </div>
        )}
      />
    </StyledApp>
  );
};

export default App;
