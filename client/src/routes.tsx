import { createBrowserRouter, RouteObject } from "react-router-dom";
// Pages
import Chat from "./pages/Chat";
import Register from "./pages/Register";
import Login from "./pages/Login";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Chat />
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "*",
    element: (
              <section className="flex justify-center items-center h-screen">
                <div className="text-center">
                  <h2 className="text-bold text-4xl text-red-300">404</h2>
                  <p className="text-6xl font-semibold">Page not found Err  <span>: )</span></p>
                </div>
              </section>
              )
  }
];

const router = createBrowserRouter(routes)

export default router

