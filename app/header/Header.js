// "use client";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { Menu, X, User, LogOut } from "lucide-react";
// import { usePathname, useRouter } from "next/navigation";
// import { useSelector, useDispatch } from "react-redux";
// import { logoutUser } from "../store/authSlice";
// import { StaggeredContainer, AnimatedWrapper } from "../animation/animation";
// import LinkButton, { NavLinkButton } from "../button/Button";

// const navLinks = [
//   { label: "About", href: "/about" },
//   { label: "Community", href: "/community" },
//   { label: "Companies", href: "/companies" },
//   { label: "Jobs", href: "/jobs" },
// ];

// const Header = () => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const pathname = usePathname();
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Prevent body scroll when mobile menu is open
//   useEffect(() => {
//     if (mobileMenuOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [mobileMenuOpen]);

//   // Close mobile menu on window resize
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 768 && mobileMenuOpen) {
//         setMobileMenuOpen(false);
//       }
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [mobileMenuOpen]);

//   // Check for token on mount to sync with Redux state
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token && !user) {
//       // Optionally dispatch a loadUser thunk here (if implemented)
//       // For now, rely on page-level redirects
//     }
//   }, [user]);

//   // Handle logout
//   const handleLogout = () => {
//     dispatch(logoutUser());
//     router.push("/signin");
//     setMobileMenuOpen(false);
//   };

//   // Prevent navigation to signin/signup if logged in
//   const handleNavClick = (href, e) => {
//     if (user || localStorage.getItem("token")) {
//       if (href === "/signin" || href === "/signup") {
//         e.preventDefault();
//         router.push("/jobfeed");
//         return false;
//       }
//     }
//     return true;
//   };

//   return (
//     <header
//       className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out px-3  sm:px-4 lg:px-6 xl:px-8 ${
//         scrolled
//           ? "py-1 sm:py-1.5 bg-[#020718] backdrop-blur-lg shadow-sm border-b border-gray-200/50"
//           : " sm:py-2 bg-[#020718] border-b-2 border-gray-200"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
//         <div className="flex items-center space-x-2 flex-shrink-0">
//           <Link href="/" className="cursor-pointer">
//             <Image
//               src="/spreads.svg"
//               alt="Logo"
//               width={scrolled ? 24 : 32}
//               height={scrolled ? 24 : 32}
//               className={`transition-all duration-300 ${
//                 scrolled
//                   ? "w-8 h-8 sm:w-8 sm:h-8"
//                   : "w-9 h-9  lg:w-10 lg:h-10"
//               }`}
//             />
//           </Link>
//         </div>

//         <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
//           {navLinks.map(({ label, href }, index) => (
//             <Link
//               key={index}
//               href={href}
//               className="group relative transition-all duration-300 transform hover:-translate-y-0.5"
//               onClick={(e) => handleNavClick(href, e)}
//             >
//               <span
//                 className={`relative cursor-pointer font-[Jost] font-medium text-sm lg:text-base transition-all duration-300 whitespace-nowrap ${
//                   pathname === href
//                     ? "text-[#edebff] font-semibold"
//                     : "text-white hover:text-[#e1d7d7]"
//                 }`}
//               >
//                 {label}
//                 {pathname === href && (
//                   <span className="absolute left-0 -bottom-2 w-full h-0.5 bg-gradient-to-r from-[#1200B1] to-blue-600 rounded-full animate-pulse"></span>
//                 )}
//                 <span className="absolute left-0 -bottom-2 w-0 h-0.5 bg-gradient-to-r from-[#1200B1] to-blue-600 rounded-full transition-all duration-300 group-hover:w-full"></span>
//                 <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-blue-100/30 to-transparent blur-sm -z-10"></span>
//               </span>
//             </Link>
//           ))}
//         </nav>

//         <div className="hidden md:flex items-center space-x-2 lg:space-x-3 xl:space-x-4 flex-shrink-0">
//           {user ? (
//             <>
              
//               <NavLinkButton href="/profile" text="Profile" icon={User} />

//               <button
//                 onClick={handleLogout}
//                 className="group relative text-gray-700 font-medium px-3 lg:px-4 py-1.5 lg:py-2 rounded-full transition-all duration-300 hover:shadow-sm text-sm lg:text-base"
//               >
//                 <span className="relative z-10 flex items-center space-x-1">
//                   <LogOut size={16} />
//                   <span>Logout</span>
//                 </span>
//                 <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#1200B1] transition-all duration-300 group-hover:w-full rounded-full"></span>
//               </button>
//             </>
//           ) : (
//             <>
              
//               <NavLinkButton href="/signin" text="Login" onClick={(e) => handleNavClick("/signin", e)} />
//               <LinkButton   href="/signup" name="Sign Up" linkclassname="!py-1.5" showIcon={false} onClick={(e) => handleNavClick("/signup", e)} />
              
//             </>
//           )}
//         </div>

//         <button
//           className={`md:hidden p-2 rounded-lg transition-all duration-300 flex-shrink-0 ${
//             mobileMenuOpen
//               ? "bg-[#1200B1] text-white"
//               : "text-gray-700 hover:bg-gray-100"
//           }`}
//           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           aria-label="Toggle mobile menu"
//         >
//           <div className="relative w-5 h-5 sm:w-6 sm:h-6">
//             <Menu
//               size={20}
//               className={`absolute sm:w-6 sm:h-6 transition-all duration-300 ${
//                 mobileMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
//               }`}
//             />
//             <X
//               size={20}
//               className={`absolute sm:w-6 sm:h-6 transition-all duration-300 ${
//                 mobileMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
//               }`}
//             />
//           </div>
//         </button>
//       </div>

//       <div
//         className={`md:hidden fixed left-0 top-0 w-full h-screen bg-white z-40 transition-all duration-500 ease-out ${
//           mobileMenuOpen
//             ? "opacity-100 translate-x-0"
//             : "opacity-0 translate-x-full pointer-events-none"
//         }`}
//       >
//         <div className="flex justify-between items-center p-4 sm:p-5 border-b border-gray-200">
//           <Link href="/" onClick={() => setMobileMenuOpen(false)}>
//             <Image
//               src="/Finalloo.svg"
//               alt="Logo"
//               width={40}
//               height={40}
//               className="w-10 h-10 sm:w-11 sm:h-11"
//             />
//           </Link>
//           <button
//             className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
//             onClick={() => setMobileMenuOpen(false)}
//             aria-label="Close mobile menu"
//           >
//             <X size={24} className="w-5 h-5 sm:w-6 sm:h-6" />
//           </button>
//         </div>

//         <div className="p-4 sm:p-5  sm:pt-4 overflow-y-auto h-full pb-20">
//           <StaggeredContainer className="flex flex-col space-y-1 sm:space-y-3">
//             {navLinks.map(({ label, href }, index) => (
//               <AnimatedWrapper
//                 key={index}
//                 className="transform transition-all duration-300"
//                 delay={index * 0.1}
//                 direction="right"
//               >
//                 <Link
//                   href={href}
//                   className="group relative block py-1.5 sm:py-2 px-4 my-0 sm:px-6 rounded-lg transition-all duration-300 hover:bg-blue-100"
//                   onClick={(e) => {
//                     handleNavClick(href, e);
//                     setMobileMenuOpen(false);
//                   }}
//                 >
//                   <span
//                     className={`text-lg sm:text-xl font-medium transition-colors duration-300 ${
//                       pathname === href
//                         ? "text-[#1200B1] font-semibold"
//                         : "text-gray-700 group-hover:text-[#1200B1]"
//                     }`}
//                   >
//                     {label}
//                   </span>
//                   {pathname === href && (
//                     <div className="absolute left-4 sm:left-6 bottom-2 sm:bottom-3 w-8 h-0.5 bg-[#1200B1] rounded-full"></div>
//                   )}
//                 </Link>
//               </AnimatedWrapper>
//             ))}

//             <div className="flex flex-col space-y-3 sm:space-y-4 pt-6 sm:pt-8 border-t border-gray-200">
//               {user ? (
//                 <>
//                   <AnimatedWrapper delay={0.6}>
//                     <Link
//                       href="/profile"
//                       className="group text-center py-3 sm:py-4 px-6 rounded-lg border-2 border-[#1200B1] text-[#1200B1] font-medium transition-all duration-300 hover:bg-[#1200B1] hover:text-white active:scale-95 text-base sm:text-lg"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                       Profile
//                     </Link>
//                   </AnimatedWrapper>
//                   <AnimatedWrapper delay={0.7}>
//                     <button
//                       onClick={handleLogout}
//                       className="group text-center py-3 sm:py-4 px-6 rounded-lg border-2 border-[#1200B1] text-[#1200B1] font-medium transition-all duration-300 hover:bg-[#1200B1] hover:text-white active:scale-95 text-base sm:text-lg"
//                     >
//                       Logout
//                     </button>
//                   </AnimatedWrapper>
//                 </>
//               ) : (
//                 <>
                      
//                   <AnimatedWrapper delay={0.6} className="flex flex-col items-start  ">
//                  <NavLinkButton href="/signin" linkclassname=" !text-lg !ms-3 !my-0 !py-1" text="Login" onClick={(e) => handleNavClick("/signin", e)} />
//                 </AnimatedWrapper>

//                   <AnimatedWrapper delay={0.7}>
//                       <LinkButton   href="/signup" name="Sign Up"  linkclassname="!py-1  " showIcon={false} onClick={(e) => handleNavClick("/signup", e)} /> 

//                   </AnimatedWrapper>
//                 </>
//               )}
//             </div>
//           </StaggeredContainer>
//         </div>
//       </div>

//       {mobileMenuOpen && (
//         <div
//           className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30 transition-opacity duration-300"
//           onClick={() => setMobileMenuOpen(false)}
//         />
//       )}

//       <style jsx>{`
//         @keyframes shine {
//           0% {
//             transform: translateX(-100%) skewX(-12deg);
//           }
//           100% {
//             transform: translateX(200%) skewX(-12deg);
//           }
//         }
//         .animate-shine {
//           animation: shine 1.5s ease-in-out;
//         }
//         @media (max-width: 320px) {
//           .container {
//             padding-left: 0.75rem;
//             padding-right: 0.75rem;
//           }
//         }
//         @media (min-width: 1280px) {
//           .xl\\:space-x-8 > :not([hidden]) ~ :not([hidden]) {
//             margin-left: 2rem;
//           }
//         }
//       `}</style>
//     </header>
//   );
// };

// export default Header;


// // components/Header.jsx
// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import { IoSearchOutline } from "react-icons/io5";
// import { CgMenuGridO, CgMenuRound } from "react-icons/cg";
// import { GoSidebarCollapse } from "react-icons/go";
// import SearchBar from './SearchBox';
// import { CgMenuBoxed } from "react-icons/cg";

// export default function Header({ isSidebarOpen, toggleSidebar }) {
//   // adjust search width depending on sidebar open to appear fluid
//   const searchWidthClass = isSidebarOpen ? "w-64 lg:w-96" : "w-80 lg:w-[520px]";

//   return (
//     <header className="w-full fixed top-0 left-0 right-0 z-50 px-4 py-2 bg-[#10151B] border-b border-gray-400 flex items-center justify-between">
//       {/* left: collapse + logo */}
//       <div className="flex items-center gap-3  sm:ms-6">
//         <button onClick={toggleSidebar} className="p-1 rounded-md  shadow" aria-label="Toggle sidebar">
//           <CgMenuBoxed className="w-7 h-7 text-gray-300" />
//         </button>

//         <Link href="/" className="flex items-center gap-2">
//           <Image src="/spreads.svg" alt="Logo" width={36} height={36} />
//           {/* <span className="text-white font-semibold hidden sm:block">Spreads</span> */}
//         </Link>
//       </div>

//       {/* center: search */}
    
//        <div className="relative flex gap-5 items-center">
          
//             <SearchBar />
//             <button>
//               <CgMenuGridO className="text-gray-300 text-3xl font-light hover:cursor-pointer" />
//             </button>
//           </div>
//     </header>
//   );
// }



// components/Header.jsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../store/authSlice"; // path adjust if needed
import SearchBar from "../header/SearchBox"; // adjust path to your SearchBox
import LinkButton, { NavLinkButton } from "../button/Button";
import { StaggeredContainer, AnimatedWrapper } from "../animation/animation";
import { CgMenuGridO } from "react-icons/cg";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Community", href: "/community" },
  { label: "Companies", href: "/companies" },
  { label: "Jobs", href: "/jobs" },
];

