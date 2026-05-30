import { getWishlist } from "./actions";
import { WishlistList } from "./WishlistList";

export const dynamic = "force-dynamic";

export default async function AccountWishlistPage() {
  const items = await getWishlist();
  return <WishlistList initial={items} />;
}
