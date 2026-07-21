/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ScheduleProvider } from './context/ScheduleContext';
import Landing from './pages/Landing';
import Agenda from './pages/Agenda';
import Admin from './pages/Admin';

export default function App() {
  return (
    <ScheduleProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/administrador" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </ScheduleProvider>
  );
}
