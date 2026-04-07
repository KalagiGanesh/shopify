import requests

print("=" * 60)
print("TESTING ALL PRODUCT ROUTES")
print("=" * 60)

handles = [
    'solvra-focus-roast',
    'solvra-deep-work-dark-roast',
    'solvra-balance-decaf',
    'solvra-starter-kit',
    'solvra-brew-glass'
]

all_pass = True
for handle in handles:
    url = f'http://127.0.0.1:5000/product/{handle}'
    try:
        r = requests.get(url)
        if r.status_code == 200:
            # Check if product name is in response
            product_names = {
                'solvra-focus-roast': 'Solvra Focus Roast',
                'solvra-deep-work-dark-roast': 'Solvra Deep Work Dark Roast',
                'solvra-balance-decaf': 'Solvra Balance Decaf',
                'solvra-starter-kit': 'Solvra Starter Kit',
                'solvra-brew-glass': 'Solvra Brew Glass'
            }
            if product_names[handle] in r.text:
                print(f"✓ {handle}: 200 OK - Product found")
            else:
                print(f"✗ {handle}: 200 OK - Product data missing!")
                all_pass = False
        else:
            print(f"✗ {handle}: {r.status_code} - FAILED")
            all_pass = False
    except Exception as e:
        print(f"✗ {handle}: ERROR - {e}")
        all_pass = False

print("\n" + "=" * 60)
if all_pass:
    print("✅ ALL PRODUCTS WORKING CORRECTLY!")
else:
    print("❌ SOME PRODUCTS HAVE ISSUES")
print("=" * 60)
