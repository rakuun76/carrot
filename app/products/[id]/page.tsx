import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { formatToWon } from "@/lib/utils";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

async function getProduct(id: number) {
  return await db.product.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
}

async function getIsOwner(ownerId: number) {
  const loginUser = await getSession();

  return loginUser.id === ownerId;
}

export default async function ProductDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  if (!Number(id)) {
    return notFound();
  }

  const product = await getProduct(Number(id));
  if (!product) {
    return notFound();
  }

  const isOwner = await getIsOwner(product.userId);
  const deleteProduct = async () => {
    "use server";
    await db.product.delete({
      where: { id: product.id },
    });
    redirect("/products");
  };

  return (
    <>
      <div className="p-5 flex flex-col gap-2">
        <div className="relative aspect-square rounded-md overflow-hidden">
          <Image fill src={product.photo} alt={product.title} />
        </div>
        <div className="text-4xl font-semibold">{product.title}</div>
        <div className="flex items-center gap-2">
          <div className="relative size-11 rounded-full overflow-hidden">
            {product.user.avatar ? (
              <Image
                fill
                src={product.user.avatar}
                alt={product.user.username}
              />
            ) : (
              <UserIcon />
            )}
          </div>
          <div className="font-semibold">{product.user.username}</div>
        </div>
        <div>{product.description}</div>
      </div>
      <div className="fixed bottom-0 max-w-md w-full px-5 py-3 bg-neutral-800 flex justify-between items-center">
        <span className="text-2xl">{formatToWon(product.price)}</span>
        {isOwner ? (
          <form action={deleteProduct}>
            <button className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold">
              삭제하기
            </button>
          </form>
        ) : (
          <Link
            className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold"
            href={``}
          >
            채팅하기
          </Link>
        )}
      </div>
    </>
  );
}
