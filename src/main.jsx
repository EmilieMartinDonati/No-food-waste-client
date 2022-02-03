import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from "react-router-dom"
import './index.css'
import App from './App';
import { AuthWrapper } from "../src/context/auth.context";

ReactDOM.render(
  <React.StrictMode>
  <Router>
  <AuthWrapper>
    <App />
    </AuthWrapper>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
