# from flask import Flask, render_template, request, jsonify
# from flask_cors import CORS  # Important for React frontend
# import os
# import pandas as pd
# from recommender import TravelPackageRecommender
#
# app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes
#
# recommender = TravelPackageRecommender()
#
# # Initialize with sample data
# DATA_FILE_PATH = "travel_packages.csv"  # Update with your file path
#
#
# @app.route('/')
# def index():
#     """Render the main page"""
#     unique_values = {}
#     if recommender.df is not None:
#         unique_values = recommender.get_unique_values()
#
#     return render_template('index.html', unique_values=unique_values)
#
#
# @app.route('/api/recommend', methods=['POST'])
# def get_recommendations():
#     """Get travel package recommendations - Updated for React frontend"""
#     try:
#         data = request.json
#         print("Received payload:", data)  # For debugging
#
#         # Validate required fields (matching React payload)
#         required_fields = ['fromCity', 'toCity', 'type', 'budget', 'duration']
#         for field in required_fields:
#             if field not in data or not data[field]:
#                 return jsonify({
#                     'success': False,
#                     'error': f'Missing required field: {field}'
#                 }), 400
#
#         # Convert field names to match recommender expectations
#         from_city = data['fromCity']
#         destination = data['toCity']
#         dest_type = data['type']
#         budget = float(data['budget'])
#         duration = int(data['duration'])
#
#         # Get recommendations
#         recommendations = recommender.recommend_packages(
#             from_city=from_city,
#             destination=destination,
#             dest_type=dest_type,
#             budget=budget,
#             duration=duration,
#             top_n=5
#         )
#
#         if recommendations is None:
#             return jsonify({
#                 'success': False,
#                 'error': 'No matching packages found for your filters'
#             }), 404
#
#         return jsonify({
#             'success': True,
#             'data': {
#                 'recommendations': recommendations,
#                 'count': len(recommendations),
#                 'user_preferences': {
#                     'fromCity': from_city,
#                     'toCity': destination,
#                     'type': dest_type,
#                     'budget': budget,
#                     'duration': duration
#                 }
#             }
#         })
#
#     except ValueError as e:
#         print(f"ValueError: {str(e)}")
#         return jsonify({
#             'success': False,
#             'error': 'Invalid numeric values provided for budget or duration'
#         }), 400
#     except Exception as e:
#         print(f"Error in /api/recommend: {str(e)}")
#         return jsonify({
#             'success': False,
#             'error': f'Recommendation failed: {str(e)}'
#         }), 500
#
#
# @app.route('/api/upload', methods=['POST'])
# def upload_file():
#     """Handle file upload via API"""
#     try:
#         if 'file' not in request.files:
#             return jsonify({
#                 'success': False,
#                 'error': 'No file uploaded'
#             }), 400
#
#         file = request.files['file']
#         if file.filename == '':
#             return jsonify({
#                 'success': False,
#                 'error': 'No file selected'
#             }), 400
#
#         if file and file.filename.endswith('.csv'):
#             # Save uploaded file
#             file_path = os.path.join('uploads', file.filename)
#             os.makedirs('uploads', exist_ok=True)
#             file.save(file_path)
#
#             # Load data into recommender
#             success = recommender.load_data(file_path)
#
#             if success:
#                 unique_values = recommender.get_unique_values()
#                 return jsonify({
#                     'success': True,
#                     'message': 'File uploaded successfully',
#                     'data': {
#                         'unique_values': unique_values
#                     }
#                 })
#             else:
#                 return jsonify({
#                     'success': False,
#                     'error': 'Failed to process the file'
#                 }), 500
#         else:
#             return jsonify({
#                 'success': False,
#                 'error': 'Please upload a CSV file'
#             }), 400
#
#     except Exception as e:
#         print(f"Upload error: {str(e)}")
#         return jsonify({
#             'success': False,
#             'error': f'Upload failed: {str(e)}'
#         }), 500
#
#
# @app.route('/api/destination_types', methods=['GET'])
# def get_destination_types():
#     """Get destination types for a specific destination"""
#     try:
#         destination = request.args.get('destination', '')
#         if not destination:
#             return jsonify({
#                 'success': True,
#                 'data': {'destination_types': []}
#             })
#
#         destination_types = recommender.get_destination_types(destination)
#         return jsonify({
#             'success': True,
#             'data': {'destination_types': destination_types}
#         })
#
#     except Exception as e:
#         return jsonify({
#             'success': False,
#             'error': f'Failed to get destination types: {str(e)}'
#         }), 500
#
#
# @app.route('/api/health', methods=['GET'])
# def health_check():
#     """Health check endpoint"""
#     return jsonify({
#         'success': True,
#         'data': {
#             'status': 'healthy',
#             'data_loaded': recommender.df is not None,
#             'service': 'Travel Package Recommender API'
#         }
#     })
#
#
# @app.route('/api/test', methods=['POST'])
# def test_recommendation():
#     """Test endpoint for recommendations"""
#     test_data = {
#         "fromCity": "Mumbai",
#         "toCity": "Goa",
#         "type": "Beach",
#         "budget": 50000,
#         "duration": 5
#     }
#
#     try:
#         recommendations = recommender.recommend_packages(
#             from_city=test_data['fromCity'],
#             destination=test_data['toCity'],
#             dest_type=test_data['type'],
#             budget=test_data['budget'],
#             duration=test_data['duration']
#         )
#
#         return jsonify({
#             'success': True,
#             'data': {
#                 'test_data': test_data,
#                 'recommendations': recommendations if recommendations else []
#             }
#         })
#     except Exception as e:
#         return jsonify({
#             'success': False,
#             'error': str(e)
#         }), 500
#
#
# # Error handlers
# @app.errorhandler(404)
# def not_found(error):
#     return jsonify({
#         'success': False,
#         'error': 'Endpoint not found'
#     }), 404
#
#
# @app.errorhandler(500)
# def internal_error(error):
#     return jsonify({
#         'success': False,
#         'error': 'Internal server error'
#     }), 500
#
#
# if __name__ == '__main__':
#     # Load initial data if available
#     if os.path.exists(DATA_FILE_PATH):
#         try:
#             recommender.load_data(DATA_FILE_PATH)
#             print("✅ Initial data loaded successfully")
#             print(f"📊 Dataset shape: {recommender.df.shape}")
#             print(f"🏙️ Available cities: {len(recommender.df['From_City'].unique())}")
#             print(f"🎯 Available destinations: {len(recommender.df['Destination'].unique())}")
#         except Exception as e:
#             print(f"❌ Failed to load initial data: {str(e)}")
#
#     print("🚀 Starting Travel Package Recommender API...")
#     print("📝 Available endpoints:")
#     print("   POST /api/recommend - Get package recommendations")
#     print("   POST /api/upload - Upload CSV file")
#     print("   GET  /api/destination_types - Get destination types")
#     print("   GET  /api/health - Health check")
#     print("   POST /api/test - Test recommendation endpoint")
#
#     app.run(debug=True, host='0.0.0.0', port=5000)

