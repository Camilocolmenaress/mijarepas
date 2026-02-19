import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { router } from './router'

export default function App() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          className: 'mijarepas-toast',
          style: { maxWidth: '320px' },
        }}
      />
      <RouterProvider router={router} />
    </>
  )
}
