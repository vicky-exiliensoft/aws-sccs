"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Correct import
import { ReactNode } from 'react';
import { Header, Footer } from '@/components';
import "../styles/style.scss";
type IBaseTemplateProps = {
  children: ReactNode;
};

const BaseTemplate = (props: IBaseTemplateProps) => {
  const { children } = props;
  const router = useRouter();

  useEffect(() => {
    const checkToken = () => {
      if (!localStorage.getItem("token")) {
        router.push("/login");
        
      }
    };

    checkToken(); // Call the function when the component mounts

    return () => {
      // Cleanup function to prevent memory leaks
      checkToken();
    };
  }, [router]); // Add router to the dependency array to run the effect when router changes

  return (
    <>
      <main>{children}</main>
    </>
  );
};

export { BaseTemplate };