from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import os
from travel import TravelPackageRecommender

app = Flask(__name__)
CORS(app)

# Initialize the recommender (it will auto-load the CSV)
recommender = TravelPackageRecommender()


@app.route('/')
def index():
    """Render the main page"""
    unique_values = {}
    if recommender.df is not None:
        unique_values = recommender.get_unique_values()

    return render_template('index.html', unique_values=unique_values)


@app.route('/api/recommend', methods=['POST'])
def get_recommendations():
    """Get travel package recommendations"""
    try:
        data = request.json
        print("Received payload:", data)

        # Validate required fields
        required_fields = ['fromCity', 'toCity', 'type', 'budget', 'duration']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({
                    'success': False,
                    'error': f'Missing required field: {field}'
                }), 400

        # Convert field names
        from_city = data['fromCity']
        destination = data['toCity']
        dest_type = data['type']
        budget = float(data['budget'])
        duration = int(data['duration'])

        # Check if data is loaded
        if recommender.df is None:
            return jsonify({
                'success': False,
                'error': 'Dataset not loaded. Please check if packagedata_with_id.csv exists.'
            }), 500

        # Get recommendations
        recommendations = recommender.recommend_packages(
            from_city=from_city,
            destination=destination,
            dest_type=dest_type,
            budget=budget,
            duration=duration,
            top_n=5
        )
        import pandas as pd
        print(pd.DataFrame(recommendations))
        if recommendations is None:
            return jsonify({
                'success': False,
                'error': 'No matching packages found for your filters'
            }), 404

        return jsonify({
            'success': True,
            'data': {
                'recommendations': recommendations,
                'count': len(recommendations),
                'user_preferences': {
                    'fromCity': from_city,
                    'toCity': destination,
                    'type': dest_type,
                    'budget': budget,
                    'duration': duration
                }
            }
        })

    except ValueError as e:
        return jsonify({
            'success': False,
            'error': 'Invalid numeric values provided for budget or duration'
        }), 400
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Recommendation failed: {str(e)}'
        }), 500


@app.route('/api/dataset-info', methods=['GET'])
def get_dataset_info():
    """Get information about the loaded dataset"""
    info = recommender.get_dataset_info()
    return jsonify({
        'success': True,
        'data': info
    })


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    data_loaded = recommender.df is not None
    return jsonify({
        'success': True,
        'data': {
            'status': 'healthy',
            'data_loaded': data_loaded,
            'dataset_available': os.path.exists('packagedata_with_id.csv'),
            'service': 'Travel Package Recommender API'
        }
    })


if __name__ == '__main__':
    print("🚀 Starting Travel Package Recommender API...")
    print("📁 Current directory:", os.getcwd())
    print("📂 Files in directory:", [f for f in os.listdir('.') if f.endswith('.csv')])

    if recommender.df is not None:
        print("✅ Dataset loaded successfully!")
        print(f"📊 Dataset shape: {recommender.df.shape}")
    else:
        print("❌ Dataset not loaded. Please check if packagedata_with_id.csv exists in the current directory.")

    print("\n🌐 Available endpoints:")
    print("   POST /api/recommend - Get package recommendations")
    print("   GET  /api/dataset-info - Get dataset information")
    print("   GET  /api/health - Health check")

    app.run(debug=True, host='0.0.0.0', port=5000)