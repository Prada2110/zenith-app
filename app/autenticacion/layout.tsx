import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"






export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) { 
  return (
    <>

      {children}
      <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            theme="colored"
          />
    </>
  );
}