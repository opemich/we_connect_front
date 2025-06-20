// "use client";

// import ProtectedRoute from "../components/ProtectedRoute";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Menu from "../components/Menu";
// import MenuInfo from "../components/MenuInfo";
// import Header from "../components/Header";

// // This page is protected and will only be accessible if the user is authenticated.
// // If the user is not authenticated, they will be redirected to the login page.
// export default function DashboardPage() {
//     const router = useRouter();
// // This page is protected and will only be accessible if the user is authenticated.

// // If the user is not authenticated, they will be redirected to the login page.
//     useEffect(() => {
//   const checkToken = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       router.push("/");
//       return;
//     } // Verify token with the backend

//     const res = await fetch("http://localhost:5000/verify-token", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ token }),
//     }); // Assuming your backend has an endpoint to verify the token

//     const result = await res.json();

//     if (!result.valid) {
//       localStorage.removeItem("token");
//       router.push("/");
//     } // If the token is valid, you can set user state or perform other actions
//   };

//   checkToken(); // Call the function to check the token validity
// }, []); // useEffect to run on component mount
//   // This effect runs once when the component mounts to check if the user is authenticated.

//   return (
//     <ProtectedRoute>
//       <div className="bg-gray-600 min-h-screen p-8">
//         <Header />
//         {/* <div className="text-[70px] flex justify-center items-center font-bold mt-10">Welcome to your dashboard</div> */}
//         <div className="flex mt-10 mb-10">
//           <Menu />
//           <MenuInfo />
//         </div>
//       </div>
//     </ProtectedRoute> // This component wraps the dashboard content in a ProtectedRoute component
//   );
// }
// // This page is protected and will only be accessible if the user is authenticated.
// // If the user is not authenticated, they will be redirected to the login page.

// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import ProtectedRoute from "../components/ProtectedRoute";
// import Menu from "../components/Menu";
// import MenuInfo from "../components/MenuInfo";
// import Header from "../components/Header";
// import { MenuItem } from "../types/Menu";

// export default function Dashboard() {
//   const router = useRouter();
//   // const handleMenuSelect = (label: MenuItem) => setSelectedMenu(label);
//   const [selectedMenu, setSelectedMenu] = useState<MenuItem>("overview");

//   useEffect(() => {
//     const checkToken = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         router.push("/");
//         return;
//       }

//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/verify-token`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ token }),
//         }
//       );

//       const result = await res.json();
//       if (!result.valid) {
//         localStorage.removeItem("token");
//         router.push("/");
//       }
//     };

//     checkToken();
//   }, [router]);

//   return (
//     <ProtectedRoute>
//       <div className="bg-gray-600 max-h-screen p-8 overflow-hidden">
//         <Header />
//         <div className="flex mt-10 mb-10">
//           <Menu
//             selectedMenu={selectedMenu}
//             onMenuSelect={(label: MenuItem) => setSelectedMenu(label)}
//           />
//           <MenuInfo selectedMenu={selectedMenu} />
//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../components/ProtectedRoute";
import Menu from "../components/Menu";
import MenuInfo from "../components/MenuInfo";
import Header from "../components/Header";
import { MenuItem } from "../types/Menu";

export default function Dashboard() {
  const router = useRouter();
  const [selectedMenu, setSelectedMenu] = useState<MenuItem>("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMenuSelect = (label: MenuItem) => {
    setSelectedMenu(label);
    // Auto-close mobile menu when a menu item is selected
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/");
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/verify-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        }
      );

      const result = await res.json();
      if (!result.valid) {
        localStorage.removeItem("token");
        router.push("/");
      }
    };

    checkToken();
  }, [router]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <ProtectedRoute>
      <div className="bg-gray-600 min-h-screen">
        {/* Header with mobile menu button */}
        <div className="p-4 md:p-8 pb-0">
          <Header 
            isMobileMenuOpen={isMobileMenuOpen}
            toggleMobileMenu={toggleMobileMenu}
          />
        </div>

        {/* Main content area */}
        <div className="flex mt-6 md:mt-0 mb-10 md:max-h-[100vh] md:overflow-hidden md:px-6">
          {/* Desktop sidebar - hidden on mobile */}
          <div className="hidden md:block">
            <Menu
              selectedMenu={selectedMenu}
              onMenuSelect={handleMenuSelect}
              isMobileMenuOpen={isMobileMenuOpen}
              toggleMobileMenu={toggleMobileMenu}
            />
          </div>

          {/* Main content - full width on mobile, with sidebar space on desktop */}
          <div className="flex-1 px-4 md:px-0 overflow-y-auto">
            <MenuInfo selectedMenu={selectedMenu} />
          </div>
        </div>

        {/* Mobile menu overlay - only renders on mobile */}
        <div className="md:hidden">
          <Menu
            selectedMenu={selectedMenu}
            onMenuSelect={handleMenuSelect}
            isMobileMenuOpen={isMobileMenuOpen}
            toggleMobileMenu={toggleMobileMenu}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}