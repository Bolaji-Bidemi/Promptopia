"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Toast from "./Toast";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const Nav = () => {
  const { data: session } = useSession();
  const [item, setItem] = useState("");

  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const logout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("/api/users/logout");
      Toast(response.data.message);
      Cookies.remove("auth_token");
      Cookies.remove("email");
      Cookies.remove("username");
      router.push("/login");
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    const cookieValue = Cookies.get("auth_token");
    setItem(cookieValue);
  }, []);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);

  return (
    <nav className="flex-between mb-16 w-full pt-3">
      <Link href="/" className=" flex gap-2 flex-center" rel="preload">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia logo"
          width={30}
          height={30}
          className="object-contain"
        />

        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {item || session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn" rel="preload">
              Create Post
            </Link>
            <button
              type="button"
              className="outline_btn"
              onClick={session?.user ? signOut : logout}
              sx={{ curser: "pointer" }}
            >
              Sign out
            </button>
            <Link href="/profile" rel="preload">
              <Image
                src={
                  session?.user
                    ? session?.user.image
                    : "/assets/images/logo.svg"
                }
                alt="profile pic"
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <div className="flex gap-2">
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  className="black_btn"
                  key={provider.name}

                  // onClick={() => signIn(provider.id)}
                >
                  Google sign in
                </button>
              ))}
            <button type="button" className="black_btn">
              <Link href="/register" rel="preload">
                Sign up
              </Link>
            </button>

            <button type="button" className="black_btn">
              <Link href="/login" rel="preload">
                Login
              </Link>
            </button>
          </div>
        )}
      </div>

      {/* Mobile navigation */}

      <div className="sm:hidden flex relative">
        {item || session?.user ? (
          <div className="flex">
            <Image
              src={
                session?.user ? session?.user.image : "/assets/images/logo.svg"
              }
              alt="profile pic"
              width={37}
              height={37}
              className="rounded-full"
              onClick={() => setToggleDropDown((prev) => !prev)}
              priority="true"
              sx={{
                cursor: "pointer",
              }}
            />
            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={session?.user ? signOut : logout}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                onClick={() => setOpen((prev) => !prev)}
              />
            </svg>

            {open && (
              <div className="flex flex-col gap-2 dropdown">
                {providers &&
                  Object.values(providers).map((item) => (
                    <button
                      type="button"
                      className="black_btn"
                      key={item.name}
                      onClick={() => signIn(item.id)}
                    >
                      Google Sign in
                    </button>
                  ))}
                <button type="button" className="black_btn">
                  <Link href="/register" onClick={() => setOpen(false)}>
                    Sign up
                  </Link>
                </button>

                <button type="button" className="black_btn">
                  <Link href="/login" onClick={() => setOpen(false)}>
                    Login
                  </Link>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
