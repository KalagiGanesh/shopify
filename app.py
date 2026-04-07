from flask import Flask, render_template

app = Flask(__name__)

# Product data - 5 products with full details
products = [
    {
        'id': 1,
        'handle': 'solvra-focus-roast',
        'name': 'Solvra Focus Roast',
        'price': 34.99,
        'compare_at_price': 44.99,
        'description': 'Premium functional coffee with L-theanine and lion\'s mane for laser-sharp focus and sustained energy without jitters.',
        'image': 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&q=80',
        'category': 'Functional Coffee',
        'vendor': 'Solvra',
        'tags': ['focus', 'l-theanine', 'medium roast', 'best seller'],
        'seo_title': 'Solvra Focus Roast - Functional Coffee for Clear Focus',
        'seo_description': 'Experience laser-sharp focus with our functional coffee blend. L-theanine + lion\'s mane for sustained energy without jitters.',
        'badges': ['Best Seller', '21% Off'],
        'rating': 4.8,
        'review_count': 234
    },
    {
        'id': 2,
        'handle': 'solvra-deep-work-dark-roast',
        'name': 'Solvra Deep Work Dark Roast',
        'price': 36.99,
        'compare_at_price': 46.99,
        'description': 'Bold dark roast infused with adaptogens for deep focus sessions. Perfect for coders, writers, and creators.',
        'image': 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80',
        'category': 'Functional Coffee',
        'vendor': 'Solvra',
        'tags': ['deep work', 'dark roast', 'adaptogens', 'best seller'],
        'seo_title': 'Solvra Deep Work Dark Roast - Bold Focus Coffee',
        'seo_description': 'Bold dark roast with adaptogens for extended deep work sessions. Stay focused longer with clean energy.',
        'badges': ['New', '21% Off'],
        'rating': 4.9,
        'review_count': 127
    },
    {
        'id': 3,
        'handle': 'solvra-balance-decaf',
        'name': 'Solvra Balance Decaf',
        'price': 29.99,
        'compare_at_price': 37.99,
        'description': 'Smooth decaf blend with calming ashwagandha. All the ritual, none of the caffeine. Perfect for evenings.',
        'image': 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=600&q=80',
        'category': 'Decaf Coffee',
        'vendor': 'Solvra',
        'tags': ['decaf', 'ashwagandha', 'calm', 'evening'],
        'seo_title': 'Solvra Balance Decaf - Calming Functional Decaf Coffee',
        'seo_description': 'Enjoy coffee ritual without caffeine. Decaf blend with ashwagandha for calm evenings and relaxed focus.',
        'badges': ['21% Off'],
        'rating': 4.7,
        'review_count': 189
    },
    {
        'id': 4,
        'handle': 'solvra-starter-kit',
        'name': 'Solvra Starter Kit',
        'price': 79.99,
        'compare_at_price': 109.99,
        'description': 'Complete starter pack with all 3 roasts + premium brew glass. Perfect gift or introduction to Solvra.',
        'image': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80',
        'category': 'Bundles',
        'vendor': 'Solvra',
        'tags': ['bundle', 'starter', 'gift', 'best seller'],
        'seo_title': 'Solvra Starter Kit - Complete Functional Coffee Collection',
        'seo_description': 'Try all 3 Solvra roasts + premium brew glass. Save 27% with our complete starter collection.',
        'badges': ['Best Value', '27% Off'],
        'rating': 5.0,
        'review_count': 312
    },
    {
        'id': 5,
        'handle': 'solvra-brew-glass',
        'name': 'Solvra Brew Glass',
        'price': 24.99,
        'compare_at_price': 34.99,
        'description': 'Double-wall borosilicate glass designed for optimal heat retention and beautiful coffee layers.',
        'image': 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
        'category': 'Accessories',
        'vendor': 'Solvra',
        'tags': ['glass', 'accessories', 'brewing', 'premium'],
        'seo_title': 'Solvra Brew Glass - Premium Double-Wall Coffee Glass',
        'seo_description': 'Elevate your coffee ritual with our premium double-wall borosilicate glass. Beautiful layers, perfect temperature.',
        'badges': ['29% Off'],
        'rating': 4.6,
        'review_count': 98
    }
]

# Testimonials
testimonials = [
    {
        'name': 'Sarah Chen',
        'role': 'Software Engineer',
        'text': 'Focus Roast replaced my morning espresso. No crashes, just clean sustained energy for coding sessions.',
        'rating': 5
    },
    {
        'name': 'Marcus Rivera',
        'role': 'Content Writer',
        'text': 'Deep Work Dark Roast is my secret weapon for hitting word count goals. Smooth, bold, and focused.',
        'rating': 5
    },
    {
        'name': 'Emma Thompson',
        'role': 'UX Designer',
        'text': 'Balance Decaf lets me enjoy coffee ritual at night without affecting sleep. Game changer.',
        'rating': 5
    }
]

# FAQ data
faqs = [
    {
        'question': 'When should I drink this?',
        'answer': 'Best consumed in the morning or early afternoon. For Focus Roast, drink 30 minutes before deep work sessions. Balance Decaf can be enjoyed any time, including evenings.'
    },
    {
        'question': 'How many servings per bag?',
        'answer': 'Each 12oz bag contains approximately 25-30 servings (12oz coffee). Based on 2 tablespoons per 8oz cup. Starter Kit includes 3 bags for 75-90 total servings.'
    },
    {
        'question': 'What if my order arrives damaged?',
        'answer': 'We guarantee perfect delivery. If your order arrives damaged, contact us at hello@solvra.com within 48 hours with photos. We\'ll send a replacement immediately, no questions asked.'
    }
]

@app.route('/')
def index():
    featured_products = products[:3]
    return render_template('index.html', 
                         products=featured_products, 
                         all_products=products,
                         testimonials=testimonials,
                         faqs=faqs)

@app.route('/products')
def products_page():
    return render_template('products.html', products=products)

@app.route('/collections/best-sellers')
def best_sellers():
    best_sellers = [p for p in products if 'best seller' in p['tags']]
    return render_template('products.html', products=best_sellers, collection='Best Sellers')

@app.route('/product/<product_handle>')
def product_detail(product_handle):
    print(f"DEBUG: Looking for product with handle: {product_handle}")
    product = next((p for p in products if p['handle'] == product_handle), None)
    
    if product is None:
        print(f"ERROR: Product not found. Available handles: {[p['handle'] for p in products]}")
        return render_template('404.html', message=f"Product '{product_handle}' not found"), 404
    
    print(f"SUCCESS: Found product: {product['name']}")
    related = [p for p in products if p['id'] != product['id']][:3]
    return render_template('product.html', product=product, related=related, faqs=faqs)

@app.route('/cart')
def cart():
    return render_template('cart.html')

@app.route('/shipping-returns')
def shipping_returns():
    return render_template('policies.html', page='shipping')

@app.route('/privacy-policy')
def privacy_policy():
    return render_template('policies.html', page='privacy')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/faq')
def faq():
    return render_template('faq.html', faqs=faqs)

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/track-order')
def track_order():
    return render_template('track-order.html')

@app.route('/terms-of-service')
def terms_of_service():
    return render_template('terms.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
