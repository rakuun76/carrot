"use client";

import {
  HomeIcon as SolidHomeIcon,
  NewspaperIcon as SolidNewspaperIcon,
  ChatBubbleLeftRightIcon as SolidChatBubbleLeftRightIcon,
  VideoCameraIcon as SolidVideoCameraIcon,
  UserIcon as SolidUserIcon,
} from "@heroicons/react/24/solid";
import {
  HomeIcon as OutlineHomeIcon,
  NewspaperIcon as OutlineNewspaperIcon,
  ChatBubbleLeftRightIcon as OutlineChatBubbleLeftRightIcon,
  VideoCameraIcon as OutlineVideoCameraIcon,
  UserIcon as OutlineUserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabBar() {
  const pathName = usePathname();

  return (
    <div className="fixed bottom-0 grid grid-cols-5 max-w-md w-full border-neutral-500 border-t py-2">
      <Link className="flex flex-col items-center gap-px" href="/products">
        {pathName === "/products" ? (
          <SolidHomeIcon className="size-7" />
        ) : (
          <OutlineHomeIcon className="size-7" />
        )}
        <span>홈</span>
      </Link>
      <Link className="flex flex-col items-center gap-px" href="/life">
        {pathName === "/life" ? (
          <SolidNewspaperIcon className="size-7" />
        ) : (
          <OutlineNewspaperIcon className="size-7" />
        )}
        <span>동네생활</span>
      </Link>
      <Link className="flex flex-col items-center gap-px" href="/chat">
        {pathName === "/chat" ? (
          <SolidChatBubbleLeftRightIcon className="size-7" />
        ) : (
          <OutlineChatBubbleLeftRightIcon className="size-7" />
        )}
        <span>채팅</span>
      </Link>
      <Link className="flex flex-col items-center gap-px" href="/live">
        {pathName === "/live" ? (
          <SolidVideoCameraIcon className="size-7" />
        ) : (
          <OutlineVideoCameraIcon className="size-7" />
        )}
        <span>라이브</span>
      </Link>
      <Link className="flex flex-col items-center gap-px" href="/profile">
        {pathName === "/profile" ? (
          <SolidUserIcon className="size-7" />
        ) : (
          <OutlineUserIcon className="size-7" />
        )}
        <span>나의 당근</span>
      </Link>
    </div>
  );
}
