"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import CreatePortfolioModal from "@/components/CreatePortfolioModal";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import Link from "next/link";

export default function PortfoliosPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { data: portfolios, isLoading, error } = useQuery({
    queryKey: ["portfolios"],
    queryFn: async () => {
      const response = await api.get("/api/v1/portfolios");
      return response.data;
    },
  });

  return (
    <DashboardLayout title="포트폴리오">
      <div className="space-y-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              내 포트폴리오
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              ETF 포트폴리오를 관리하세요
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            + 새 포트폴리오
          </button>
        </div>

        {/* 포트폴리오 목록 */}
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="text-gray-500">로딩 중...</div>
          </div>
        ) : error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-red-600">
              포트폴리오를 불러오는데 실패했습니다.
            </p>
            <p className="mt-2 text-sm text-red-500">
              백엔드 서버가 실행 중인지 확인하세요.
            </p>
          </div>
        ) : portfolios && portfolios.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {portfolios.map((portfolio: any) => (
              <Link
                key={portfolio.id}
                href={`/portfolios/${portfolio.id}`}
                className="group"
              >
                <div className="rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-blue-300 hover:shadow-md">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                        {portfolio.name}
                      </h3>
                      {portfolio.description && (
                        <p className="mt-1 text-sm text-gray-600">
                          {portfolio.description}
                        </p>
                      )}
                    </div>
                    <div className="text-2xl">💼</div>
                  </div>

                  <div className="mt-4 space-y-2 border-t border-gray-100 pt-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">목표 수익률</span>
                      <span className="font-medium text-gray-900">
                        {portfolio.target_return_rate
                          ? `${portfolio.target_return_rate}%`
                          : "-"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">생성일</span>
                      <span className="font-medium text-gray-900">
                        {new Date(portfolio.created_at).toLocaleDateString(
                          "ko-KR"
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      활성
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
            <div className="mx-auto max-w-sm">
              <div className="text-6xl">💼</div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                포트폴리오가 없습니다
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                첫 번째 포트폴리오를 생성하여 ETF 투자를 추적하세요.
              </p>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="mt-6 rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                포트폴리오 만들기
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 포트폴리오 생성 모달 */}
      <CreatePortfolioModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </DashboardLayout>
  );
}
