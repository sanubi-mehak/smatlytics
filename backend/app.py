from flask import Flask
from flask_cors import CORS
from routes.data_cleaning import data_clean

app = Flask(__name__)

# Enable CORS for React frontend
CORS(app, resources={
    r"/*": {
        "origins": "http://localhost:3000"
    }
})

# Register blueprint
app.register_blueprint(data_clean)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
