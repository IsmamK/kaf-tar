import requests

url = "https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/token/grant"

payload = {
    "app_key": "0vWQuCRGiUX7EPVjQDr0EUAYtc",
    "app_secret": "jcUNPBgbcqEDedNKdvE4G1cAK7D3hCjmJccNPZZBq96QIxxwAMEx"
}
headers = {
    "accept": "application/json",
    "username": "01770618567",
    "password": "D7DaC<*E*eG",
    "content-type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.text)