"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import AddETFHoldingModal from "@/components/AddETFHoldingModal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import Link from "next/link";

export default function PortfolioDetailPage() {
  const params = useParams();
  const router = useRouter();
  const portfolioId = params.id as string;
  const queryClient = useQueryClient();
  const [isAddHoldingModalOpen, setIsAddHoldingModalOpen] = useState(false);

  // 포트폴리오 상세 정보 (보유 종목 포함)
  const { data: portfolio, isLoading, error } = useQuery({
    queryKey: ["portfolio", portfolioId],
    queryFn: async () => {
      const response = await api.get(
        `/api/v1/portfolios/${portfolioId}/with-holdings`
      );
      return response.data;
    },
  });

  // ETF 종목 삭제 Mutation
  const deleteHoldingMutation = useMutation({
    mutationFn: async (holdingId: number) => {
      await api.delete(`/api/v1/etf-holdings/${holdingId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio", portfolioId] });
    },
  });

  // 포트폴리오 삭제 Mutation
  const deletePortfolioMutation = useMutation({
    mutationFn: async () => {
      await api.delete(`/api/v1/portfolios/${portfolioId}`);
    },
    onSuccess: () => {
      router.push("/portfolios");
    },
  });

  const handleDeleteHolding = (holdingId: number, ticker: string) => {
    if (confirm(`${ticker} 종목을 삭제하시겠습니까?`)) {
      deleteHoldingMutation.mutate(holdingId);
    }
  };

  const handleDeletePortfolio = () => {
    if (
      confirm(
        `"${portfolio?.name}" 포트폴리오를 삭제하시겠습니까?\n모든 보유 종목과 거래 내역이 함께 삭제됩니다.`
      )
    ) {
      deletePortfolioMutation.mutate();
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout title="포트폴리오 상세">
        <div className="flex h-64 items-center justify-center">
          <div className="text-gray-500">로딩 중...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !portfolio) {
    return (
      <DashboardLayout title="포트폴리오 상세">
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-red-600">
            포트폴리오를 불러오는데 실패했습니다.
          </p>
          <Link
            href="/portfolios"
            className="mt-4 inline-block text-sm text-blue-600 hover:underline"
          >
            ← 포트폴리오 목록으로 돌아가기
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title={portfolio.name}>
      <div className="space-y-6">
        {/* 뒤로 가기 */}
        <Link
          href="/portfolios"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          포트폴리오 목록
        </Link>

        {/* 포트폴리오 정보 */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">
                {portfolio.name}
              </h2>
              {portfolio.description && (
                <p className="mt-2 text-gray-600">{portfolio.description}</p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleDeletePortfolio}
                disabled={deletePortfolioMutation.isPending}
                className="rounded-lg border border-red-300 bg-white px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
              >
                {deletePortfolioMutation.isPending ? "삭제 중..." : "삭제"}
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="text-sm font-medium text-gray-600">
                목표 수익률
              </div>
              <div className="mt-1 text-2xl font-bold text-gray-900">
                {portfolio.target_return_rate
                  ? `${portfolio.target_return_rate}%`
                  : "-"}
              </div>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="text-sm font-medium text-gray-600">
                보유 종목
              </div>
              <div className="mt-1 text-2xl font-bold text-gray-900">
                {portfolio.holdings?.length || 0}개
              </div>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="text-sm font-medium text-gray-600">생성일</div>
              <div className="mt-1 text-2xl font-bold text-gray-900">
                {new Date(portfolio.created_at).toLocaleDateString("ko-KR")}
              </div>
            </div>
          </div>
        </div>

        {/* 보유 종목 */}
        <div className="rounded-lg border border-gray-200 bg-white">
          <div className="flex items-center justify-between border-b border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900">보유 종목</h3>
            <button
              onClick={() => setIsAddHoldingModalOpen(true)}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              + 종목 추가
            </button>
          </div>

          {portfolio.holdings && portfolio.holdings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      티커
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      이름
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                      수량
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                      평균 단가
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                      평가액
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                      작업
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {portfolio.holdings.map((holding: any) => (
                    <tr key={holding.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                        {holding.ticker}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                        {holding.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-900">
                        {holding.quantity}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-900">
                        ${holding.average_price.toFixed(2)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium text-gray-900">
                        ${(holding.quantity * holding.average_price).toFixed(2)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-center text-sm">
                        <button
                          onClick={() =>
                            handleDeleteHolding(holding.id, holding.ticker)
                          }
                          disabled={deleteHoldingMutation.isPending}
                          className="text-red-600 hover:text-red-800 disabled:opacity-50"
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="text-6xl">📊</div>
              <h4 className="mt-4 text-lg font-semibold text-gray-900">
                보유 종목이 없습니다
              </h4>
              <p className="mt-2 text-sm text-gray-600">
                ETF 종목을 추가하여 포트폴리오를 구성하세요.
              </p>
              <button
                onClick={() => setIsAddHoldingModalOpen(true)}
                className="mt-6 rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                첫 종목 추가하기
              </button>
            </div>
          )}
        </div>

        {/* ETF 종목 추가 모달 */}
        <AddETFHoldingModal
          isOpen={isAddHoldingModalOpen}
          onClose={() => setIsAddHoldingModalOpen(false)}
          portfolioId={portfolioId}
        />

        {/* 최근 거래 내역 */}
        <div className="rounded-lg border border-gray-200 bg-white">
          <div className="flex items-center justify-between border-b border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900">
              최근 거래 내역
            </h3>
            <Link
              href={`/portfolios/${portfolioId}/transactions`}
              className="text-sm text-blue-600 hover:underline"
            >
              전체 보기 →
            </Link>
          </div>
          <div className="p-12 text-center">
            <div className="text-6xl">📝</div>
            <h4 className="mt-4 text-lg font-semibold text-gray-900">
              거래 내역이 없습니다
            </h4>
            <p className="mt-2 text-sm text-gray-600">
              매수/매도 거래를 기록하여 포트폴리오를 추적하세요.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
