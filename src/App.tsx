import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CreateTripPage } from "./pages/create-trip";
import { TripPage } from "./pages/trip-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateTripPage />
  },
  {
    path: "/trips/:tripId",
    element: <TripPage />
  },
])

export function App() {

  return (
    <RouterProvider router={router} />
  )
}
