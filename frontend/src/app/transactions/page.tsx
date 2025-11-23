"use client";

import DashboardLayout from "@/components/DashboardLayout";

export default function TransactionsPage() {
  return (
    <DashboardLayout title="거래 내역">
      <div className="space-y-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">거래 내역</h2>
            <p className="mt-1 text-sm text-gray-600">
              모든 매수/매도 거래를 확인하세요
            </p>
          </div>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            + 새 거래
          </button>
        </div>

        {/* 필터 */}
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                포트폴리오
              </label>
              <select className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option value="">전체</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                거래 유형
              </label>
              <select className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option value="">전체</option>
                <option value="buy">매수</option>
                <option value="sell">매도</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                티커
              </label>
              <input
                type="text"
                placeholder="예: SPY"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                기간
              </label>
              <select className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option value="">전체</option>
                <option value="7d">최근 7일</option>
                <option value="30d">최근 30일</option>
                <option value="90d">최근 90일</option>
                <option value="1y">최근 1년</option>
              </select>
            </div>
          </div>
        </div>

        {/* 거래 내역 테이블 */}
        <div className="rounded-lg border border-gray-200 bg-white">
          <div className="p-12 text-center">
            <div className="text-6xl">📝</div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              거래 내역이 없습니다
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              첫 번째 거래를 기록하여 포트폴리오를 추적하세요.
            </p>
            <button className="mt-6 rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              거래 추가하기
            </button>
          </div>
        </div>

        {/* 요약 */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="text-sm font-medium text-gray-600">총 매수</div>
            <div className="mt-2 text-2xl font-bold text-gray-900">$0</div>
            <div className="mt-1 text-sm text-gray-500">0건</div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="text-sm font-medium text-gray-600">총 매도</div>
            <div className="mt-2 text-2xl font-bold text-gray-900">$0</div>
            <div className="mt-1 text-sm text-gray-500">0건</div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="text-sm font-medium text-gray-600">총 수수료</div>
            <div className="mt-2 text-2xl font-bold text-gray-900">$0</div>
            <div className="mt-1 text-sm text-gray-500">준비 중</div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