export default function Header({ isSidebarOpen, toggleSidebar }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth || { user: null });

  // scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [mobileMenuOpen]);

  // close mobile menu on resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push("/signin");
    setMobileMenuOpen(false);
  };

  const handleNavClick = (href, e) => {
    if ((user || localStorage.getItem("token")) && (href === "/signin" || href === "/signup")) {
      e?.preventDefault();
      router.push("/jobfeed");
      return false;
    }
    return true;
  };

  return (
    <header
      // className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out px-3 sm:px-4 lg:px-6 xl:px-8 ${
      //   scrolled
      //     ? "py-1 sm:py-1.5 bg-[#020718] backdrop-blur-lg shadow-sm border-b border-gray-200/50"
      //     : "sm:py-2 bg-[#020718] border-b-2 border-gray-200"
      // }`}
         className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out px-3 sm:px-4 lg:px-6 xl:px-8 py-1 sm:py-1.5 bg-[#020718] backdrop-blur-lg shadow-sm border-b border-gray-200/50`}
    >
      <div className={`  ${user ? "max-w-8xl" : "max-w-7xl"} mx-auto flex items-center justify-between gap-4`}>
        <div className="flex items-center gap-3">
          {/* Sidebar toggle: only show if user is logged in */}
          {user ? (
            <button
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
              className="p-1 rounded-md shadow bg-transparent text-gray-200 hover:bg-gray-800  hover:cursor-pointer transition"
            >
              {/* small menu icon */}
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ) : null}

          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/spreads.svg"
              alt="Logo"
              width={scrolled ? 28 : 36}
              height={scrolled ? 28 : 36}
              className={`transition-all duration-300 ${scrolled ? "w-8 h-8" : "w-9 h-9"}`}
            />
            {/* optional text hidden on very small screens */}
            <span className="text-white font-semibold hidden sm:inline">Spreads</span>
          </Link>
        </div>

        {/* center / responsive: navigation links (desktop) + Search */}
        <div className="hidden md:flex items-center flex-1 justify-center gap-6">
          <nav className="flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
            {navLinks.map(({ label, href }, idx) => (
              <Link
                key={idx}
                href={href}
                onClick={(e) => handleNavClick(href, e)}
                className="group relative transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span
                  className={`relative cursor-pointer font-[Jost] font-medium text-sm lg:text-base transition-all duration-300 whitespace-nowrap ${
                    pathname === href ? "text-[#edebff] font-semibold" : "text-white hover:text-[#e1d7d7]"
                  }`}
                >
                  {label}
                  {pathname === href && (
                    <span className="absolute left-0 -bottom-4 w-full h-0.5 bg-blue-800 rounded-full "></span>
                  )}
                </span>
              </Link>
            ))}
          </nav>

          {/* Search bar occupies flexible width; keeps responsiveness */}
         
        </div>

        {/* right side actions (desktop) */}
        <div className="flex items-center gap-3">
          {user ? (
             <div className="flex flex-1">
            <SearchBar />
            <button>
              <CgMenuGridO className="text-gray-300 text-3xl font-light hover:cursor-pointer" />
            </button>
          </div>
          ) : (
            <div className="hidden md:flex items-center space-x-2 lg:space-x-3 xl:space-x-4 flex-shrink-0">
              <NavLinkButton href="/signin" text="Login" onClick={(e) => handleNavClick("/signin", e)} />
              <LinkButton href="/signup" name="Sign Up" linkclassname="!py-1.5" showIcon={false} onClick={(e) => handleNavClick("/signup", e)} />
            </div>
          )}
        </div>

        {/* mobile menu button */}
        {
          !user && (   <button
          className={`md:hidden p-2 rounded-lg transition-all duration-300 flex-shrink-0 ${
            mobileMenuOpen ? "bg-[#1200B1] text-white" : "text-white hover:cursor-pointer"
          }`}
          onClick={() => setMobileMenuOpen((s) => !s)}
          aria-label="Toggle mobile menu"
        >
          <div className="relative w-5 h-5 sm:w-6 sm:h-6">
            <Menu size={20} className={`absolute transition-all duration-300 ${mobileMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"}`} />
            <X size={20} className={`absolute transition-all duration-300 ${mobileMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"}`} />
          </div>
        </button>)
        }
     


      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`md:hidden fixed left-0 top-0 w-full h-screen bg-white z-40 transition-all duration-500 ease-out ${
          mobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
        }`}
      >
        <div className="flex justify-between items-center p-4 sm:p-5 border-b border-gray-200">
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>
            <Image src="/Finalloo.svg" alt="Logo" width={40} height={40} className="w-10 h-10 sm:w-11 sm:h-11" />
          </Link>
          <button onClick={() => setMobileMenuOpen(false)} aria-label="Close mobile menu" className="p-2 rounded-lg text-gray-700 hover:bg-gray-100">
            <X size={24} className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="p-4 sm:p-5 overflow-y-auto h-full pb-20">
          <StaggeredContainer className="flex flex-col space-y-1 sm:space-y-3">
            {navLinks.map(({ label, href }, index) => (
              <AnimatedWrapper key={index} className="transform transition-all duration-300" delay={index * 0.06} direction="right">
                <Link
                  href={href}
                  onClick={(e) => {
                    handleNavClick(href, e);
                    setMobileMenuOpen(false);
                  }}
                  className="group block py-2 px-4 rounded-lg hover:bg-blue-50"
                >
                  <span className={`text-lg font-medium ${pathname === href ? "text-[#1200B1]" : "text-gray-700"}`}>{label}</span>
                </Link>
              </AnimatedWrapper>
            ))}

            <div className="flex flex-col space-y-3 pt-6 border-t border-gray-200">
              <AnimatedWrapper delay={0.6}>
                {user ? (
                  <>
                    <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="text-center py-3 px-6 rounded-lg border-2 border-[#1200B1] text-[#1200B1] font-medium hover:bg-[#1200B1] hover:text-white">
                      Profile
                    </Link>
                    <button onClick={handleLogout} className="text-center py-3 px-6 rounded-lg border-2 border-[#1200B1] text-[#1200B1] font-medium hover:bg-[#1200B1] hover:text-white">
                      Logout
                    </button>
                  </>
                ) : (
                  < div className="flex flex-col items-start space-y-3">
                    <LinkButton showIcon={false} href="/signin" name="Login" onClick={(e) => { handleNavClick("/signin", e); setMobileMenuOpen(false); }} />
                    <LinkButton href="/signup" name="Sign Up" showIcon={false} onClick={(e) => { handleNavClick("/signup", e); setMobileMenuOpen(false); }} />
                  </div>
                )}
              </AnimatedWrapper>
            </div>
          </StaggeredContainer>
        </div>
      </div>

      {/* backdrop when mobile menu open */}
      {mobileMenuOpen && <div className="md:hidden fixed inset-0 bg-black/20 z-30 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />}

      <style jsx>{`
        @media (max-width: 720px) {
          .max-w-7xl { padding-left: 0.75rem; padding-right: 0.75rem; }
        }
      `}</style>
    </header>
  );
}
