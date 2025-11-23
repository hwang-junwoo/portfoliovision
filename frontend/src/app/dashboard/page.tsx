"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export default function DashboardPage() {
  // TODO: 실제 포트폴리오 데이터 불러오기
  const { data: portfolios, isLoading } = useQuery({
    queryKey: ["portfolios"],
    queryFn: async () => {
      const response = await api.get("/api/v1/portfolios");
      return response.data;
    },
  });

  return (
    <DashboardLayout title="대시보드">
      <div className="space-y-6">
        {/* 요약 카드 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  총 포트폴리오
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {isLoading ? "-" : portfolios?.length || 0}
                </p>
              </div>
              <div className="text-4xl">💼</div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">총 평가액</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  $0
                </p>
              </div>
              <div className="text-4xl">💰</div>
            </div>
            <p className="mt-2 text-sm text-gray-500">준비 중</p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">총 수익률</p>
                <p className="mt-2 text-3xl font-bold text-green-600">
                  +0%
                </p>
              </div>
              <div className="text-4xl">📈</div>
            </div>
            <p className="mt-2 text-sm text-gray-500">준비 중</p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">보유 종목</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  0
                </p>
              </div>
              <div className="text-4xl">📊</div>
            </div>
            <p className="mt-2 text-sm text-gray-500">준비 중</p>
          </div>
        </div>

        {/* 최근 활동 */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            최근 활동
          </h2>
          <div className="text-center py-12 text-gray-500">
            <p>아직 활동 내역이 없습니다.</p>
            <p className="mt-2 text-sm">포트폴리오를 생성하여 시작하세요!</p>
          </div>
        </div>

        {/* 빠른 시작 가이드 */}
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
          <h2 className="mb-4 text-lg font-semibold text-blue-900">
            빠른 시작 가이드
          </h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                1
              </span>
              <div>
                <p className="font-medium text-blue-900">
                  포트폴리오 생성하기
                </p>
                <p className="text-sm text-blue-700">
                  좌측 메뉴에서 &quot;포트폴리오&quot;를 클릭하여 새 포트폴리오를 만드세요.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                2
              </span>
              <div>
                <p className="font-medium text-blue-900">ETF 종목 추가하기</p>
                <p className="text-sm text-blue-700">
                  포트폴리오에 보유 중인 ETF 종목을 추가하세요.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                3
              </span>
              <div>
                <p className="font-medium text-blue-900">거래 내역 기록하기</p>
                <p className="text-sm text-blue-700">
                  매수/매도 거래 내역을 추가하여 포트폴리오를 관리하세요.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
