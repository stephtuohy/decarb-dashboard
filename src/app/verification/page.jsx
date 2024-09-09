"use client";

import ValidationForm from "@/ui/registration/regFrom/valForm";

export default function page() {
  return (
    <div className="relative h-screen">
      <div className="bg-white p-8 rounded-lg max-w-md mx-auto absolute inset-0 m-auto h-full sm:h-fit">
        <ValidationForm />
      </div>
    </div>
  );
}
