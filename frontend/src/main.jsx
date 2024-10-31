import React from 'react'
import ReactDOM from 'react-dom/client'
import '../src/assets/css/main.css'

import { RootCmp } from './RootCmp'

const elContainer = document.getElementById('root')
const root = ReactDOM.createRoot(elContainer);
root.render(<RootCmp />);
