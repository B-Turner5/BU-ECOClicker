from flask import Flask, render_template
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

# @app.route('/stats', methods=['GET'])
# def getStats():
#     return None

# @app.route('/kimmeridge', methods=['GET'])
# def getKimmeridgeUpgrades():
#     return None

# @app.route('/dorset', methods=['GET'])
# def getKimmeridgeUpgrades():
#     return None

# @app.route('/fusion', methods=['GET'])
# def getKimmeridgeUpgrades():
#     return None

# @app.route('/pgb', methods=['GET'])
# def getKimmeridgeUpgrades():
#     return None

# These endpoints will eventually become the way to fetch upgrades for the different buildings and for player statistics.

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)