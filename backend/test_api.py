"""
간단한 API 테스트 스크립트
포트폴리오 CRUD 기본 기능 확인
"""
import requests
import json

BASE_URL = "http://localhost:8000"

def test_health():
    """헬스 체크"""
    print("\n=== Health Check ===")
    response = requests.get(f"{BASE_URL}/health")
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    return response.status_code == 200

def test_create_portfolio():
    """포트폴리오 생성"""
    print("\n=== Create Portfolio ===")
    data = {
        "name": "Test Portfolio",
        "description": "My test portfolio",
        "target_return": 10.5
    }
    response = requests.post(f"{BASE_URL}/api/v1/portfolios/", json=data)
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    if response.status_code == 201:
        return response.json()["id"]
    return None

def test_list_portfolios():
    """포트폴리오 목록 조회"""
    print("\n=== List Portfolios ===")
    response = requests.get(f"{BASE_URL}/api/v1/portfolios/")
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    return response.status_code == 200

def test_get_portfolio(portfolio_id):
    """포트폴리오 상세 조회"""
    print(f"\n=== Get Portfolio {portfolio_id} ===")
    response = requests.get(f"{BASE_URL}/api/v1/portfolios/{portfolio_id}")
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    return response.status_code == 200

def test_add_holding(portfolio_id):
    """ETF 종목 추가"""
    print(f"\n=== Add ETF Holding to Portfolio {portfolio_id} ===")
    data = {
        "portfolio_id": portfolio_id,
        "ticker": "SPY",
        "name": "SPDR S&P 500 ETF Trust",
        "quantity": 10.5,
        "average_price": 450.25
    }
    response = requests.post(f"{BASE_URL}/api/v1/etf-holdings/", json=data)
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    if response.status_code == 201:
        return response.json()["id"]
    return None

def test_add_transaction(portfolio_id):
    """거래 내역 추가"""
    print(f"\n=== Add Transaction to Portfolio {portfolio_id} ===")
    data = {
        "portfolio_id": portfolio_id,
        "ticker": "SPY",
        "transaction_type": "buy",
        "transaction_date": "2025-01-15",
        "quantity": 10.5,
        "price": 450.25,
        "fee": 1.50,
        "note": "First purchase"
    }
    response = requests.post(f"{BASE_URL}/api/v1/transactions/", json=data)
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    if response.status_code == 201:
        return response.json()["id"]
    return None

def main():
    """메인 테스트 실행"""
    print("=" * 50)
    print("PortfolioVision API Test")
    print("=" * 50)

    # 1. 헬스 체크
    if not test_health():
        print("\n❌ Health check failed!")
        return

    # 2. 포트폴리오 생성
    portfolio_id = test_create_portfolio()
    if not portfolio_id:
        print("\n❌ Create portfolio failed!")
        return

    # 3. 포트폴리오 목록 조회
    test_list_portfolios()

    # 4. 포트폴리오 상세 조회
    test_get_portfolio(portfolio_id)

    # 5. ETF 종목 추가
    holding_id = test_add_holding(portfolio_id)
    if not holding_id:
        print("\n❌ Add holding failed!")
        return

    # 6. 거래 내역 추가
    transaction_id = test_add_transaction(portfolio_id)
    if not transaction_id:
        print("\n❌ Add transaction failed!")
        return

    # 7. 보유 종목 포함 포트폴리오 조회
    print(f"\n=== Get Portfolio {portfolio_id} with Holdings ===")
    response = requests.get(f"{BASE_URL}/api/v1/portfolios/{portfolio_id}/with-holdings")
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2, ensure_ascii=False)}")

    print("\n" + "=" * 50)
    print("✅ All tests passed!")
    print("=" * 50)
    print(f"\nCreated:")
    print(f"  - Portfolio ID: {portfolio_id}")
    print(f"  - Holding ID: {holding_id}")
    print(f"  - Transaction ID: {transaction_id}")

if __name__ == "__main__":
    try:
        main()
    except requests.exceptions.ConnectionError:
        print("\n❌ Error: Could not connect to API server")
        print("Make sure the server is running: cd backend && uvicorn app.main:app --reload")
    except Exception as e:
        print(f"\n❌ Error: {e}")
