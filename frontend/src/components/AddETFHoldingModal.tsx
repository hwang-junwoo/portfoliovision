"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

interface AddETFHoldingModalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolioId: string;
}

export default function AddETFHoldingModal({
  isOpen,
  onClose,
  portfolioId,
}: AddETFHoldingModalProps) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    ticker: "",
    name: "",
    quantity: "",
    average_price: "",
  });

  // ETF 종목 추가 Mutation
  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await api.post("/api/v1/etf-holdings", {
        portfolio_id: parseInt(portfolioId),
        ticker: data.ticker.toUpperCase(),
        name: data.name,
        quantity: parseFloat(data.quantity),
        average_price: parseFloat(data.average_price),
      });
      return response.data;
    },
    onSuccess: () => {
      // 포트폴리오 상세 정보 캐시 무효화 (자동 새로고침)
      queryClient.invalidateQueries({ queryKey: ["portfolio", portfolioId] });
      // 폼 초기화 및 모달 닫기
      setFormData({ ticker: "", name: "", quantity: "", average_price: "" });
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검사
    if (!formData.ticker.trim()) {
      alert("티커를 입력하세요.");
      return;
    }
    if (!formData.name.trim()) {
      alert("종목명을 입력하세요.");
      return;
    }
    if (!formData.quantity || parseFloat(formData.quantity) <= 0) {
      alert("수량은 0보다 커야 합니다.");
      return;
    }
    if (!formData.average_price || parseFloat(formData.average_price) <= 0) {
      alert("평균 단가는 0보다 커야 합니다.");
      return;
    }

    createMutation.mutate(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        {/* 헤더 */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            ETF 종목 추가
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            disabled={createMutation.isPending}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* 티커 */}
          <div>
            <label
              htmlFor="ticker"
              className="block text-sm font-medium text-gray-700"
            >
              티커 심볼 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="ticker"
              value={formData.ticker}
              onChange={(e) =>
                setFormData({ ...formData, ticker: e.target.value.toUpperCase() })
              }
              placeholder="예: SPY"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm uppercase focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
              disabled={createMutation.isPending}
            />
          </div>

          {/* 종목명 */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              종목명 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="예: SPDR S&P 500 ETF Trust"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
              disabled={createMutation.isPending}
            />
          </div>

          {/* 수량 */}
          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              보유 수량 <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="quantity"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
              placeholder="예: 10"
              step="0.01"
              min="0.01"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
              disabled={createMutation.isPending}
            />
          </div>

          {/* 평균 단가 */}
          <div>
            <label
              htmlFor="average_price"
              className="block text-sm font-medium text-gray-700"
            >
              평균 매수 단가 ($) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="average_price"
              value={formData.average_price}
              onChange={(e) =>
                setFormData({ ...formData, average_price: e.target.value })
              }
              placeholder="예: 450.50"
              step="0.01"
              min="0.01"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
              disabled={createMutation.isPending}
            />
          </div>

          {/* 예상 평가액 */}
          {formData.quantity && formData.average_price && (
            <div className="rounded-lg bg-blue-50 p-3">
              <div className="text-sm font-medium text-blue-900">
                예상 평가액
              </div>
              <div className="mt-1 text-2xl font-bold text-blue-900">
                $
                {(
                  parseFloat(formData.quantity) *
                  parseFloat(formData.average_price)
                ).toFixed(2)}
              </div>
            </div>
          )}

          {/* 에러 메시지 */}
          {createMutation.isError && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3">
              <p className="text-sm text-red-600">
                종목 추가에 실패했습니다. 다시 시도해주세요.
              </p>
            </div>
          )}

          {/* 버튼 */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={createMutation.isPending}
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? "추가 중..." : "추가하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
