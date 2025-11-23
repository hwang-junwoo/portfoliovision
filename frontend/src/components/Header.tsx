"use client";

import { useState } from "react";

interface HeaderProps {
  title?: string;
}

export default function Header({ title = "대시보드" }: HeaderProps) {
  const [selectedPortfolio, setSelectedPortfolio] = useState<string>("");

  // TODO: React Query로 포트폴리오 목록 불러오기
  const portfolios = [
    { id: "1", name: "메인 포트폴리오" },
    { id: "2", name: "성장 중심 포트폴리오" },
  ];

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      {/* 페이지 타이틀 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      </div>

      {/* 포트폴리오 선택 */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <label
            htmlFor="portfolio-select"
            className="text-sm font-medium text-gray-700"
          >
            포트폴리오:
          </label>
          <select
            id="portfolio-select"
            value={selectedPortfolio}
            onChange={(e) => setSelectedPortfolio(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">전체 보기</option>
            {portfolios.map((portfolio) => (
              <option key={portfolio.id} value={portfolio.id}>
                {portfolio.name}
              </option>
            ))}
          </select>
        </div>

        {/* 사용자 아이콘 (향후 기능) */}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-600">
          U
        </div>
      </div>
    </header>
  );
}
