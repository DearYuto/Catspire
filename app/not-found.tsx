"use client";

import { Button } from "@/shared/components";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <p className="text-lg">페이지를 찾을 수 없어요.</p>
      <Link href="/">
        <Button className="btn btn-purple text-white">메인으로 돌아가기</Button>
      </Link>
    </div>
  );
}
