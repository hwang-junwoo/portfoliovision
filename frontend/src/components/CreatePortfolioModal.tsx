"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

interface CreatePortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreatePortfolioModal({
  isOpen,
  onClose,
}: CreatePortfolioModalProps) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    target_return_rate: "",
  });

  // 포트폴리오 생성 Mutation
  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await api.post("/api/v1/portfolios", {
        name: data.name,
        description: data.description || null,
        target_return_rate: data.target_return_rate
          ? parseFloat(data.target_return_rate)
          : null,
      });
      return response.data;
    },
    onSuccess: () => {
      // 포트폴리오 목록 캐시 무효화 (자동 새로고침)
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
      // 폼 초기화 및 모달 닫기
      setFormData({ name: "", description: "", target_return_rate: "" });
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("포트폴리오 이름을 입력하세요.");
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
            새 포트폴리오 만들기
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
          {/* 이름 */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              포트폴리오 이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="예: 메인 포트폴리오"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
              disabled={createMutation.isPending}
            />
          </div>

          {/* 설명 */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              설명 (선택)
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="포트폴리오에 대한 간단한 설명을 입력하세요"
              rows={3}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              disabled={createMutation.isPending}
            />
          </div>

          {/* 목표 수익률 */}
          <div>
            <label
              htmlFor="target_return_rate"
              className="block text-sm font-medium text-gray-700"
            >
              목표 수익률 (%) (선택)
            </label>
            <input
              type="number"
              id="target_return_rate"
              value={formData.target_return_rate}
              onChange={(e) =>
                setFormData({ ...formData, target_return_rate: e.target.value })
              }
              placeholder="예: 15"
              step="0.01"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              disabled={createMutation.isPending}
            />
            <p className="mt-1 text-xs text-gray-500">
              연간 목표 수익률을 백분율로 입력하세요
            </p>
          </div>

          {/* 에러 메시지 */}
          {createMutation.isError && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3">
              <p className="text-sm text-red-600">
                포트폴리오 생성에 실패했습니다. 다시 시도해주세요.
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
              {createMutation.isPending ? "생성 중..." : "생성하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
