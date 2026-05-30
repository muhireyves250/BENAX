"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useWishlistStore } from "@/stores/useWishlistStore";
import { mergeWishlist } from "@/app/account/wishlist/actions";

/**
 * On login, merges the guest's local wishlist into the DB and replaces the store
 * with the server list (DB becomes source of truth). Runs once per authenticated
 * session; resets on logout.
 */
export function WishlistSync() {
  const { status } = useSession();
  const synced = useRef(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      synced.current = false;
      return;
    }
    if (status !== "authenticated" || synced.current) return;
    synced.current = true;
    const localIds = useWishlistStore.getState().items.map((p) => p.id);
    mergeWishlist(localIds)
      .then((server) => useWishlistStore.getState().setItems(server))
      .catch(() => {
        synced.current = false;
      });
  }, [status]);

  return null;
}
