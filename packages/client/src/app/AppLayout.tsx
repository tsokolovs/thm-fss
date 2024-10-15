import { Outlet } from 'react-router';

// Author-comment: header and footer would go here
export default function AppLayout() {
  return (
    <main className="container">
      <Outlet/>
    </main>
  );

}