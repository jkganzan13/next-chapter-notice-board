'use client';

import React, { PropsWithChildren, createRef } from 'react';

interface InputFormProps {
  formAction(form: FormData): Promise<void>;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export default function InputForm({
  children,
  inputProps,
  formAction,
}: PropsWithChildren<InputFormProps>) {
  const ref = createRef<HTMLFormElement>();

  const handleAction = async (formData: FormData) => {
    ref.current?.reset();
    await formAction(formData);
  };

  return (
    <form
      ref={ref}
      action={handleAction}
      className="w-100 pt-4 mt-2 border-t border-gray-200 flex"
    >
      {children}
      <input
        name="message"
        className="w-full rounded-full px-3 py-1 text-sm border border-gray-200 "
        placeholder="Ask a question..."
        {...inputProps}
      />
      <button className="bg-blue-500 rounded-md w-20 text-sm px-2 py-1 text-white font-semibold ml-2">
        Post
      </button>
    </form>
  );
}
