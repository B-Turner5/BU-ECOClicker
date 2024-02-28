from flask import Flask, render_template, jsonify, request
import os
import time

app = Flask(__name__)

global clickqueue
global clickcache

clickqueue = []
clickcache = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/connect')
def connect():
    return render_template('connect.html')

# Adds clicks collected from endpoint into a queue
@app.route('/api/click', methods=['POST'])
def registerClick():
    data = request.data
    clickqueue.append("Click!")
    return jsonify({'message': 'Click!'})

# Ensures that clicks aren't repeated by clearing the queue and passing the current queue through.
@app.route('/api/clicks', methods=['GET'])
def getClick():
    global clickqueue
    global clickcache

    clickcache = clickqueue
    clickqueue = []
    return jsonify(clickcache)

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)

