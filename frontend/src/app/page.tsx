"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import Link from "next/link";

export default function Home() {
  // 백엔드 헬스 체크
  const { data: healthData, isLoading } = useQuery({
    queryKey: ["health"],
    queryFn: async () => {
      const response = await api.get("/health");
      return response.data;
    },
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-8">
      <main className="flex max-w-4xl flex-col items-center gap-8 text-center">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900">
            PortfolioVision
          </h1>
          <p className="text-xl text-gray-600">
            AI 기반 ETF 포트폴리오 관리 플랫폼
          </p>
        </div>

        <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">
            백엔드 연결 상태
          </h2>
          {isLoading ? (
            <p className="text-gray-500">확인 중...</p>
          ) : healthData ? (
            <div className="space-y-2 text-left">
              <p className="text-green-600">✓ 백엔드 연결 성공</p>
              <p className="text-sm text-gray-600">
                상태: {healthData.status}
              </p>
              <p className="text-sm text-gray-600">앱: {healthData.app}</p>
              <p className="text-sm text-gray-600">
                버전: {healthData.version}
              </p>
            </div>
          ) : (
            <p className="text-red-600">✗ 백엔드 연결 실패</p>
          )}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-2 font-semibold text-gray-800">
              포트폴리오 관리
            </h3>
            <p className="text-sm text-gray-600">
              ETF 보유 종목 및 거래 내역 추적
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-2 font-semibold text-gray-800">실시간 가격</h3>
            <p className="text-sm text-gray-600">
              ETF 가격 모니터링 및 알림
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-2 font-semibold text-gray-800">경제 뉴스</h3>
            <p className="text-sm text-gray-600">
              주요 경제 뉴스 수집 및 분석
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-2 font-semibold text-gray-800">기술적 지표</h3>
            <p className="text-sm text-gray-600">
              이동평균, RSI, MACD 등 차트 분석
            </p>
          </div>
        </div>

        {/* CTA 버튼 */}
        <div className="mt-8 flex gap-4">
          <Link
            href="/dashboard"
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            대시보드로 이동
          </Link>
          <Link
            href="/portfolios"
            className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            포트폴리오 보기
          </Link>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>Phase 1: 포트폴리오 관리 UI 개발 진행 중</p>
        </div>
      </main>
    </div>
  );
}
