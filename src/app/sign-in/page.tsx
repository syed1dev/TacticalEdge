import React from "react";
import SignInForm from "./sign-in-form";

const SignInPage = () => {
  return (
    <div className="min-h-[88vh] w-full flex items-center justify-center relative">
      <div className="w-10/12 sm:w-1/2 lg:w-2/5 xl:w-1/4">
        <h1 className="text-5xl font-semibold mb-6 text-center">Sign in</h1>
        <SignInForm />
      </div>
    </div>
  );
};

export default SignInPage;
