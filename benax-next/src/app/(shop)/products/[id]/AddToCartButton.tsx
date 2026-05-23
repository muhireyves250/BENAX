"use client";

import { useState } from "react";
import { Check, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/stores/useCartStore";
import type { ProductLite } from "@/types/ecommerce";

export function AddToCartButton({ product }: { product: ProductLite }) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const handle = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <Button
      onClick={handle}
      size="lg"
      variant={added ? "secondary" : "primary"}
      leftIcon={added ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
    >
      {added ? "Added to cart" : "Add to cart"}
    </Button>
  );
}
