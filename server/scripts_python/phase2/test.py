from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/interview-analyze', methods=['POST'])
def analyze_interviews():
    try:
        data = request.json
        results = []
        
        for interview in data['interviews']:
            # Simple average calculation
            scores = [
                interview['communication'],
                interview['technical'],
                interview['motivation']
            ]
            valid_scores = [s for s in scores if s is not None]
            
            if not valid_scores:
                overall = None
            else:
                overall = sum(valid_scores) / len(valid_scores)
            
            results.append({
                'notes': 0,  # Placeholder
                'video': 0,  # Placeholder
                'overall': overall
            })
        
        return jsonify({'scores': results})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000, debug=True)