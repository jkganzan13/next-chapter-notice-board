'use client';

import React, { PropsWithChildren, createRef } from 'react';

interface InputFormProps {
  className?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  formAction(form: FormData): Promise<void>;
}

export default function InputForm({
  children,
  className,
  inputProps,
  formAction,
}: PropsWithChildren<InputFormProps>) {
  const ref = createRef<HTMLFormElement>();

  const handleAction = async (formData: FormData) => {
    ref.current?.reset();
    await formAction(formData);
  };

  return (
    <form ref={ref} action={handleAction} className={`w-100 flex ${className}`}>
      {children}
      <button className="bg-blue-500 rounded-md w-20 text-sm px-2 py-1 text-white font-semibold ml-2">
        Post
      </button>
    </form>
  );
}
