"use client";

import { useState, useEffect } from "react";
import { Toaster } from "sonner";

export function ToasterProvider() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <Toaster richColors position="top-right" />;
}
