"use client";

import { Button } from "@/shared/components";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-lg">에러가 발생했어요.</p>
      <Link href="/">
        <Button className="btn btn-purple text-white">메인으로 돌아가기</Button>
      </Link>
    </div>
  );
}
