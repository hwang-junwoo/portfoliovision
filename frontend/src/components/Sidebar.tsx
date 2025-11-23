"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "대시보드",
      href: "/dashboard",
      icon: "📊",
    },
    {
      name: "포트폴리오",
      href: "/portfolios",
      icon: "💼",
    },
    {
      name: "거래 내역",
      href: "/transactions",
      icon: "📝",
    },
    {
      name: "경제 뉴스",
      href: "/news",
      icon: "📰",
      disabled: true,
    },
    {
      name: "기술적 지표",
      href: "/indicators",
      icon: "📈",
      disabled: true,
    },
  ];

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
      {/* 로고 */}
      <div className="flex h-16 items-center border-b border-gray-200 px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">📊</span>
          <span className="text-xl font-bold text-gray-900">
            PortfolioVision
          </span>
        </Link>
      </div>

      {/* 네비게이션 메뉴 */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const isDisabled = item.disabled;

          return (
            <Link
              key={item.href}
              href={isDisabled ? "#" : item.href}
              className={`
                flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium
                transition-colors
                ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : isDisabled
                      ? "cursor-not-allowed text-gray-400"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }
              `}
              onClick={(e) => {
                if (isDisabled) e.preventDefault();
              }}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
              {isDisabled && (
                <span className="ml-auto text-xs text-gray-400">준비중</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* 하단 정보 */}
      <div className="border-t border-gray-200 p-4">
        <div className="text-xs text-gray-500">
          <p className="font-medium">Phase 1 진행 중</p>
          <p className="mt-1">포트폴리오 관리 50%</p>
        </div>
      </div>
    </aside>
  );
}
