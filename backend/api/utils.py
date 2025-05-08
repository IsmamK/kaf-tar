# utils.py
import requests
from django.core.cache import cache
from django.utils.timezone import now, timedelta

BKASH_CREDENTIALS = {
    "app_key": "0vWQuCRGiUX7EPVjQDr0EUAYtc",
    "app_secret": "jcUNPBgbcqEDedNKdvE4G1cAK7D3hCjmJccNPZZBq96QIxxwAMEx",
    "username": "01770618567",
    "password": "D7DaC<*E*eG"
}

BASE_URL = "https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout"

GRANT_URL = f"{BASE_URL}/token/grant"
REFRESH_URL = f"{BASE_URL}/token/refresh"
CREATE_PAYMENT_URL = f"{BASE_URL}/create"
EXECUTE_PAYMENT_URL = f"{BASE_URL}/execute"
REFUND_PAYMENT_URL = f"{BASE_URL}/payment/refund"

def get_bkash_token():
    token = cache.get("bkash_id_token")
    expires_at = cache.get("bkash_expires_at")
    
    if token and expires_at and now() < expires_at:
        return token  # ✅ Return cached token if still valid
    
    return refresh_or_generate_bkash_token()

def refresh_or_generate_bkash_token():
    refresh_token = cache.get("bkash_refresh_token")
    if refresh_token:
        return refresh_bkash_token(refresh_token)
    return generate_bkash_token()

def generate_bkash_token():
    payload = {
        "app_key": BKASH_CREDENTIALS["app_key"],
        "app_secret": BKASH_CREDENTIALS["app_secret"]
    }
    headers = {
        "accept": "application/json",
        "username": BKASH_CREDENTIALS["username"],
        "password": BKASH_CREDENTIALS["password"],
        "content-type": "application/json"
    }
    response = requests.post(GRANT_URL, json=payload, headers=headers)
    data = response.json()
    if data.get("statusCode") == "0000":
        return save_token_in_cache(data)
    raise Exception("Failed to generate bKash token")

def refresh_bkash_token(refresh_token):
    payload = {"refresh_token": refresh_token}
    headers = {"accept": "application/json", "content-type": "application/json"}
    response = requests.post(REFRESH_URL, json=payload, headers=headers)
    data = response.json()
    if data.get("statusCode") == "0000":
        return save_token_in_cache(data)
    return generate_bkash_token()

def save_token_in_cache(data):
    expires_at = now() + timedelta(seconds=int(data["expires_in"]) - 60)
    cache.set("bkash_id_token", data["id_token"], timeout=3300)
    cache.set("bkash_refresh_token", data["refresh_token"], timeout=86400)
    cache.set("bkash_expires_at", expires_at, timeout=3300)
    return data["id_token"]

def create_payment(amount, invoice_number,callback_url):
    token = get_bkash_token()

    payload = {
    'mode' : '0011',   
    'payerReference' : "1",
    'callbackURL':callback_url,
    "amount": amount,
    "currency": "BDT",
    "intent": "sale",
    "agreementID":"1",
    "merchantInvoiceNumber": invoice_number,
}
    headers = {
        "accept": "application/json",
        "Authorization": token,
        "X-APP-Key": BKASH_CREDENTIALS["app_key"],
        "content-type": "application/json"
    }
    response = requests.post(CREATE_PAYMENT_URL, json=payload, headers=headers)
    print(response.json())
    return response.json()

def execute_payment(payment_id):
    token = get_bkash_token()
    payload = {"paymentID": payment_id}
    headers = {
        "accept": "application/json",
        "authorization": token,
        "x-app-key": BKASH_CREDENTIALS["app_key"],
        "content-type": "application/json"
    }
    response = requests.post(EXECUTE_PAYMENT_URL, json=payload, headers=headers)
    print("INSIDE EXECUTE PAYMENT")
    print(response.json())
    return response.json()

def refund_payment(payment_id, trx_id, amount, reason):
    token = get_bkash_token()
    payload = {
        "paymentID": payment_id,
        "trxID": trx_id,
        "amount": str(amount),
        "reason": reason
    }
    headers = {
        "accept": "application/json",
        "authorization": token,
        "x-app-key": BKASH_CREDENTIALS["app_key"],
        "content-type": "application/json"
    }
    response = requests.post(REFUND_PAYMENT_URL, json=payload, headers=headers)
    return response.json()
